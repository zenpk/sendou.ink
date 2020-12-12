import { Prisma } from "@prisma/client";
import prisma from "prisma/client";

export type GetPlayerWithPlacementsData = Prisma.PromiseReturnType<
  typeof getPlayerWithPlacements
>;

export const getPlayerWithPlacements = async (switchAccountId: string) => {
  const player = await getPlayer();

  if (!player) return null;

  type PlayerWithPlacements = Prisma.PromiseReturnType<typeof getPlayer>;
  type LeaguePlacementArray = NonNullable<PlayerWithPlacements>["leaguePlacements"];

  return {
    ...player,
    placements: player.placements.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.month !== b.month) return b.month - a.month;

      const modes = ["SZ", "TC", "RM", "CB"];
      return modes.indexOf(a.mode) - modes.indexOf(b.mode);
    }),
    leaguePlacements: JSON.parse(
      JSON.stringify(getTopLeaguePlacements())
    ) as ReturnType<typeof getTopLeaguePlacements>,
  };

  function getTopLeaguePlacements() {
    // TODO: remove duplicates
    const result: { TWIN: LeaguePlacementArray; QUAD: LeaguePlacementArray } = {
      TWIN: [],
      QUAD: [],
    };

    if (!player) return result;

    for (const placement of player.leaguePlacements) {
      result[placement.squad.members.length === 2 ? "TWIN" : "QUAD"].push(
        placement
      );
    }

    result.TWIN.sort((a, b) => b.squad.leaguePower - a.squad.leaguePower);
    result.QUAD.sort((a, b) => b.squad.leaguePower - a.squad.leaguePower);

    return { TWIN: result.TWIN.slice(0, 20), QUAD: result.QUAD.slice(0, 10) };
  }

  function getPlayer() {
    return prisma.player.findUnique({
      where: { switchAccountId },
      include: {
        leaguePlacements: {
          select: {
            squad: {
              select: {
                startTime: true,
                leaguePower: true,
                id: true,
                members: {
                  select: {
                    weapon: true,
                    player: {
                      include: {
                        user: {
                          select: {
                            username: true,
                            discriminator: true,
                            discordId: true,
                            discordAvatar: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        placements: true,
      },
    });
  }
};

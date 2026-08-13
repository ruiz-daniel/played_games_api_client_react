import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useToggle } from "../../hooks/useToggle";

import FilterForm from "../utils/forms/FilterForm";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import GamesList from "../utils/lists/GamesList";
import { useFilterData } from "../../hooks/useFilterData";
import { useEffect, useMemo } from "react";
import BaseButton from "../utils/BaseButton";

const PlayedGamesList = () => {
  const { toggleValue, toggle } = useToggle();
  const { games, page, max, getGames, updateGame, removeGame } =
    usePlayedGames();
  const { resetFilter, applyFilter, searchParams } = useFilterData();
  const onScrollEnd = (e) => {
    if (e.target.id !== "played_games_list_container") {
      return;
    }
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    // take the integer part cause sometimes the number isn't exact
    if (
      scrollHeight - parseInt(scrollTop) <= clientHeight + 10 &&
      games.length < max
    ) {
      getGames(Number(page) + 1);
    }
  };

  const parseKeysToNames = (key) => {
    const capitalized = key.slice(0, 1).toUpperCase() + key.substring(1);
    return capitalized.replaceAll("_", " ");
  };

  const filteringValues = useMemo(() => {
    const values = {};
    searchParams.forEach((value, key) => {
      if (key !== "played_hours") {
        values[key] = value;
      }
    });
    return values;
  }, [searchParams]);

  return (
    <div
      id="played_games_list_container"
      className="py-6 px-14 flex flex-col gap-4 h-[90vh] overflow-y-auto ease-in-out"
      onScrollCapture={onScrollEnd}
    >
      <Sidebar
        visible={toggleValue}
        position="right"
        showCloseIcon={false}
        onHide={toggle}
        className="shadow-lg"
        pt={{
          root: "w-[30%]! px-12 py-6 rounded-2xl transition transform! duration-700! ease-in-out!",
          mask: "bg-gray-600/25",
        }}
      >
        <FilterForm
          onSubmit={(data) => {
            applyFilter(data);
            toggle();
          }}
        />
      </Sidebar>
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex flex-row-reverse justify-center w-full gap-3">
          <BaseButton
            iconClassName={"filter"}
            label="Filter"
            onClick={toggle}
          />
          <BaseButton
            iconClassName={"times"}
            label="Reset"
            onClick={resetFilter}
            onMouseLeave={(e) => e.target.blur()}
            onTouchEnd={(e) => e.target.blur()}
          />
        </div>
        {searchParams.size > 0 && (
          <div className="flex flex-wrap gap-3 my-2">
            <h3 className="font-semibold text-xl">Filtering by:</h3>
            {Object.keys(filteringValues).map((key) => {
              return (
                <Chip
                  key={key}
                  className="bg-amber-200! flex items-center justify-center rounded-2xl "
                  label={`${parseKeysToNames(key)}: ${filteringValues[key]}`}
                />
              );
            })}
          </div>
        )}
      </div>

      <GamesList
        games={games}
        updateGame={updateGame}
        removeGame={removeGame}
      />
    </div>
  );
};

export default PlayedGamesList;

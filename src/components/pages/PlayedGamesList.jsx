import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useToggle } from "../../hooks/useToggle";

import FilterForm from "../utils/forms/FilterForm";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import GamesList from "../utils/lists/GamesList";
import { useFilterData } from "../../hooks/useFilterData";
import { useMemo } from "react";

const PlayedGamesList = () => {
  const { toggleValue, toggle } = useToggle();
  const {
    games,
    page,
    max,
    getGames,
    updateGame,
    removeGame,
  } = usePlayedGames();
  const {
    resetFilter,
    applyFilter,
    searchParams
  } = useFilterData()
  const onScrollEnd = (e) => {
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
    const capitalized =  key.slice(0,1).toUpperCase() + key.substring(1)
    return capitalized.replaceAll("_", " ")
  }

  const filteringValues = useMemo(() => {
    const values = {}
    searchParams.forEach((value, key) => {
      if (key !== 'played_hours') {
        values[key] = value
      }
    })
    return values
  }, [searchParams])

  return (
    <div className="played-games-list">
      <Sidebar
        visible={toggleValue}
        position="right"
        showCloseIcon={false}
        onHide={toggle}
        className="filter-sidebar"
      >
        <FilterForm
          onSubmit={(data) => {
            applyFilter(data);
            toggle();
          }}
        />
      </Sidebar>
      <div className="options-container flex">
        <Button icon="pi pi-filter" label="Filter" onClick={toggle} />
        <Button
          icon="pi pi-times"
          label="Reset"
          onClick={resetFilter}
          onMouseLeave={(e) => e.target.blur()}
          onTouchEnd={(e) => e.target.blur()}
        />
      </div>

      {searchParams.size > 0 && (
        <div className="flex flex-wrap gap-3 my-2">
          <h3 className="my-2">Filtering by:</h3>
          {Object.keys(filteringValues).map((key) => {
            return (
              <Chip
                key={key}
                className="dark-chip"
                label={`${parseKeysToNames(key)}: ${filteringValues[key]}`}
              />
            );
          })}

        </div>
      )}

      <GamesList games={games} onScrollEnd={onScrollEnd} updateGame={updateGame} removeGame={removeGame} />
    </div>
  );
};

export default PlayedGamesList;

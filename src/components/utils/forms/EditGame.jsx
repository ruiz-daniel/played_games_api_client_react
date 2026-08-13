import { usePlatforms } from "../../../hooks/usePlatforms";
import { useCompletions } from "../../../hooks/useCompletions";
import { useForm, Controller } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Chips } from "primereact/chips";
import { classNames } from "primereact/utils";
import {
  dropDownClassNames,
  dropDownComponentOptions,
  inputClassNames,
} from "./FilterForm";
import BaseButton from "../BaseButton";

export const chipsComponentOptions = {
  container: {
    className: inputClassNames,
  },
  token: {
    className: "flex gap items-center justify-center bg-amber-200!",
  },
  removeTokenIcon: {
    className: "cursor-pointer hover:text-white",
  },
  input: {
    className: "ml-2 focus:outline-none",
  },
};

const EditGame = ({ game, onSubmit }) => {
  const { platforms } = usePlatforms();
  const { completions } = useCompletions();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const handleOnSubmit = (data) => {
    onSubmit({ ...data, _id: game._id });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col gap-3 py-2 px-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="gname">Name*</label>
          <InputText
            id="gname"
            className={classNames(inputClassNames)}
            defaultValue={game.name}
            {...register("name", { required: true })}
          />
          {errors.name && <div className="error-message">Name is required</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gdev">Developers</label>
          <Controller
            name="developers"
            defaultValue={game.developers || []}
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gdev"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                pt={chipsComponentOptions}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gpub">Publisher</label>
          <Controller
            name="publishers"
            defaultValue={game.publishers || []}
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gdev"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                className="focus:border-cyan-400"
                pt={chipsComponentOptions}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gyear">Release Year</label>
          <InputText
            id="gyear"
            className={classNames(inputClassNames)}
            type="number"
            onWheel={(e) => {
              e.target.blur();
            }}
            defaultValue={game.release_year}
            {...register("release_year", { min: 1970, max: 2030 })}
          />
          {errors.release_year && (
            <div className="error-message">Requires a valid year</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gplayedyear">Played Year</label>
          <InputText
            id="gplayedyear"
            className={classNames(inputClassNames)}
            type="number"
            onWheel={(e) => {
              e.target.blur();
            }}
            defaultValue={game.played_year}
            {...register("played_year", { min: 1970, max: 2030 })}
          />
          {errors.played_year && (
            <div className="error-message">Requires a valid year</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ggenre">Genres</label>
          <Controller
            name="genres"
            defaultValue={game.genres || []}
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gdev"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                pt={chipsComponentOptions}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gtags">Tags</label>
          <Controller
            name="tags"
            defaultValue={game.tags || []}
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gtags"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                pt={chipsComponentOptions}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="platform">Platform</label>
          <Controller
            name="platform"
            defaultValue={game.platform}
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={platforms}
                optionLabel="name"
                className={dropDownClassNames}
                pt={dropDownComponentOptions}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status">Completion*</label>
          <Controller
            name="completion"
            control={control}
            defaultValue={game.completion}
            rules={{ required: "Completion is required" }}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={completions}
                optionLabel="name"
                className={dropDownClassNames}
                pt={dropDownComponentOptions}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="grating">Score</label>
          <InputText
            id="grating"
            className={classNames(inputClassNames)}
            type="number"
            onWheel={(e) => {
              e.target.blur();
            }}
            defaultValue={game.score}
            min={1}
            max={10}
            {...register("score", { min: 1, max: 10 })}
          />
          {errors.rating && (
            <div className="error-message">Requires a valid score</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ghours">Played Hours</label>
          <InputText
            id="ghours"
            className={classNames(inputClassNames)}
            type="number"
            defaultValue={game.played_hours}
            min={0}
            onWheel={(e) => {
              e.target.blur();
            }}
            {...register("played_hours")}
          />
          {errors.played_hours && (
            <div className="error-message">
              Requires a valid amount of hours
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gsteam">Steam Page URL</label>
          <InputText
            id="gsteam"
            className={classNames(inputClassNames)}
            defaultValue={game.steam_page}
            {...register("steam_page")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gepic">Epic Store Page URL</label>
          <InputText
            id="gepic"
            className={classNames(inputClassNames)}
            defaultValue={game.epic_page}
            {...register("epic_page")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gdesc">Description (optional)</label>
          <InputTextarea
            id="gdesc"
            className={classNames(inputClassNames)}
            defaultValue={game.description}
            rows={5}
            {...register("description")}
            autoResize
          />
        </div>

        <div className="flex flex-row-reverse">
          <BaseButton label="Upload" type="submit" iconClassName={"upload"} />
        </div>
      </div>
    </form>
  );
};

export default EditGame;

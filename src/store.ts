import { createStore, combineReducers, Store } from "redux";

/**
 * The code in this file is inspired by this piazza post: https://piazza.com/class/kdy7dlskk493tm?cid=154
 */

export type AppState = {
    nav: string;
}

const initialState: AppState = {
    nav: "home",  // Should be "home", "filter", "profile", "book" (or "sign-out")
}

export function changeNav(newNav: string){
    return {
        type: "NEW_NAV",
        payload: newNav,
    } as const;
}

type Actions = ReturnType<typeof changeNav>;

function navReducer(state: AppState = initialState, action: Actions) {
    switch(action.type) {
        case "NEW_NAV":
            return {
                ...state,
                nav: action.payload,
            };
        default: state;
    }
}

const rootReducer = combineReducers<AppState>({
    nav: navReducer,
})

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

export const store = configureStore();

/////////////////////////////////////////////////////////////////////////////////////////////////////////7
/*
//Typene brukt i state
export type Person = {
    id: number;
    name: string;
};
export type AppState = {
    people: Person[];
};
//Funksjoner som returnerer action-objekter
export function addPerson(personName: string) {
    return {
        type: "ADD_PERSON",
        payload: personName
    } as const;
}
export function removePerson(id: number) {
    return {
        type: "REMOVE_PERSON",
        payload: id
    } as const;
}

type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>;

//Reducer-funksjonen, initialiserer store med tom liste
function peopleReducer(state: Person[] = [], action: Actions) {
    switch (action.type) {
        case "ADD_PERSON":
            return state.concat({ id: state.length + 1, name: action.payload });
        case "REMOVE_PERSON":
            return state.filter(person => person.id !== action.payload);
        default:
            neverReached(action);
    }
    return state;
}
function neverReached(never: never) {}

//Utility-funksjon for å kombinere flere reducere
const rootReducer = combineReducers<AppState>({
    people: peopleReducer
});

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}
//Hvis du vil bruke redux dev tools kan du erstatte undefined med
//(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

//Oppretter en store
export const store = configureStore();*/

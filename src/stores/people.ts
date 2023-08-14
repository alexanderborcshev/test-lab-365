import {defineStore} from 'pinia'
import type Person from "@/types/Person";
import PeopleService from "@/service/PeopleService";
import {computed, ref} from "vue";

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref([] as Person[]);
    const favoriteList = computed(() => {
        return  peopleList.value.filter(i => i.favorite);
    });
    const detail = ref({});
    const person = ref({
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        id: null,
        favorite: false,
        inLocal: false,
    } as Person);
    async function getAll (next:string|null) {
        const result = await PeopleService.getAll(next).then((items) => {
            const itemsResult = items.results && Array.isArray(items.results) ? items.results : [];
            for (const item of itemsResult) {
                const id = getId(item?.url);
                const person: Person = {
                    name: item?.name,
                    height: item?.height,
                    mass: item?.mass,
                    hair_color: item?.hair_color,
                    id: id,
                    favorite: !!localStorage.getItem(`favorites[${id}]`),
                    inLocal: !!localStorage.getItem(`people[${id}]`),
                }
                peopleList.value.push(person);
            }
            return {
                next: items?.next,
            };
        });
        if (result.next) {
            await getAll(result.next);
        }
    }
    async function getDetail (id: number) {
        detail.value = {};
        await PeopleService.getDetail(id).then((item) => {
            detail.value = item;
            person.value = {
                name: item?.name,
                height: item?.height,
                mass: item?.mass,
                hair_color: item?.hair_color,
                id: id,
                favorite: !!localStorage.getItem(`favorites[${id}]`),
                inLocal: !!localStorage.getItem(`people[${id}]`),
            }
            return item;
        });
    }
    function getId (url: string): number|null {
        const match = /(?<=people\/)\d*/.exec(url)
        return match ? +match[0] : null;
    }
    function toggleFavorite(item: Person) {
        peopleList.value.forEach(x =>  {
            if (x.id == item.id) {
                if (localStorage.getItem(`favorites[${item.id}]`)) {
                    localStorage.removeItem(`favorites[${item.id}]`);
                    x.favorite = false;
                } else {
                    x.favorite = true;
                    localStorage.setItem(`favorites[${item.id}]`, JSON.stringify(x));
                }
            }
        });
    }

    function toggleFavoriteDetail(item: Person) {
        toggleFavorite(item);
        person.value.favorite = !person.value.favorite;
    }

    function toggleLocalStorage(item: Person) {
        peopleList.value.forEach(x =>  {
            if (x.id == item.id) {
                if (localStorage.getItem(`people[${item.id}]`)) {
                    localStorage.removeItem(`people[${item.id}]`);
                    x.inLocal = false;
                } else {
                    x.inLocal = true;
                    localStorage.setItem(`people[${item.id}]`, JSON.stringify(x));
                }
            }
        });
    }

    function toggleLocalStorageDetail(item: Person) {
        toggleLocalStorage(item);
        person.value.inLocal = !person.value.inLocal;
    }

    return {
        peopleList,
        favoriteList,
        detail,
        person,
        getAll,
        toggleFavorite,
        toggleLocalStorage,
        getDetail,
        getId,
        toggleFavoriteDetail,
        toggleLocalStorageDetail,
    }
});
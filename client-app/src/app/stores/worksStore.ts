import {  makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Works } from "../models/works";
import { format } from "date-fns";
import { SyntheticEvent } from "react";


export default class WorksStore{
worksRegistry = new Map<string, Works>();
selectedWorks: Works | undefined= undefined;
editMode = false;
loading = false;
loadingInitial = false;

    constructor(){
        makeAutoObservable(this)

    }

    get workiesByDate(){
        return Array.from(this.worksRegistry.values()).sort((a, b) =>
        a.date!.getTime() - b.date!.getTime());
        }
    
        get groupedWorkies(){
    return Object.entries(
        this.workiesByDate.reduce((workies, works) =>{
            const date = format(works.date!, 'dd MMM yyyy h:mm aa' );
            workies[date] = workies[date] ? [...workies[date], works] : [works];
            return workies;
        }, {} as {[key: string]: Works[]} )
    )
        }

    loadWorkies = async () => {
        this.loadingInitial = true;
        try{
         const workies = await agent.Workies.list();
            workies.forEach(works =>{
                this.setWorks(works);
              })
              this.setLoadingInitial(false);
        }catch (error){
            console.log(error);
                this.setLoadingInitial(false);    
        }
    }

    loadWorks =async (id : string) => {
        let works =this.getWorks(id);
        if(works){
            this.selectedWorks = works;
            return works;
        }else {
            this.loadingInitial = true;
            try{ 
                 works = await agent.Workies.details(id);
                this.setWorks(works);
                runInAction(() =>{
                    this.selectedWorks = works;
                })
               
                this.setLoadingInitial(false);
                return works;
            }catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }



    }

    private setWorks =(works : Works) =>{
        works.date = new Date (works.date!);
        this.worksRegistry.set(works.id, works);
    }

    private getWorks =(id: string) => {
        return this.worksRegistry.get(id);

    }
    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }

    createWorks = async (works: Works) => {
        this.loading = true;
      
        try{
            await agent.Workies.create(works);
            runInAction(() =>{
                this.worksRegistry.set(works.id, works);
                this.selectedWorks = works;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    updateWorks = async (works: Works) => {
        this.loading = true;
        try{
            await agent.Workies.update(works);
            runInAction(()=>{
              this.worksRegistry.set(works.id, works);
              this.selectedWorks = works;
              this.editMode = false;
              this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    deleteWorks = async (event: SyntheticEvent<HTMLButtonElement>,id: string) =>{
        
        this.loading = true;
        try{    
            await agent.Workies.delete(id);
            runInAction(()=>{
                this.worksRegistry.delete(id);
               
                this.loading=false;
})
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}



const Achievement =   ({tag,icon})=>{
    return (
        <div className="flex flex-col items-center gap-1">
            <img src={icon} alt="icon" className="h-7 w-7"/>
            <p className="text-black font-light" style={{fontSize:'10px'}}>{tag}</p>
        </div>
    )
}
export default Achievement;
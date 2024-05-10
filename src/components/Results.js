
export const Results = ({ secretSantaResuls }) => {
    return(
        <div className="text-center">
            {!!Object.keys(secretSantaResuls).length && (<h2>Here are the results</h2>)}
            {secretSantaResuls && Object.keys(secretSantaResuls).map(giver =>
                <>
                    <p>{`${giver} gives to ${secretSantaResuls[giver]}`}</p>
                </>
            )}
        </div>

    ) ;

};
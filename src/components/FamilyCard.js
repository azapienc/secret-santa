
export const FamilyCard = ({ familyData }) => {

    return(
        <>
        <h2>{familyData.name}</h2>
        {familyData.members.map(member => 
            <p key={member}>{member}</p>
        )}
        </>
    );
}
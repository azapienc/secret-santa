
export const FamilyCard = ({ familyData }) => {
    return (
        <div className="col-sm-6 mb-5 d-flex justify-content-center">
            <div className="card family-card" style={{ width: "15rem" }}>
            <div className="card-body">
                    <h2 className="card-title">{familyData.name}</h2>
                <ul className="list-group list-group-flush">
                    {familyData.members[0].map(member => 
                        <li key={member} className="list-group-item bg-transparent">{member}</li>
                    )}
                </ul>
                </div>
            </div>
        </div>
    );
}
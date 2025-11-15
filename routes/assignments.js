let Assignment = require('../model/assignment');

// Récupérer tous les assignments avec pagination (GET)
async function getAssignments(req, res){
    try {
        var aggregateQuery = Assignment.aggregate();

        const assignments = await Assignment.aggregatePaginate(
            aggregateQuery,
            {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
            }
        );
        res.send(assignments);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Récupérer un assignment par son id (GET)
async function getAssignment(req, res){
    try {
        let assignmentId = req.params.id;
        const assignment = await Assignment.findOne({id: assignmentId});
        res.json(assignment);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res){
    try {
        let assignment = new Assignment();
        assignment.id = req.body.id;
        assignment.nom = req.body.nom;
        assignment.dateDeRendu = req.body.dateDeRendu;
        assignment.rendu = req.body.rendu;

        console.log("POST assignment reçu :");
        console.log(assignment);

        await assignment.save();
        res.json({ message: `${assignment.nom} saved!`});
    } catch (err) {
        res.status(500).send('cant post assignment ' + err);
    }
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
    try {
        console.log("UPDATE recu assignment : ");
        console.log(req.body);
        
        const assignment = await Assignment.findByIdAndUpdate(
            req.body._id, 
            req.body, 
            {new: true}
        );
        res.json({message: 'updated'});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// suppression d'un assignment (DELETE)
async function deleteAssignment(req, res) {
    try {
        const assignmentId = parseInt(req.params.id);
        const assignment = await Assignment.findOneAndDelete({ id: assignmentId });
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        return res.json({ message: `${assignment.nom} deleted` });
    } catch (err) {
        return res.status(500).send(err);
    }
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };

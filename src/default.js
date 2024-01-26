const addDay = new Date(Date.now()).toLocaleDateString('en-CA');
const addWeek = new Date(Date.now()+1000*60*60*24*6).toLocaleDateString('en-CA');
const addTwoWeek = new Date(Date.now()+1000*60*60*24*14).toLocaleDateString('en-CA');

const preTasks = [{
    "title": "Revise the powerpoint",
    "description": "check the numbers",
    "priority": "low",
    "dueDate": addWeek,
    "project": "work"
},
{
    "title": "Meet Phil in ABC centre at 7pm",
    "description": "bring the cards",
    "priority": "medium",
    "dueDate": addTwoWeek,
    "project": "friend"
},
{
    "title": "Board game gathering in EFG Cafe at 2pm",
    "description": "",
    "priority": "medium",
    "dueDate": addWeek,
    "project": "friend"
},
{
    "title": "Send confirmed email to Pete",
    "description": "",
    "priority": "high",
    "dueDate": addWeek,
    "project": "work"
},
{
    "title": "Wash the clothes",
    "description": "",
    "priority": "high",
    "dueDate": addDay,
    "project": "home"
},
{
    "title": "Buy 2lbs beef",
    "description": "",
    "priority": "high",
    "dueDate": addDay,
    "project": "home"
}];

export default preTasks;
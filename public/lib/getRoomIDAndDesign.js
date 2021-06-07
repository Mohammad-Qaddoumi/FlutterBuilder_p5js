export default async function getRoomIdAndDesign(app_id)
{
    let url = "https://less-code.000webhostapp.com/getRoomId.php";
    let response = await fetch(url,{
        method : 'POST',
        body : JSON.stringify( {app_id : app_id}, null, 0)
    });
    let result = await response.text();
    ROOM_ID = result;
    url = "https://less-code.000webhostapp.com/recieve2.php";
    response = await fetch(url,{
        method : 'POST',
        body : JSON.stringify( {app_id : app_id}, null, 0)
    });
    result = await response.text();
    DESIGN = result;
}
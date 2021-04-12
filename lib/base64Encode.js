export default function binaryToBase64(p5,selectedfile) 
{
    // let selectedfile = document.getElementById("image-BG").files;
    if (selectedfile.length > 0) 
    {
        p5.updateison = true;
        p5.lockSelected = true;
        p5.txtUpdating.text = "Loading img ...";
        let imageFile = selectedfile[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            p5.selected.img = fileLoadedEvent.target.result;
            setTimeout( () => {
                p5.updateison = false;
                p5.lockSelected = false;
                p5.txtUpdating.text = "Updating...";
                console.log(p5.selected);
            } , 2000);
        }
        fileReader.readAsDataURL(imageFile);
    }
}
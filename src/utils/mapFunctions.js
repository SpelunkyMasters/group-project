module.exports = {
    bubble: (arr) => {
        let newArr = [...arr]
        function bubbleSort(arr){
            for (var j=0; j<arr.length; j++) {
                let swapped = false;
                for (var i = 0; i< arr.length - j - 1; i++) {
                    if (arr[i] > arr[i + 1]) {
                        swap(arr, i, i+1)
                        swapped = true;
                    }
                }
                if(!swapped) {
                    return
                }
            }
        }
        function swap(arr, i, j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            return arr;
        }
        bubbleSort(newArr)
        return newArr
    },
    findBounds: function(latPoints, lngPoints){
        let sortedLat = this.bubble(latPoints)
        let sortedLng = this.bubble(lngPoints)
        let maxLat = sortedLat[sortedLat.length - 1]
        let minLat = sortedLat[0]
        let maxLng = sortedLng[sortedLng.length - 1]
        let minLng = sortedLng[0]
        let points = [
            {lat: maxLat, lng: maxLng},
            {lat: maxLat, lng: minLng},
            {lat: minLat, lng: maxLng},
            {lat: minLat, lng: minLng}
        ]
        return points
    }
}
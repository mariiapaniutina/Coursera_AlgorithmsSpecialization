LogHelper.log('INIT :: quickSort.js');

var parseTextToArr = function(text){
    var arr = [];
    var len = text.length;
    var tmp = '';
    for (var i=0; i<len; i++){
        if (text[i] !== '\n'){
            tmp += text[i];
        } else {
            arr.push(+tmp);
            tmp = '';
        }
    }
    if (tmp !== ''){
        arr.push(+tmp);
    }
    return arr;
};

var quickSortPivotFirst = function(input){
    var comparisons = 0;
    var arr = input;

    var quickSortPart = function(start, end){
        if (start >= end){
            return;
        }

        comparisons += end - start;

        var pivotIdx = start;
        var i = start;
        var j = i+1;

        while (j <= end){
            if (arr[j] < arr[pivotIdx]){
                var tmp = arr[j];
                arr[j] = arr[i+1];
                arr[i+1] = tmp;
                i++
            }

            j++;

        }

        //latest swap
        tmp = arr[i];
        arr[i] = arr[pivotIdx];
        arr[pivotIdx] = tmp;

        quickSortPart(start, i-1);
        quickSortPart(i+1, end);

    };

    quickSortPart(0, arr.length-1);

    return {
        arr:  arr,
        comparisons: comparisons
    };
};

var quickSortPivotLast = function(input){
    var comparisons = 0;
    var arr = input;

    var quickSortPart = function(start, end){
        if (start >= end){
            return;
        }

        comparisons += end - start;

        //swap first and latest
        var stm = arr[end];
        arr[end] = arr[start];
        arr[start] = stm;

        var pivotIdx = start;
        var i = start;
        var j = i+1;

        while (j <= end){
            if (arr[j] < arr[pivotIdx]){
                var tmp = arr[j];
                arr[j] = arr[i+1];
                arr[i+1] = tmp;
                i++
            }

            j++;

        }

        //latest swap
        tmp = arr[i];
        arr[i] = arr[pivotIdx];
        arr[pivotIdx] = tmp;

        quickSortPart(start, i-1);
        quickSortPart(i+1, end);

    };

    quickSortPart(0, arr.length-1);

    return {
        arr:  arr,
        comparisons: comparisons
    };
};

var quickSortPivotMiddle = function(input){
    var comparisons = 0;
    var arr = input;

    var quickSortPart = function(start, end){
        if (start >= end){
            return;
        }

        comparisons += end - start;

        var midIdx = Math.floor((end-start)/2 + start);

        if (midIdx !== start){
            //find proper pivot index
            var testIdx;
            var max = Math.max(arr[start], arr[end], arr[midIdx]);
            var min = Math.min(arr[start], arr[end], arr[midIdx]);

            if (arr[midIdx] < max && arr[midIdx] > min){
                testIdx = midIdx;
            } else if (arr[end] < max && arr[end] > min){
                testIdx = end;
            } else if (arr[start] < max && arr[start] > min){
                testIdx = start;
            }

            //swap first and proper pivot
            var stm = arr[testIdx];
            arr[testIdx] = arr[start];
            arr[start] = stm;
        }

        var pivotIdx = start;
        var i = start;
        var j = i+1;

        while (j <= end){
            if (arr[j] < arr[pivotIdx]){
                var tmp = arr[j];
                arr[j] = arr[i+1];
                arr[i+1] = tmp;
                i++
            }

            j++;

        }

        //latest swap
        tmp = arr[i];
        arr[i] = arr[pivotIdx];
        arr[pivotIdx] = tmp;

        quickSortPart(start, i-1);
        quickSortPart(i+1, end);

    };

    quickSortPart(0, arr.length-1);

    return {
        arr:  arr,
        comparisons: comparisons
    };
};

$.get( "input.txt", function( data ) {
    var arrF = parseTextToArr(data);
    var arrL = parseTextToArr(data);
    var arrM = parseTextToArr(data);

    var arrFirst = quickSortPivotFirst(arrF);
    var arrLast = quickSortPivotLast(arrL);
    var arrMiddle = quickSortPivotMiddle(arrM);

    LogHelper.log('Result when pivot is first', arrFirst.comparisons);
    LogHelper.log('Result when pivot is last', arrLast.comparisons);
    LogHelper.log('Result when pivot is midium', arrMiddle.comparisons);
});
const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'sucess',
      requestAt : req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  };
  
  exports.getTour = (req, res) => {
    console.log(req.params);
    const id = Number(req.params.id);
    const tour = tours.find(el => el.id === id);
    if (!tour) {
      return res.status(404).json({
        status: 'faild',
        message: 'Invalid ID'
      });
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        tour
      }
    });
  };
  
  exports.createTour = (req, res) => {
    console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
      },
      req.body
    );
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      err => {
        res.status(201).json({
          status: 'sucess',
          data: {
            tour: newTour
          }
        });
      }
    );
  };
  exports.updateTour = (req, res) => {
  
    console.log(req.body.duration)
  
    if (req.params.id * 1 > tours.length - 1) {
      return res.status(404).json({
        status: 'faild',
        message: 'Invalid ID Update Request '
      });
    }
    console.log("tours = ", tours[req.params.id]);
  
  
    res.status(200).json({
      status: 'sucess',
      data: {
        tour: '<Updated tour here...>'
      }
    })
  };
  exports.deleteTour = (req, res) => {
  
  
  
    if (req.params.id * 1 > tours.length - 1) {
      return res.status(404).json({
        status: 'faild',
        message: 'Invalid ID Update Request '
      });
    }
    console.log("tours = ", tours[req.params.id]);
  
  
    res.status(204).json({
      status: 'sucess',
      data: null
    })
  };
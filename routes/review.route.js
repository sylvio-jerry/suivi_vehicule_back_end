const router = require('express').Router()
const review = require('../controller/reviewController')

router.post('/', review.getReview)
// router.post('/review_between_2_date',review.getShiftData)

module.exports = router
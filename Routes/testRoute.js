import express from 'express'
import {testjobportal} from '../Controller/Controller.js'

const router = express.Router()



router.post('/test-job' , testjobportal )

export default router
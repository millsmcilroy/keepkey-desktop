import { Body, Controller, Get, Post, Route, Tags, Response } from 'tsoa';
import { WriteBody } from '../types';
import { kkStateController } from '../../main';
export let deviceBusyRead = false
export let deviceBusyWrite = false

//route
@Tags('Raw KeepKey Device I/0 Endpoints')
@Route('exchange')
export class BDeviceController extends Controller {
    @Get('device')
    // @Security("api_key")
    @Response(500, "Unable to communicate with device")
    public async readDevice() {
        try {
            deviceBusyRead = true
            console.log('readDevice')
            let resp = await kkStateController.transport?.readChunk() ?? ''
            deviceBusyRead = false
            return {
                data: Buffer.from(resp as any).toString('hex')
            }
        } catch (e) {
            deviceBusyRead = false
            throw(e)
        }
    }

    @Post('device')
    // @Security("api_key")
    @Response(500, "Unable to communicate with device")
    public async writeDevice(@Body() body: WriteBody) {
        try {
            deviceBusyWrite = true
            console.log('writeDevice')
            let msg = Buffer.from(body.data, 'hex') ?? ''
            kkStateController.transport?.writeChunk(msg)
            deviceBusyWrite = false
            return { output: msg.toString() }
        } catch (e) {
            deviceBusyRead = false
            throw(e)
        }
    }
}
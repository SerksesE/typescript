import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post } from 'routing-controllers'
// import pagesById, { Page } from './data'
import { Page } from './entity'

// type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }

  @Get('/pages')
  allPages = async () => {
    const pages = await Page.find()
    return { pages }
  }

  // @Get('/pages')
  // allPages(
  // ): PageList {
  //   return { pages: Object.values(pagesById) }
  // }

  @Put('/pages/:id')
  @HttpCode(201)
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ) {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return Page.merge(page, update).save()
  }

  // @Put('/pages/:id')
  // @HttpCode(201)
  // updatePage(
  //   @Param('id') id: number,
  //   @Body() body: Partial<Page>
  // ): Page {
  //   console.log(`Incoming PUT body param:`, body)
  //   return pagesById[id]
  // }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ) {
    return page.save()
  }

  // @Post('/pages')
  // @HttpCode(201)
  // createPage(
  //   @Body() body: Page
  // ): Page {
  //   console.log(`Incoming POST body param:`, body)
  //   return body
  // }
}
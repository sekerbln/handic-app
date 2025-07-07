import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
    async findByDocumentId(ctx) {
        const { documentId } = ctx.params;
        const { locale } = ctx.query;

        const entity = await strapi.db.query('api::event.event').findOne({
            where: {
                documentId,
                locale,
            },
        });

        if (!entity) {
            return ctx.notFound();
        }

        return { data: entity };
    },
}));

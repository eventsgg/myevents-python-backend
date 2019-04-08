from django.views.generic import TemplateView


class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Index.self).get_context_data(*args, **kwargs)
        context['message'] = 'Hello World!'
        return context
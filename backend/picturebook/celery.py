import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'picturebook.settings')

app = Celery('picturebook')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
    
app.conf.update(
    broker_connection_retry_on_startup=True,
    broker_connection_max_retries=10,
    worker_log_format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    worker_log_level='DEBUG',
)
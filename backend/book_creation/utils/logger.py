import logging
from django.utils import timezone

class BookCreationLogger:
    def __init__(self, name='book_creation'):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        
        # ファイルハンドラーの設定
        file_handler = logging.FileHandler(f'book_creation_{timezone.now().strftime("%Y%m%d_%H%M%S")}.log')
        file_handler.setLevel(logging.INFO)
        
        # コンソールハンドラーの設定
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # フォーマッターの設定
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        # ハンドラーをロガーに追加
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def info(self, message):
        self.logger.info(message)

    def success(self, message):
        self.logger.info(f"SUCCESS: {message}")

    def error(self, message):
        self.logger.error(f"ERROR: {message}")

    def start_process(self, process_name):
        self.logger.info(f"開始: {process_name}")

    def end_process(self, process_name):
        self.logger.info(f"完了: {process_name}")

book_logger = BookCreationLogger()
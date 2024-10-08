# Generated by Django 4.1.3 on 2024-08-10 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.PositiveIntegerField(verbose_name='index')),
                ('gorod', models.CharField(blank=True, max_length=512, null=True, verbose_name='город')),
                ('rayon', models.CharField(blank=True, max_length=512, null=True, verbose_name='район')),
                ('ulica', models.CharField(blank=True, max_length=512, null=True, verbose_name='улица')),
                ('dom', models.CharField(blank=True, max_length=512, null=True, verbose_name='дом')),
                ('kv', models.CharField(blank=True, max_length=512, null=True, verbose_name='квартира')),
                ('pr', models.IntegerField(default=0, verbose_name='pr')),
                ('period', models.CharField(max_length=64, verbose_name='период')),
                ('ls', models.CharField(blank=True, max_length=512, verbose_name='лицевой счет')),
                ('fio', models.CharField(blank=True, max_length=512, null=True, verbose_name='фамилия имя отчество')),
                ('opl_tko', models.FloatField(default=0, verbose_name='опл тко')),
                ('vh_saldo', models.FloatField(default=0, verbose_name='входящее сальдо')),
                ('nacis', models.FloatField(default=0, verbose_name='начисление')),
                ('kor', models.FloatField(default=0, verbose_name='корректировка')),
                ('opl', models.FloatField(default=0, verbose_name='опл')),
                ('ish_saldo', models.FloatField(default=0, verbose_name='исходящее сальдо')),
                ('vh_saldo_pen', models.FloatField(default=0, verbose_name='вх.с.пен')),
                ('pen', models.FloatField(default=0, verbose_name='пеня')),
                ('kor_pen', models.FloatField(default=0, verbose_name='кор.пен.')),
                ('opl_pen', models.FloatField(default=0, verbose_name='опл.пен.')),
                ('ish_saldo_pen', models.FloatField(default=0, verbose_name='исх.с.пен')),
                ('ad', models.CharField(blank=True, max_length=512, null=True, verbose_name='адрес')),
                ('active', models.CharField(max_length=512, verbose_name='активен')),
                ('tip', models.CharField(max_length=64, verbose_name='тип')),
                ('itog', models.FloatField(default=0, verbose_name='итого')),
                ('qr', models.CharField(blank=True, max_length=1024, verbose_name='qr')),
                ('uid', models.CharField(max_length=512, verbose_name='uid')),
                ('dolg_m', models.IntegerField(default=0, verbose_name='dolgm')),
                ('soob', models.CharField(blank=True, max_length=5096, verbose_name='soob')),
                ('vh_saldo_s', models.FloatField(default=0, verbose_name='входящее сальдо c.')),
                ('nacis_s', models.FloatField(default=0, verbose_name='начисление с.')),
                ('kor_s', models.FloatField(default=0, verbose_name='корректировка с.')),
                ('opl_s', models.FloatField(default=0, verbose_name='опл c.')),
                ('ish_saldo_s', models.FloatField(default=0, verbose_name='исходящее сальдо c.')),
                ('itog_vse', models.FloatField(default=0, verbose_name='итог все')),
                ('potok', models.IntegerField(default=0, verbose_name='potok')),
                ('nn', models.IntegerField(default=0, verbose_name='nn')),
                ('nns', models.IntegerField(default=0, verbose_name='nns')),
            ],
            options={
                'verbose_name': 'платежный документ',
                'verbose_name_plural': 'платежные документы',
                'db_table': 'kvitok',
            },
        ),
    ]

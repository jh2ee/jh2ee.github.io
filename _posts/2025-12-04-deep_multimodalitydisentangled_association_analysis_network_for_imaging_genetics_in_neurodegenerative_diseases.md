---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDHWAOXU%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIBfvXvD3YZsrMv0U3dp569%2Bja49KErRTlumIWFLz%2BbJHAiEA9uKYM%2BDh6GkcZpi0jy4%2FfDVQtPErOGAbfeNwgEV9eNYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDKq3yHx5zXpEOM1G9ircA4gTli3eFVpE0JGA7AAAIpE%2FwpopzaJ0qKJobBCJinhY98EzecTxhAB623I3k768cMfw4HY3hQjmqUsZGj35MpTtOjgnQD7SdwrEklzIneJOxv4mSdQfAxykUBhKNB%2B1uZwkhmRe8Qot57wpcjAaFyuwoNZEQQacU6qTCGp816PE35HZ%2F%2BP6Kor%2BuWbCzR2g4pp0aGdURjhTSIb1eyYyKqQRbzAsofCdH4kRkVZVUYmoxINg7TaYX1arT1j%2FNDkkfZejpxjtYZjDBW8hFBTDQpQh%2BINGMJm%2BR4iQNa1jr7NF5MAtviQqPH024jC%2BbdRvP2LvL7xz2eAHiAVFug0t20tcK49wIPGmVsu9B%2F71QdqvVelIz8sXpdhkkCD1KBCdvOpsH5c7DGmgmWeU5sf63H1PSUk%2BwF%2BDJe9CJoaaC2He0HlE9Kf6lOhArF19cbse%2BeeOywqj9eBJqRtJXXHKm2gtJ75odilYl16G%2BpLb%2ByCEaNYEUVvz%2BJAZC4HYKNX%2B8Pt4LF%2BrGonZwJJjm9isW1ZvpJ%2B9Vguv8AH1181rJXVxXUKLvsVKdm2i7NaRxfE8fqAdaWIuHrCvcElIPTlkpDbuOMqA%2FMbnFY6U53F4wrwVDOBgy%2F0DFYsJGXh4MNSewcwGOqUBJCyJ%2FgjFFUOBr%2FgxNPGOYqt5Jm5rxMdmcWKbpPfxhMjd3CXvUMmLacWuA9FH3VzT%2FqxitHBswLZ%2BZyIV3FEPogBPNJ6yIFdj%2F8Rnuc%2FIW5I%2FiX43lsNDx%2B80TMdA%2BZVviDeD3u7AF37sI4%2B1yAA8qPSo4RLAdmDQ4iXvkHrqcTXqEY8HanPcLIOD%2F1aGr6CyUH6uicoD%2FjrKgVu%2Fx479Vt8j3NxY&X-Amz-Signature=09496034d24d5610e19cbb515ffbc7386999f21e63034e92fee95924baf2143f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDHWAOXU%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIBfvXvD3YZsrMv0U3dp569%2Bja49KErRTlumIWFLz%2BbJHAiEA9uKYM%2BDh6GkcZpi0jy4%2FfDVQtPErOGAbfeNwgEV9eNYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDKq3yHx5zXpEOM1G9ircA4gTli3eFVpE0JGA7AAAIpE%2FwpopzaJ0qKJobBCJinhY98EzecTxhAB623I3k768cMfw4HY3hQjmqUsZGj35MpTtOjgnQD7SdwrEklzIneJOxv4mSdQfAxykUBhKNB%2B1uZwkhmRe8Qot57wpcjAaFyuwoNZEQQacU6qTCGp816PE35HZ%2F%2BP6Kor%2BuWbCzR2g4pp0aGdURjhTSIb1eyYyKqQRbzAsofCdH4kRkVZVUYmoxINg7TaYX1arT1j%2FNDkkfZejpxjtYZjDBW8hFBTDQpQh%2BINGMJm%2BR4iQNa1jr7NF5MAtviQqPH024jC%2BbdRvP2LvL7xz2eAHiAVFug0t20tcK49wIPGmVsu9B%2F71QdqvVelIz8sXpdhkkCD1KBCdvOpsH5c7DGmgmWeU5sf63H1PSUk%2BwF%2BDJe9CJoaaC2He0HlE9Kf6lOhArF19cbse%2BeeOywqj9eBJqRtJXXHKm2gtJ75odilYl16G%2BpLb%2ByCEaNYEUVvz%2BJAZC4HYKNX%2B8Pt4LF%2BrGonZwJJjm9isW1ZvpJ%2B9Vguv8AH1181rJXVxXUKLvsVKdm2i7NaRxfE8fqAdaWIuHrCvcElIPTlkpDbuOMqA%2FMbnFY6U53F4wrwVDOBgy%2F0DFYsJGXh4MNSewcwGOqUBJCyJ%2FgjFFUOBr%2FgxNPGOYqt5Jm5rxMdmcWKbpPfxhMjd3CXvUMmLacWuA9FH3VzT%2FqxitHBswLZ%2BZyIV3FEPogBPNJ6yIFdj%2F8Rnuc%2FIW5I%2FiX43lsNDx%2B80TMdA%2BZVviDeD3u7AF37sI4%2B1yAA8qPSo4RLAdmDQ4iXvkHrqcTXqEY8HanPcLIOD%2F1aGr6CyUH6uicoD%2FjrKgVu%2Fx479Vt8j3NxY&X-Amz-Signature=09496034d24d5610e19cbb515ffbc7386999f21e63034e92fee95924baf2143f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDB6MAQ4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQD%2FrYV2drXwy3%2BYkoHR2MG7nFUjOdxuKiWaTd9Ipxl3SgIhAO5o3MrgzIOTUZKPNTGS9lWlerukxxiDpGGxg34uIYu2Kv8DCAQQABoMNjM3NDIzMTgzODA1IgwvR%2FKOiC5EM0wt4%2Foq3AORVJDS40beo3VB3t1xEtyA62c3TGCZT%2Fe7auWYzx0NDuJJiBJEylgV9Ogl6EJwL1rXrhqE2dsClwFoVTsmHCLJ44k2aVGZY278H2kEAsRN4Wt%2BUqzrMkv%2Bn4wtR8LZ098UoVQpWvJAlroifK7mW8mpbRcl%2Fce%2BZSTqcnJEYJaSwnPmVFaYbRp2BOCTOWL%2B5k%2B1H28Fe%2F9EkBRR6721E527IDrxU8MroihEdRShbCOEURT2r53Di3vVfd51ebFaUgfc3vbVPviJHShz0fTO1s2YVbG08%2Frr9uho9WpBRSt3%2Fp0vfbTVtrRrEQ0jF19mqwZj0SBID2z7CTa8i6fWp1%2ByjQgL3GPJJZ8vhVahxD9yJiC1e9EN%2FzexWXLQ%2BI7Hm4EbRbrh7vhbWm0eON7DQVeEN8UI1JwmbS88QLbww17MBU1HSzOotILHze9bGB%2FoXmXxIKhZcX8xJbpP8urdFfuVzFZJKOHVasmVZ4YlVVuAFZbAIeHVA60VptWZv%2FPHKGThFrxyws3AKuurl7gAWv631Dw7am4egnWfP7c9sdV361mSzrQSyyDQYAS%2Bgq7W1nA%2B9evBhSBfEJWgO3H4dETRRnw3oepTdXrb4zfsRf3EpmLrlbDQbZaOmsNhCjC5nsHMBjqkAfp02rlTOaPDXeTV55KLDm3yDDkpUh5ZJcl5JjD0XMg1YH%2FAquWruClOQsh68AUBCcpGJZMHN8p51t3qzg3d37vuSEayplQD3tGizGiELikFvLWJsz6ex%2BqWe3giQ3zYabiZbevZhLygHTbgS01AdHKfQ21O2P%2FLZDDMg4HROem5kg6uoNFEsDKoUcRdrICg8I9aog4c0ezC1YGjwZg%2F9am%2BLsgr&X-Amz-Signature=d03003d77fa19c270b30946c82c40b374b71a363e806791c1f18039fb4828a2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJNIZMQR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDOIZyQNbJRlr8s8b8JHaUY9uc2fZAgmSGcUuU0kgvv4gIhAJuWDwGqM%2BKiZUDEaLpjmDbCHZvhjhd36oL4ivyyRzObKv8DCAQQABoMNjM3NDIzMTgzODA1IgzQ2WXJi9WiLPpj0e4q3AOI2OorfJfvxQkGESTMVvNoDOf%2FGmFLT4apC2%2F1Lardj5Y3XF9uGv9NmoPq%2FgaiDEADaLFsbs7PVpvax7b60s7Twmql4FIrd9Z8HIToFXiHeu6eHI%2FqXC434NkA53OQBLdGBqZmxTfbMifxO2EpD1yjS2wbNuyKJxL91WRjWyOo7B3atE6hdBM%2F7Xtt7M6%2Fno3uFMm5dDnniY6v4jn1D9pxCUjz2S3QB%2BAEusJx6Htadoiv0JQKSHJSy3HGp%2BFmzji7YLKKxDapbqbjVnt7V%2FgrUZgKqRQFhX2MTuwboGH6Ifxni6YEL79ULi49qKGb9uD9%2FzJhXlbzTk7iwjcRsckU%2BnQWfyIiPY%2FbJRXmTsE%2BLCIfiGedIZdnMqkl5C%2FJAfmhBAilZQZ%2FmXLTLrxkAD6arVML9YeWVDNbwm2zLGKV5FfZmE35Z4JkdI8AMtDhz9zfHhUJwhtXq1J6QZgg7mqtHKCUTeu2IjbbZvrXGdymSqWjcpKhukelgiLQubHeUfQklxb7D0yGUYW6fnrAHyl3FLpjIKtd4B3AP4zKmR7A9hwcw2jvVJTKy4rWWe9Wr2AxiOQ9jPh6W0uGfZCitVEIiuZUXn1cKY9aqKVSeIEhTpicNgoHD5V0kQZmvTCVn8HMBjqkAThK%2FewCclNcseoddhskuXglYkNgLkNcPTS5NeU%2FO7siTxtihXD7eODIHXAmUM1RUxjDM1%2FgEmmGFUhhaO8fWpZVT3bHxP5C7M7yQ5fi4dbs88%2BqfbFJ6ZbjrCnE1s1NYA2yg1np1lwNNSGeDpixfCbdlpwQ2cRQIBJ2S463JMkH5nz8tq2lLpoHjuHiC6H0zlluVHm8F%2FKNdHkgtkb0%2F8Fkad3r&X-Amz-Signature=101d8819baf52075077d06b21d01b54e290eecdab810577543fa060eee53ca3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJNIZMQR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDOIZyQNbJRlr8s8b8JHaUY9uc2fZAgmSGcUuU0kgvv4gIhAJuWDwGqM%2BKiZUDEaLpjmDbCHZvhjhd36oL4ivyyRzObKv8DCAQQABoMNjM3NDIzMTgzODA1IgzQ2WXJi9WiLPpj0e4q3AOI2OorfJfvxQkGESTMVvNoDOf%2FGmFLT4apC2%2F1Lardj5Y3XF9uGv9NmoPq%2FgaiDEADaLFsbs7PVpvax7b60s7Twmql4FIrd9Z8HIToFXiHeu6eHI%2FqXC434NkA53OQBLdGBqZmxTfbMifxO2EpD1yjS2wbNuyKJxL91WRjWyOo7B3atE6hdBM%2F7Xtt7M6%2Fno3uFMm5dDnniY6v4jn1D9pxCUjz2S3QB%2BAEusJx6Htadoiv0JQKSHJSy3HGp%2BFmzji7YLKKxDapbqbjVnt7V%2FgrUZgKqRQFhX2MTuwboGH6Ifxni6YEL79ULi49qKGb9uD9%2FzJhXlbzTk7iwjcRsckU%2BnQWfyIiPY%2FbJRXmTsE%2BLCIfiGedIZdnMqkl5C%2FJAfmhBAilZQZ%2FmXLTLrxkAD6arVML9YeWVDNbwm2zLGKV5FfZmE35Z4JkdI8AMtDhz9zfHhUJwhtXq1J6QZgg7mqtHKCUTeu2IjbbZvrXGdymSqWjcpKhukelgiLQubHeUfQklxb7D0yGUYW6fnrAHyl3FLpjIKtd4B3AP4zKmR7A9hwcw2jvVJTKy4rWWe9Wr2AxiOQ9jPh6W0uGfZCitVEIiuZUXn1cKY9aqKVSeIEhTpicNgoHD5V0kQZmvTCVn8HMBjqkAThK%2FewCclNcseoddhskuXglYkNgLkNcPTS5NeU%2FO7siTxtihXD7eODIHXAmUM1RUxjDM1%2FgEmmGFUhhaO8fWpZVT3bHxP5C7M7yQ5fi4dbs88%2BqfbFJ6ZbjrCnE1s1NYA2yg1np1lwNNSGeDpixfCbdlpwQ2cRQIBJ2S463JMkH5nz8tq2lLpoHjuHiC6H0zlluVHm8F%2FKNdHkgtkb0%2F8Fkad3r&X-Amz-Signature=ed29db2a867382c73fdcc991ba1206a5d9d787866992681a3bd0ae18a5f8d884&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PLLX6PD%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIBG5HGdOHe8YIwXtCOrLIF5EIbd8SEFotcI55fyi8nuXAiEAvnijF9n%2FYvtWO%2FIifeUyAQJmPA1I%2FTb8CpXzuUnkN1Uq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDIo8FQnQTlRVOTXqmSrcA9mKh2yZGOdimhL4A1vnsDftkKQz3hXhdfknC9Qam4BiRoa73k%2BN00YUNyPLSye6ezAw9XL79CG2deOjCB1KQG%2FvYQgoo%2FkXYxgO4b8Ocv3KeM4oMZinxzMO5AYe1t3Py%2Fat5rnULh55wvCL9dMBg0C2%2Boujx19TE7LXNLsHcgplOgsup0f4Zu5iViyc1D%2BD6z3iqHcXvuUBLwtTcvSxrdnGe66Lk5PvENl4CsglGsdDkPcoYFe7EnS82T40qXQolUphyn8s0whmTFMu%2BbRNsJaBXoNgtC66e7pQhXjE8blOQpU7iIPTyJhNA7MvXJYC5GpMtzZt2Ejajmh8%2FVlJb%2F%2FYicm9fm123Fyo6e720j7AEE5zImVdPy9wt2kFivYGIwe8eiuNyrQuIvhDFafhTGW6pmkP%2BP74yTKDqVqOVUJkhC2g7dy82QL81tDMo3RGWf03D1JrgORBK5TjleJbsBLMN8LHrRa1hOQBlKX6lcMRDqU9%2Bccxp7e0ROCTXDCSlcZZkk4Nj8rqEieiZkLvYIKwDcjzvS0Ze2tlTvk2vJuAhI%2FdaTizrx3iNdacIreW0XEpeJlK%2BEeu4Ns7xQtMIAKPvTZFtWNeMLMM3Q5DYPR5ZWRaiVB28%2BcijeNgML%2BewcwGOqUBcrqlv5uAkldW0ElCp3IeS7H%2B5Pgrn3LFp3vHplyE8%2FtmPHhSe6eRz6UfbAh4PZkKSbqWOv72E40m31sD29BMT3ljaebjd%2BWZ%2BxDqW2CmuRW92o6PzSVXvm4XT73QbtaGpn1TIaYYRgDJaJxVwnhBVrzYHNLnZ4JAMoFcbpDmFYHgkaKbq8cQue9VYZecW4pAp5gTPaZLtApI21kRauKecj6iEsUv&X-Amz-Signature=0827ab5e1649ceeac6c597d116780e181edbbf61426db83622e9c0f2101325ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XIQTW4D%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDHkMCiYu41oUslYow367rOaDkLWBwKyEgV3ez55PiW8QIhAPVk9vIItV80KJ2WmFb8bzMou2ljXj0K1K2ip8hRnJrBKv8DCAQQABoMNjM3NDIzMTgzODA1IgzVtHqCdF3jxXrvyJwq3APrByS5b8Yh98KEz7%2F5JQpavGEMfVWK35B7VeuTj2w7PQR%2BikiKA1n%2BY10y25rzin4nZyDoX%2FgLKaniCfLSzfyci8QH4thJ2cpbipke2WBUk0yXShDMpkW3a%2BJKDSjtaE6sDmIqRysS5haP4xq6upJK%2F56Y9xVd9lY35LlKE2xPtnEkimt6a6sqgTo39p2s0tMpLabrw6bHkeAvcoIXldu%2Ba33A8Aau1oizIDdomyUv4a0LI1B0CA0DHww0Z20g%2FSAZexlKQ4f9cYcuJjcRJ6sHvcCKe%2FwrhGC1kiWJ%2BAqORVHhdNHMGX2GsdVNKfvlIgSgAUC9jFCBd3OZMrZY9QFJVzzLYPxVe8OfDcrAz1bVIrs8qGUwc5llbvl3Hno6kWsTMtWY89a011527PlJAcBQZC3bUrxcT%2FZcMrgi8nESKJrRjvFL8dtawQ49Q3CxV8RBv6B4OAvxIS4elLDS50OpIviZ0WAaN3kG1L4w8Fwi8GEa%2FIS6SQREwNxAzAPDBPPfYfXHAECMLd977nglhSPfBtx0FBYvSwHS6%2B%2BIBqpT4ddBHZgHfZNArzyH%2FpGHOfZoLIZkiUl4FnvVQPE%2Bvrq4EkA%2F3luV0s9TcNtLDHN8%2B3g2un1%2F7XlBrk0RJDDWnsHMBjqkAVKWh3%2FdXTFrZ1pBnsfNZDQqHpKYKILO2jJvDxwhb9CR6X4h8cV0iAoBmpyrpME6ZfxSHp8mb0lcfjcDfZZsO9QH1XntT4U6pBX1TkpVnBhhL7VghtiNw9jiLt2PFnXDXvAoW4qnl9uWP4PpbmkwkZWnRVmPlssXj06NhiT1er%2FELoCNxPtu8ddI5rDb%2FJvnZ5FRG7Zh%2F%2Fc4V26aKwCTfAYGavcZ&X-Amz-Signature=0af2e243849292a60c875f442cbf4e81bc078ae215d35fae8b209db31f0f11d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRV3BHQK%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIEGFGrMiGgllwPreSPwDW5Uughq%2Bxn8%2FvAF3I8bO0glxAiEAsrr4xQpyza7fstYG9xplYIGIW%2Ffs63LRoYUfTwPGLVIq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDOwvz1pjJqGrCn35uircAzvEFqS8HFqyRpw3PdybWqEr6Dgv3SxV7ILc7umVPyr3LmeF9ot4tsG2riyUT9mNJEu8CUrzS78YtYW%2F4bBnlWxQz%2BLhLpFhE2xOJ%2BYzDYpFGOjwsnvoWltCWYPpQdbt%2BAgNjWwoXNRHbT6DrNjUPYgsYe5tyqh521vABRmUeucuvet52C4tSpHACvQfoLP5bEIU0Sw9hUj7hqtv47ouCE4%2Fo8m6ahVkxDMJ%2FnuPxBwLEuMSZhWO3uZhF6Qu5eSsIUEZvQ%2FhSibtZo%2FbxWOsvV6sMuJ%2BcgRY1b91sZHEi3ia%2BC9B0K2%2B%2Fw5GrbNcULgpLZc39Iq0V7IfeCZ74doxZ24NlmqemSsRY3z%2BBYhbILrIPmJtvU365R6aCCoSh2D7Dn9N6TOLI%2FjZ3nlpXAjBID2LaLaPfVCvZ5SFv7EzhS8kimZamfCS1u2ms59CJT%2Bsar7DlLwETt0ZHbJT8MtrfdHQsqWIW02kQV1MBl1JfGxHpFCsMvuZWxAnXd%2FBgRhsPNP2d96t7DvJy06uCl6p%2BtM65qk0EH9uSRR66OWm3dLfA18iJePmA7HyRxl9HKUJPyJhyAK2VGyv3Y886j8ncH5uMAiuxRHPiW4%2BQVDwWgQchikGbtBLJylnK0ZJMJWfwcwGOqUBauMXJOO6%2BktQLE9wuHovYtjxyzC5rH0tiSGPcCkw%2BQ6O9GGJLhsT%2BpYJjIQYMEzM6C0lciktMA3J8eBZNLV7eMg%2FA68IujQOWJDvcoEKqhV81UkUErHuQhUzh28oPS9k5Tdm3IyJPkULQEMkiR%2BuLt%2FQRWUzLL0NGMaNa4w8x02PvG3Ub0Bb6bZOz3CkIGqy4a2xDEzYW4LMWPI%2F1N7XpLo0d%2FMh&X-Amz-Signature=19465bae48b9c84567d6a8507d093f4bf06f1c2886cb552b99552c58f8a1c1e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656FPAEV7%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIDFEGADJua4Q1cUH1V9chCaxLudo4pqOXEjtpIlcOhhUAiEAvb1Dk1jeAJWuGCoeDDlogq6YiHnvkB2heI16G3qF%2FP0q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMHcWvUuz0EgxH3DoSrcA%2BrbAO32pcIt2VKyvOQkP2M6TQiWfrSoH71QMhKawV5Tzdo%2BTt2du5q3u%2B%2BhcFVApcmmZ7gnh5dMSexbGlPOCq2esJnQUoL6GHE%2BGkMVIG5dnSQ%2BYZ1vRP%2Fv%2F41cn%2BHRHj5UT8DuFx3iL%2BJMcNrxXBRSqgcvfYc3dy9Kqkmt3aSE1Hj943%2BKn5azYwr0uk11vKGXAJ3Ns%2FDckJeQSOfJ9fwI9n3uWFH3jw2aZ2aF%2FvsLy8GWpeWZSpxJ6OugYi4o5H3cNf4lHoYsBqK2NLpyIESAZhAkP9CtTCIbCwS1f4Sn%2B0Sp7g%2BttPrJfngz2NDR1O1gWbg%2BDZSZIxxJr6i38hfAAow11ht0DZWYrP2iUfDX3cA9dVYSWdYI%2F2GEb1WCx74dtEYzRMvcsEnMdLICYR3JaZXf5jRhXF162E7NPqnv0h6UYZIoXLKMtkkAyV22KpKeYCzTSGQ74crq7YFHXcsh3tUge09gs5qc8vB7MXZRbUWile%2F6Uf9ZX%2BZyFKXlVzs5UnT4Xz1tOScAuPpHnoiwXAb8CrPnRlMEnx10SYx4pWkOSluoeMCMBpTvoao5EGws%2BR4cXcqYb5dUyqrIWbTjjJZiLyX6TtO7TxDUVYVJ%2FywjmeylLNcy3oL6MIKfwcwGOqUBzc8TF%2BNx5Nn9uXSrXuXcTQgKV32ncXPeNcL8UY4VDRnNbd2sc7yAiaMVbQ7PJCBtGEKiVnY3PwIK9HbetXJmazw1HlmhG9tieJ18lMgS%2BxXcaEUp64U6bpS%2BGgD%2FFbSl%2F6VrmRQjU%2BikGxsWobhKcVQ3zQtMJZI8aDCrbx1%2BL2f8M3HEgnIe5mk8vXNnbqS9DGDOg529nMcKV1b53dvEWx4ApwYd&X-Amz-Signature=b84d1cf07e255f478000545e4d5123491fd55548fbad5493d35db1f874774b14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656FPAEV7%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIDFEGADJua4Q1cUH1V9chCaxLudo4pqOXEjtpIlcOhhUAiEAvb1Dk1jeAJWuGCoeDDlogq6YiHnvkB2heI16G3qF%2FP0q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMHcWvUuz0EgxH3DoSrcA%2BrbAO32pcIt2VKyvOQkP2M6TQiWfrSoH71QMhKawV5Tzdo%2BTt2du5q3u%2B%2BhcFVApcmmZ7gnh5dMSexbGlPOCq2esJnQUoL6GHE%2BGkMVIG5dnSQ%2BYZ1vRP%2Fv%2F41cn%2BHRHj5UT8DuFx3iL%2BJMcNrxXBRSqgcvfYc3dy9Kqkmt3aSE1Hj943%2BKn5azYwr0uk11vKGXAJ3Ns%2FDckJeQSOfJ9fwI9n3uWFH3jw2aZ2aF%2FvsLy8GWpeWZSpxJ6OugYi4o5H3cNf4lHoYsBqK2NLpyIESAZhAkP9CtTCIbCwS1f4Sn%2B0Sp7g%2BttPrJfngz2NDR1O1gWbg%2BDZSZIxxJr6i38hfAAow11ht0DZWYrP2iUfDX3cA9dVYSWdYI%2F2GEb1WCx74dtEYzRMvcsEnMdLICYR3JaZXf5jRhXF162E7NPqnv0h6UYZIoXLKMtkkAyV22KpKeYCzTSGQ74crq7YFHXcsh3tUge09gs5qc8vB7MXZRbUWile%2F6Uf9ZX%2BZyFKXlVzs5UnT4Xz1tOScAuPpHnoiwXAb8CrPnRlMEnx10SYx4pWkOSluoeMCMBpTvoao5EGws%2BR4cXcqYb5dUyqrIWbTjjJZiLyX6TtO7TxDUVYVJ%2FywjmeylLNcy3oL6MIKfwcwGOqUBzc8TF%2BNx5Nn9uXSrXuXcTQgKV32ncXPeNcL8UY4VDRnNbd2sc7yAiaMVbQ7PJCBtGEKiVnY3PwIK9HbetXJmazw1HlmhG9tieJ18lMgS%2BxXcaEUp64U6bpS%2BGgD%2FFbSl%2F6VrmRQjU%2BikGxsWobhKcVQ3zQtMJZI8aDCrbx1%2BL2f8M3HEgnIe5mk8vXNnbqS9DGDOg529nMcKV1b53dvEWx4ApwYd&X-Amz-Signature=ee268f38ab2a8bcd02822d041f9b7426f5572aa10503a76ac4a02947afddb07d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UH6H7VIC%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDMLcsYk7flt%2FxKN8lvMEv2UAA6K3MNtrIIzkth8257rgIgIH%2B%2FRsQlOZyIU6ee%2BgidUq8ZY%2FEBjiLbOfuEruq4eiAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDH6aN41dr1uBG4SMOyrcAx5Q2U6DbBdU2f2AqguqCTtclTw6F3haeee%2FZIAm0T8bQ07dQx0iuNLtRZronAp3UupAm9zvCzkwJFKpzfMD5E8FAgbKE60zkolrbV%2BHufPTa0KQ3FTHSASz9gF1%2FJibbiNM2Mis%2BfXl%2FdRIUBsmwzIyiwVgvx%2BW81P9wGE6GK%2FZApFysdsVpIoG9BCIAtqUKxVp9m9DuqkCOOcALkB71IwIZ7PXOib9RY2wv7qT0Wft30ozIUPTQmXCwvPR76vyeokjkB0HeF5DgRdXJsqID4TbMggpANyJrl3qpAbk4IoLufY%2F%2FbcRVE9K68OhOhtOO4rbbo%2B1KnoZVA5wFG3xPLtWXHPU2nZnuEeRoV4cf0n0FDAWoO%2FEoNN2t%2FpXZdD5KIq%2FVIlgLGwGxwurIZgTjmldr2MNhPgAGHLjPiex1GSsre8IgYZtwc8T63UpUUy%2FgaCNlG7%2FuQ2zVyJ7JTj0qRJWWMz29oQ%2FVOWPOZZesyyl8gWDL2YdNO2LZkaaz4GK6bnUWrWE72bbeRdPrAJcg23Uu8ULm34xmRZB%2FJME6yhdzMRp625aG7XfC6uHpN211YGuZj15P1zrmhbkk97p7tep5AkdKpVa7sdpg2c2I3XpOqPErT1b1mhCWbjzMOmewcwGOqUB%2Fw5LK5JX7%2B69TsgvUwoIFreMVEiM%2FES047ikbYhHy4zLcibyWdVxQcIpynNaFbknDwPhavm2EIdJRBNfTGFY0ni4oRGFqHsJo%2BCMaGei3TV8KXcsHzRrWzsM0dty0xodTw29T47vlMh6FsSn4RntVQrcmDeRlRAQbCkp6O0dgZrWu5xW0q8hdERQu4P8mRQwaIqTPFobww9tM%2Fc34NbwiDbxID1d&X-Amz-Signature=0d564a7bf678520ed1a9dd49b7804253199888173e6fdbb9d9e11291fb2f91c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OBKQSZO%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIF5iDFsSxjYwozDN%2B3singJ%2FfNhlc2%2FqhBLskox4kaibAiEAjUAd2h4w%2FIAYUbB9CelmQs05VzyFpPB8QPp7VMbzrQsq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDK8%2FqLJvm7cjJ8pYzCrcA7YKk%2FM0YeYWYas8C5pnSbXN%2BJAw8JL0WtsfniVlpn8BibFqo%2FJoY5i1oQM74difQZDj5H57prO3q1IQNcniDjZ6P3AwM8FNXBoJZN%2Bwo2AOfXXEbB1ydPiVxzqdumAAVYH093DeoZ18UeKDR1jHPoMB04UklPAimnu%2FH0IqqEasuewL%2F9fyU8f5WERlxKfaHcBK5wyku%2ByTGR3ykuqL7r4b3FXkDgj30d8SJ7vYwLvmtZaaMhv8DsRZUZO698FvRq1FLUpOGhxQnCJzQLj%2BTETT5B1H1m4s7ySMrzlLgZvB0XEz8WOwPCLqUB3Jb7Vy6CWS5APEylKapCcZMA17iOCChohN%2BJSL7cJF0AY5%2F4%2BLysEwF1rmmOjvELtHHM5hqbYNPEQDRhgSE6cvE297qj5m8URfkZ18kuw3cg9TlfmgPA48BqxEhxjkfVdTc%2B8xpouMSw6NoNMU2YfvfCoYR9aOhbg1fYvu4LJgDaeg4Rpls72wSNNxE8369Mu1vK%2BBM87bIIRbad55lO%2BHmiYFiv3KWx1%2B4BU1OjMUcL1KDwCKBK%2FX5%2BZokLEwx2hmymHZDk4l3vOvOQIeREjlMIKf44ceaCjC0R6p6WSwYHaJFBOLoDkTz3cyeNoFFBuaMIufwcwGOqUB%2Fjhg0jLSVhFkReoefZDxZLcLWf2OdHitegj6Aa4CftJO6E%2FNamCtr8N7yY73pEAes4BXxNyE3VtUkxycbpA4wCBYYQJkL9wm3LOD6SftCefdNAKLgyEeDfYl1Ni56hDumXFLVXz%2BsnT3JGhLA3Gb%2BOSXzeSKtPhVgG%2BQb9AmP2XQHuLFzZ4Ufn2O1Fp1gBPpp%2BNkGfFWt%2B4FHKTD2N4Zr6vWE7%2Fl&X-Amz-Signature=5f54a477a903038d5c4e579845baf1f59c05a94663f38e50ef48fa3b6f4f2fac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OBKQSZO%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIF5iDFsSxjYwozDN%2B3singJ%2FfNhlc2%2FqhBLskox4kaibAiEAjUAd2h4w%2FIAYUbB9CelmQs05VzyFpPB8QPp7VMbzrQsq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDK8%2FqLJvm7cjJ8pYzCrcA7YKk%2FM0YeYWYas8C5pnSbXN%2BJAw8JL0WtsfniVlpn8BibFqo%2FJoY5i1oQM74difQZDj5H57prO3q1IQNcniDjZ6P3AwM8FNXBoJZN%2Bwo2AOfXXEbB1ydPiVxzqdumAAVYH093DeoZ18UeKDR1jHPoMB04UklPAimnu%2FH0IqqEasuewL%2F9fyU8f5WERlxKfaHcBK5wyku%2ByTGR3ykuqL7r4b3FXkDgj30d8SJ7vYwLvmtZaaMhv8DsRZUZO698FvRq1FLUpOGhxQnCJzQLj%2BTETT5B1H1m4s7ySMrzlLgZvB0XEz8WOwPCLqUB3Jb7Vy6CWS5APEylKapCcZMA17iOCChohN%2BJSL7cJF0AY5%2F4%2BLysEwF1rmmOjvELtHHM5hqbYNPEQDRhgSE6cvE297qj5m8URfkZ18kuw3cg9TlfmgPA48BqxEhxjkfVdTc%2B8xpouMSw6NoNMU2YfvfCoYR9aOhbg1fYvu4LJgDaeg4Rpls72wSNNxE8369Mu1vK%2BBM87bIIRbad55lO%2BHmiYFiv3KWx1%2B4BU1OjMUcL1KDwCKBK%2FX5%2BZokLEwx2hmymHZDk4l3vOvOQIeREjlMIKf44ceaCjC0R6p6WSwYHaJFBOLoDkTz3cyeNoFFBuaMIufwcwGOqUB%2Fjhg0jLSVhFkReoefZDxZLcLWf2OdHitegj6Aa4CftJO6E%2FNamCtr8N7yY73pEAes4BXxNyE3VtUkxycbpA4wCBYYQJkL9wm3LOD6SftCefdNAKLgyEeDfYl1Ni56hDumXFLVXz%2BsnT3JGhLA3Gb%2BOSXzeSKtPhVgG%2BQb9AmP2XQHuLFzZ4Ufn2O1Fp1gBPpp%2BNkGfFWt%2B4FHKTD2N4Zr6vWE7%2Fl&X-Amz-Signature=5f54a477a903038d5c4e579845baf1f59c05a94663f38e50ef48fa3b6f4f2fac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654RJVAP4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T111204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC9EjUNFga4QgiJF%2Bc8%2Bfdg%2BMBj%2FjqTfAccOd1dWozRZAiEA%2F1vwheShAmUrf4CqXujUP1CSqrbWpLqNrBBcK267PEwq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDE3WaL963mAGdwszNSrcAzmCLw%2F4FFR7pJOznAtfac1HasTrYy4lqYSLuQpjmqp9AULbyN5%2Fdgy04kjvzstf%2FdncS5MshCu7M%2B%2BfHEn9E3F%2BLmlfwy7DYTJ9%2Bbdk1TSzt44ev8UpCInke1TaFq5daTRBM2yMw9cFBG6qrrOtFpzfn8q5ONdXhotTM99fFwUkZDjfljz3DHtiJNCcwzhPWbHIuzUbSe%2B7QkEKa4Da6jOcuPX3%2B1Xpho9HWytjvMFZVuEhukKQGj1MZhTdIhun4v12veVNVqyzCeJtssYoACA%2FHZNZX5tvEaQSJ11Z0ovPwNnIa5TsO%2B7gymtWFn1qityFefDaNpjhsZ7kw6NLVvZvvakBX%2Bb99jWketSNUuSDlytiBquvQqBlzoyP4YAJhqQ5P0PumGrrOPyhzBb7sy5Co71mmpdKNvbhvmYe288JaNMT%2BOilCN%2Bh4fwmD1p5xJ8Ek5iSK6F%2BhbMhcMcNW2Qx5BBctYGRfcHJYDlPxRLAs0hW244dMrufVsAeJu%2F6QHQWoEvBoa%2BLp6GaXrcUjcRP0r1DTAL7Ve%2BljvYTUrrG0YfMymUFVQsGlxZrThMVRAj3MPXbImdrxuA1v5gQoNPDd%2B2vqyYdHKRfJFzXtRNnK0z0IKVvRgirqwRNMO%2BewcwGOqUBNup1r4LYJLJB2Z%2B%2F1rhGUb4bBb5MQuNHPJF2UsqVCKYrYdibWThqd5MZK%2FAoHn8lzKV9tD7H%2FQCNjMxAjqmYqykAwx4449xY6Wf6%2FcNnz4DnXGP6P1QZL8aonhxk2AJEHrvTiBIIwJJbxVdK%2Bc086t4TtZ6LbrL2RXW%2Fahj5YEcM3sGmPCtRoXMmqFoNEeJc15R2gtd1DZJhJSezGotxCOK5S2Zx&X-Amz-Signature=6f9103e2af0a54eef073212e1055c547dc2cc3b26457d16058b14da5c8ded940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


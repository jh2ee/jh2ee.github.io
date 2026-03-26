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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRU7PFU4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQCTPmIMQLOkTHPOGBtijJ32vtaaAfVu7SDlyTWR4XuHfAIhAI%2B62A3WwsiM5s8b0GSxOUPhP2EvIoRzBeRydi1x%2BYvsKogECND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsSVC8NA%2B7USH62%2Fcq3APorEzFPT%2BYoTDxlJmlEgtpNsxShWgtnqZF4nGWgYQjV6DSNLIcipdKuVlyE0om1m42JpCQyHjNGQLJAPeqSXj5MnsyHcPTBNNcGSV1r3uEY93e1UyXHquKnZO7SsCV%2BfeIOhlEsMv2zzI4NdyEVb5BoMPnLmKxhie5fMZ7c4%2B0SFzoZH2Stg1tHgx9yWfnyZ7jP4eClEgOx1p4tBRocsAKdnBcNu911xuG90WLkNwaLjtTfylefze4ShHaedstTBX3jOUJQy1tsm03NZRv0z5xzLfyh8AAFgQU5DNfZHBoaUeLVTf3q1zVX74953M3HxAQuA7vgifkGf2%2F9jd0R60iyvXU5rT0EbM%2B%2BiomWQDbDFlc6HysofF6cCfjzSNGkX5wFmHRs8EWv3b%2Fsj4GyjkoWVxEBRU0VNczsmGE1dEDElbyxdqOQB%2F%2B3JqY94fq6jkK5s%2FfEkGQ6AAFGLTYF443mJjSTaZEnLJdeNyhLfWBew8JCgZFTd6IdVYH6eQfSN4RLUB0axxkbbslhJuJ3cflHYcby8iwtYaCt1QOUqVnnyQNbng9cXhkh3ErcqRezcEMZppH5GC2ddi0a%2BEKQ4r1Qg7m7Wc3Ozhdy2zjH1r5TFWQTqrZkmuJa0wEtzDO%2BJbOBjqkAV2tBydN7%2BP%2BY1uIsEEw%2BiAP219QO0FtFIOteou9pHiiM4ghoUREkhVOjcIzhP28UuXJHieqKrZNXzf2PVLo6RnBColPM6YJHRNJRR91iEM%2FYkme1RR4uPFyuWdl%2FQAFwU6lKKHkNF9HKuDzj%2B9eNKeBFKHuC2nbycepaDwWw3LEMel9mF%2BeGiZpOv792VM7Bl3j7M5UH%2B6BvIDl4%2Bf7%2F%2B1vIGoT&X-Amz-Signature=746de9aae73d9a77ceba3b8f0e292032f635bd11d6fa75a448caa5c63ea6aab3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRU7PFU4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQCTPmIMQLOkTHPOGBtijJ32vtaaAfVu7SDlyTWR4XuHfAIhAI%2B62A3WwsiM5s8b0GSxOUPhP2EvIoRzBeRydi1x%2BYvsKogECND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsSVC8NA%2B7USH62%2Fcq3APorEzFPT%2BYoTDxlJmlEgtpNsxShWgtnqZF4nGWgYQjV6DSNLIcipdKuVlyE0om1m42JpCQyHjNGQLJAPeqSXj5MnsyHcPTBNNcGSV1r3uEY93e1UyXHquKnZO7SsCV%2BfeIOhlEsMv2zzI4NdyEVb5BoMPnLmKxhie5fMZ7c4%2B0SFzoZH2Stg1tHgx9yWfnyZ7jP4eClEgOx1p4tBRocsAKdnBcNu911xuG90WLkNwaLjtTfylefze4ShHaedstTBX3jOUJQy1tsm03NZRv0z5xzLfyh8AAFgQU5DNfZHBoaUeLVTf3q1zVX74953M3HxAQuA7vgifkGf2%2F9jd0R60iyvXU5rT0EbM%2B%2BiomWQDbDFlc6HysofF6cCfjzSNGkX5wFmHRs8EWv3b%2Fsj4GyjkoWVxEBRU0VNczsmGE1dEDElbyxdqOQB%2F%2B3JqY94fq6jkK5s%2FfEkGQ6AAFGLTYF443mJjSTaZEnLJdeNyhLfWBew8JCgZFTd6IdVYH6eQfSN4RLUB0axxkbbslhJuJ3cflHYcby8iwtYaCt1QOUqVnnyQNbng9cXhkh3ErcqRezcEMZppH5GC2ddi0a%2BEKQ4r1Qg7m7Wc3Ozhdy2zjH1r5TFWQTqrZkmuJa0wEtzDO%2BJbOBjqkAV2tBydN7%2BP%2BY1uIsEEw%2BiAP219QO0FtFIOteou9pHiiM4ghoUREkhVOjcIzhP28UuXJHieqKrZNXzf2PVLo6RnBColPM6YJHRNJRR91iEM%2FYkme1RR4uPFyuWdl%2FQAFwU6lKKHkNF9HKuDzj%2B9eNKeBFKHuC2nbycepaDwWw3LEMel9mF%2BeGiZpOv792VM7Bl3j7M5UH%2B6BvIDl4%2Bf7%2F%2B1vIGoT&X-Amz-Signature=746de9aae73d9a77ceba3b8f0e292032f635bd11d6fa75a448caa5c63ea6aab3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEYDFAMA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQDqbDpvrBSQYe31EJGDvnd3rB9n5yfD%2BXfZWPXdzGRFMwIhAKt1nKyLkR4Z%2Fo1Uclu3w0Sm4P2lATPylAwX6mxCpJGOKogECND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw87IHJxAvwlEA7efIq3APjc8Q1NnuZ6TPSFiwIfMzKG4%2BT9DNOL4TjQjI7wQe5eSJjIkFKSKTBzkBnS2mmPEJ9PMTbeMH26oVZyH8jc8nqz%2FjJlFNRxLge4KQ0nglVmvT3YdORtwEQjBQ4K0SHz4dfuTj7YPzrgOdJgPAobsjTghp0olasg4zJH2QN3%2F06QHIGooJOoG15ZAyV9mS6%2FIvClddr4OBDiqVTtGdtkxB2I%2FZV3AVrpDqCcLrnwwuw6smIsyvPcWDoZWb8GGtriLLpy4WV%2BgWDCbUwF5kg3SFS4UUxVeKjYKoIiIrOepsgk4l%2BQMR8WWdGVNK09NidjIP43vibt4O4TP7Zo7ydUGy7q9XMnTvMl%2Frac5zw29fGz%2FrT%2FffY1PpFq1xpLK%2F%2BNflWmAd6o8SBgnhS2VZwPeC%2FQCE2CyIeNAjK9JSBhkQ1vlLQFCCMVYY3u5Spf%2FkXmaTeVv6TViiaN%2B8eKZOoQZX8UvB39yokgBlaqab3xrsb5F99iVXaP66B3fJ0tuXvOIFY3f4DjuW2PXXTPNK3%2BrU%2F0fx2HKfQlpd7g1dQFA4spAIFeeYQtMYmmWeAm9zMKX0iljCT5nH%2FNNo9DSjm%2FOY0bfE13zmrT4joZ8T%2Blwq5cY7kvP8yXhcL%2BTqdjjCN%2BZbOBjqkAWccbfHEhlDC5KAgOOqAnBtGm%2FZ4PkwBNIsmnHBu69DphaqC3l0L1pG4LunaDTcX69Qjx4iSDmv%2FiWY4tqU8EfIOTukG2M1r3lImvq6x5udBdj0eLcp487WzBKc1ghhpgBUL%2FncfymEptk3YFtVVpMNizsgChPL%2Boy4ZzN5qxUjHF36xPmhAUAfh3E3bDI1sssFYhUVUard76Hl5iHeGmLC5Mw93&X-Amz-Signature=2cbc02eaa6b8c9ce22174e5c0a8e8c1d71ffe3c0eb40d2be58f884b19a20864b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C2ZNQGU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIHtuNE6RiFSIls8oCSqCYB5Nza6j7YTayYLmvQsWQvjFAiAtSbFH%2FBxsYy7BcHdh3v0Z9a7n5Z%2BG9lbX3oRHN2vG5CqIBAjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOoqMJMPgOg8gERd0KtwDpQs0GpHDU9AapA7YtMnXMiYXOGrh6%2FkHTBznLc90LxChfbBJkmV19YdbEzcCthlbd8zEfWqboUYJwk4rwDyl1jFGBTUNWrw0y5fhBaQP0YFU94bf1xxgnHMmVlZLmUJim4rZoytcHOSlmFX2S76AwH1WmXPdPtbcmVzCzTG04TjffNHvPq531WcgrQ0KgQavByUbqOryP7qCrEdXT4SOmbvMuxEPLWZByT1yiuiEqOHyjVZzvRWKDH7oePFX8GGnq1o8iF1rJ03%2BC6s9%2B8nWryoB%2FaG1dT8jNRLs8T9xl4tEHh6uu4UDzD8gU8B2xn318lhjTVPhgL5c%2FR%2F2Y78wKPm%2FqGZktMUwfyOuE6hKzDMpw5zDUAw0S3EuxenbvNJzoI66U4SOZdwRXAlM0VCvfHzEef92AuINwyPxeacpfNQOFQFqqncxO1cIVeRVbJ4oshrWFIYMXm7TM2ky24ioBF%2FnF%2B7eXs4JsTGy5Q4C0FT3gwQehiUsBJQ6TiplwwSsaI2UfCn%2BJC0c34yILlXkQI7oyzT8pVHCdZtel0jOwYqpM75lODbNIanPz8%2FdB7yfh8St5tj069oBzgZMpMjQkpxnFp5c0TyM02dfTg7e%2Bm5hWOAainv%2Fq%2FSkziYwjfmWzgY6pgEfNuEWDL5N3K7Z6XhAhlu4Y6ISt8eZNTpGjo6Jzm82EyT%2BgvJ457%2FVAt6pSf2pq3ZeQHGcXg7quJxo34Xe4XZdHpJ3Wvl4Ewcq7tM3b44bIgyzwJkr%2FODLkzRJIuJJMNPKLygUmkdIiEmthZpw7qiB1%2BY7aBzoh01sF3F23Jf7C3M0j%2Fdgoc9Voodj4ODRtjv%2FmMuFCM3X2i%2FFPudL%2BV6egkIBb4E3&X-Amz-Signature=b1ec8fb62d644157ec99e3f728caba5301d16c40bffa366b71fe9de65b329608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C2ZNQGU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIHtuNE6RiFSIls8oCSqCYB5Nza6j7YTayYLmvQsWQvjFAiAtSbFH%2FBxsYy7BcHdh3v0Z9a7n5Z%2BG9lbX3oRHN2vG5CqIBAjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOoqMJMPgOg8gERd0KtwDpQs0GpHDU9AapA7YtMnXMiYXOGrh6%2FkHTBznLc90LxChfbBJkmV19YdbEzcCthlbd8zEfWqboUYJwk4rwDyl1jFGBTUNWrw0y5fhBaQP0YFU94bf1xxgnHMmVlZLmUJim4rZoytcHOSlmFX2S76AwH1WmXPdPtbcmVzCzTG04TjffNHvPq531WcgrQ0KgQavByUbqOryP7qCrEdXT4SOmbvMuxEPLWZByT1yiuiEqOHyjVZzvRWKDH7oePFX8GGnq1o8iF1rJ03%2BC6s9%2B8nWryoB%2FaG1dT8jNRLs8T9xl4tEHh6uu4UDzD8gU8B2xn318lhjTVPhgL5c%2FR%2F2Y78wKPm%2FqGZktMUwfyOuE6hKzDMpw5zDUAw0S3EuxenbvNJzoI66U4SOZdwRXAlM0VCvfHzEef92AuINwyPxeacpfNQOFQFqqncxO1cIVeRVbJ4oshrWFIYMXm7TM2ky24ioBF%2FnF%2B7eXs4JsTGy5Q4C0FT3gwQehiUsBJQ6TiplwwSsaI2UfCn%2BJC0c34yILlXkQI7oyzT8pVHCdZtel0jOwYqpM75lODbNIanPz8%2FdB7yfh8St5tj069oBzgZMpMjQkpxnFp5c0TyM02dfTg7e%2Bm5hWOAainv%2Fq%2FSkziYwjfmWzgY6pgEfNuEWDL5N3K7Z6XhAhlu4Y6ISt8eZNTpGjo6Jzm82EyT%2BgvJ457%2FVAt6pSf2pq3ZeQHGcXg7quJxo34Xe4XZdHpJ3Wvl4Ewcq7tM3b44bIgyzwJkr%2FODLkzRJIuJJMNPKLygUmkdIiEmthZpw7qiB1%2BY7aBzoh01sF3F23Jf7C3M0j%2Fdgoc9Voodj4ODRtjv%2FmMuFCM3X2i%2FFPudL%2BV6egkIBb4E3&X-Amz-Signature=6dd3f466e4c35bd29ebf7facfeb0ec888b83e3390a59064179ecba1e6d712726&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLY6LN7V%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIHiD2A%2Fa%2BVDz%2B0qg%2BZBfNO8VNAVMhE6wtOkyVE%2FFRR0LAiAJZ4BhAW4nNwQwlZ%2F9PS40ZkbArlUlmqvxgXj7P2Y04SqIBAjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRJ3o%2BzVROPIS0qDOKtwDRSGT6pJ6S8YRTaG7906gikZFGgJMkb5EHW1aA%2FZ5uwoUGEa8ckeco8ZqbSgnH3CKUzlEo1O6t8ubXI2bu3vRRkuYHqISKesgBhc8ujLqbig4BYQ%2BwF8Z5gW6YXS9cbfM9A%2FJcCNhzPxSj8feDva8JAEOz5xCMogPgWsfrqXPC29jyOQtV2uZmAnjmhu%2FkwXXJne%2Bt0zZ5%2FiUwJOZksqFd6NB7Ylhm0%2FIqyC4CA7cL3Gd2gcdFW5cfWUZGPltn8Llzq9EEkB69X1z60r%2FeFPc3djD2BDl%2BfSc%2B9bP4gQ1NDFoCPoVSjoou6vx4NRmklu30EWb14%2Boj%2Fnk90op6Wu1sWPAsVx0iAzKY86ebihkFKE7I%2BQlvDmgH8eXSa4ExKPXD%2BE2NcjBNlriFYk0wb37f01fScgsViJ%2F%2BK%2F6MEZtBio2a1esf2kgG4djHbHY4tUVwGWcLHuKPOemU5ObF3Ag5jumFIP6uZEjxy9SWXa4d3yttRzrQDl6bzRjb9G3RB%2BP3G4Tl4jwn0Y%2FyEBkcUUpTTQYFCq6sDhI%2B2TVhpq493sldC%2B6irb9%2FSWVI4WQqaKX8w1ffEHGf2lQhJTFCrbRFaiEvsmJYdmk7SRh5Z2LKMCgUfADNUQouq2%2B8sowpviWzgY6pgHQL4v%2BJoAfVNrTOuLd0an9RqanuDPH6RUoBWv62i26Wp1MHj42AHbIqEmaq375FGUgRR9HnSt1mm86qrqxWh%2BePSBz7zEoS81BfaLf78kARAsFxJeXrhjHW3ZeZPvASeGFkGnil%2BbqKQBgKoM5i5XDfco30tBcc7M%2BsAB3yzz3E7FyALFgnQ5po2%2BhKcSjUJLoOZ%2FFisWan5X4W5QgLu5q%2BZm4AR0S&X-Amz-Signature=dd6b32a39b7edde221b410ae301d0a2a1ae1be15967ef24c452e2686cd18fbb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBV2262I%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIHu20bphVkr%2B3EjVryeYHRaMtS0cyzLJi4pdYy%2BDvS4bAiAqTSMR3E9vHUpWaul9CFutWDalA3ibHXizq5jYTZTSXSqIBAjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQRX8va%2FU5xehY7AcKtwDhlNb9ahK5pOq2V0Px2RlhRrxBZQTf9ywgNSzBL5NNRToMW6ssj9Baoje5Oy4fF1IXciifMmkq8CTsBV6f9QyqehH46RxRgFGV%2Fq5ajfcaX8IaenfyYHelPWlT87Ab0Sy2XHkaFSWRWv09d0aPSOFm3J5udV8UjUEnH%2FDEgkF4w%2FL1shktRMfwJM229jsF3SHuM0vhvYaxtLXPYmYECSlG0hT1uDCa2a9iCu0VL61VQXXIk52VhK6PRrLRMOCRxk%2BiRwvAgpA9AEb8%2FlweCkyPLIzJTl6a4b0VQJlt0wEPZVWFKR992QA1ICBR0OV7i8L1dKKDetgYmP%2FIlNecYu9FT8ocnejRHe8YMzEIiMiglGCHWdk%2Fm7qnc33ISw%2BU1Kf3ucqAZqO5pGEAMCiZPSRCvuvfaJBwyo6OMHPtrsuFcCSWUFkGNziG8NqrhIAqcQ6Ad%2BiLzaWeELAU32zREt54vKSOAovFdBsOep2x5ny2WKAwZQZgssPuBfC7WVc7h4h8HbcrAod1%2BULgwQ3VUaNKdpZDz1yRvwdMPsD9hlfrNYd6Nfk0s%2BFJUK7SPPCKFuZDu5DB15gajH0TT7sDuhABWVQ4KrcBujmdSXDL3KP58CZxPMv3uX5wehe9CwwtviWzgY6pgG4xxFiMf7j4u%2Fy5p2QCdLRKYklnRUSCnzsdukmuXcB7o9Pdlf4Q%2FrJQ8oppUgU1UCMv6ks1W%2Fytl7o1vlt5VVmxoljX2fYT0CcqsAoMCcJos6KjakrUsfCX%2BPVZKOeMq7IXxGaNzrg08mEUgsdn%2BwhfaKjrB4WveG9U8qUZPUVswTACJnRTig8AGzDusXe0TIbY8fVODP78ayLmATEHyaA0QJbQ3aE&X-Amz-Signature=24ff59d863937c151d1d24fde4dd040968692d62f3a09bf7c9f8a064f099485a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6TDEWXS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIG4vewcDMOKflpxlLY2%2FnGzim2sDKMfXifL8rP1CZ%2BFcAiEA%2F4Mcn4bNZ%2FnApqHf6ow4qkengkgJYoCGyoihDoaz1%2FwqiAQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFPiBElCLCSr7hmpTircA8MhwZOw7JgHvUazuFjE2%2B3MPiTswCDaHyEfR0%2B1qI7Xu8CAPdbeh38vf72p1m72KSN2biLvWnpkg%2FPGk75qCSetbSYllH1XOzcftbKP6IEPMVtqaK85CiL4KzIspJ4pEh1et1IIfKrNfTymh6l7%2FmLQXsx4aXEZW56NDBGdXjiQecH%2FMJ%2B3%2BiExqar67jBTkDhI4HrT8QxM2i%2F9exG4FJsmzAOzCf4xwLtv%2F7tgJaTc%2FneckhOtpTY6XqRCslquUSZEvGnJdPnwW74zvXU4spAi9%2BXFwDO%2FbU%2Biuv9Qr4%2B2LDC1Uic%2FUkbynQKFXnnSskRHm2nWy5BvA38FUzstaJmmt5DD3sjDaIlr6sb43nnO%2Bfc1JQNX3iq%2FLujYItA09K5etfM2XRUn%2Fr4KjUO%2FgYWnY7Vgx38sNAInp2wazvlT0RtjEwvgJPC4opGJnjXt03VbGBbF1ksrYw839sRbPug2DCYTSX5c1YdKhXRInrVS2o4Haf8SrNRQHcYGnslSFqasCN4ihfEhB2YsnFQjoPL8wrU3dk3ZmqHjw4Kgge0NoVMrs1gNv%2B93ZAtIDmUUFZRlLgJjbW6MMI9bwcaxnBHVL6Zc1tny4gD2KJoN2RPyDrbf70Z5EG20Ktx9MKH5ls4GOqUBDAycKwGBXK8Hek2OERzgsmTfdLBPrmQZXNwCgoPAgCe0v3KVup6BRs78yAcYoquQOKM6uEb4P8806c1mBcS2chNq4REEC9%2BjK%2FK6WfGmMPBASz9G26mLP4p4yiOWVxwyPoC%2B4iXkhxYGpBLEK2Sm9enM9khVsQkk0xSmlctvtL49MTmClNB65qXL7JvRJ5OyEBQvtDhdc%2FAm66U4YHG4Jwlvugk4&X-Amz-Signature=79f64e8ea7064644df80cb3ce00d64b21b6fb6889db8eedadbcece1c5d7f973b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYTATM5M%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQD3yBxyE4hlP4z3UjB0pNqrMW3wc8FpzvFKJ7Ta2q74LAIgRgqA%2FTl%2F5dtdB64PtWp8DJH%2BaBNDXnjYscEsFtrf4YEqiAQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGYMEZYzzedh3x99cyrcA1ShtdqMpfRDUP2ct8sIEGcGfAzGAc3Gfy%2BMOnuCa2EgG6dDeYwsAgnhuJwIszlkxqMkyLmjoy2WLBP%2FSnBqLqPUL5smltTQKKcBhzwWR6YMxPet92mHWl4YkurTWZQz%2FbwsYX457nuALzR934LR63ZMctVrwjvphsunX3GV5UbWJBIs6eQzffx8fFXJzGGicyvNaJ%2FsgWHOKmDr4yj4LeQaAXbL171mgCtI%2BLTfSaX8LL59%2BrYTbL4BDJNA0ZWSTsv7RkLyhzFMy9j5jbTVSdp4uXOWiPIV3thYY%2B7lh7TOQjvb%2BAZlTMCVbcT0IBBpduTcSIwh4jb%2BoW%2BGUozG3LC1nK3yUnmi4ZD%2BMBKFUr5rA64HY80Eczzn2lEqaHPmDz%2B%2FDUkNONVZCjv8eiTUkcJ9UvOzFzH%2FsGLl2jODeutIju1FkuvbVqtfq%2Bml4GxcDAGMs1ev69pSYG%2BL%2BYiLX%2Fs%2BiKyuCLmXByPenWXCj%2Fyl4kZoxLidZVHVlpLpFa%2FjsgtcEaHzOq0jeMKlMnUBlqBSbIuszqnAtWFQC4auNJ1Dlcz2uuV%2BCDOu%2F%2F%2BSqepEAcRDkCpKT6IK5PuDybkvJF7zVvz501Cg0xcGFemw7A64z2MoH3YVbqzWt4V5MOX4ls4GOqUBJTXr08FDRhPqnNtmZrchu3bUyYk33fXF0MTker4J%2Fe%2BQlSYn0uOeQtJddxWpOuFLBNjOKT2lV%2Fj%2BzArtUM4uWWv1dPXn94tyVYMaPAi1nMmUwDYSF5izAtt%2FhCw2kC%2FNx51ykWDjU75cRyZa323nanL2xX1i66cp1OiMHUw9dh3BfdhZVDb%2BEg7F2kZwCxPdD5VUb7nZTdhkq39ueIfp0OOK14tg&X-Amz-Signature=e1fe90c37b792ebaf8d97ce219b42aa2076292bea9cba19320a84ce6f0b283e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYTATM5M%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQD3yBxyE4hlP4z3UjB0pNqrMW3wc8FpzvFKJ7Ta2q74LAIgRgqA%2FTl%2F5dtdB64PtWp8DJH%2BaBNDXnjYscEsFtrf4YEqiAQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGYMEZYzzedh3x99cyrcA1ShtdqMpfRDUP2ct8sIEGcGfAzGAc3Gfy%2BMOnuCa2EgG6dDeYwsAgnhuJwIszlkxqMkyLmjoy2WLBP%2FSnBqLqPUL5smltTQKKcBhzwWR6YMxPet92mHWl4YkurTWZQz%2FbwsYX457nuALzR934LR63ZMctVrwjvphsunX3GV5UbWJBIs6eQzffx8fFXJzGGicyvNaJ%2FsgWHOKmDr4yj4LeQaAXbL171mgCtI%2BLTfSaX8LL59%2BrYTbL4BDJNA0ZWSTsv7RkLyhzFMy9j5jbTVSdp4uXOWiPIV3thYY%2B7lh7TOQjvb%2BAZlTMCVbcT0IBBpduTcSIwh4jb%2BoW%2BGUozG3LC1nK3yUnmi4ZD%2BMBKFUr5rA64HY80Eczzn2lEqaHPmDz%2B%2FDUkNONVZCjv8eiTUkcJ9UvOzFzH%2FsGLl2jODeutIju1FkuvbVqtfq%2Bml4GxcDAGMs1ev69pSYG%2BL%2BYiLX%2Fs%2BiKyuCLmXByPenWXCj%2Fyl4kZoxLidZVHVlpLpFa%2FjsgtcEaHzOq0jeMKlMnUBlqBSbIuszqnAtWFQC4auNJ1Dlcz2uuV%2BCDOu%2F%2F%2BSqepEAcRDkCpKT6IK5PuDybkvJF7zVvz501Cg0xcGFemw7A64z2MoH3YVbqzWt4V5MOX4ls4GOqUBJTXr08FDRhPqnNtmZrchu3bUyYk33fXF0MTker4J%2Fe%2BQlSYn0uOeQtJddxWpOuFLBNjOKT2lV%2Fj%2BzArtUM4uWWv1dPXn94tyVYMaPAi1nMmUwDYSF5izAtt%2FhCw2kC%2FNx51ykWDjU75cRyZa323nanL2xX1i66cp1OiMHUw9dh3BfdhZVDb%2BEg7F2kZwCxPdD5VUb7nZTdhkq39ueIfp0OOK14tg&X-Amz-Signature=d2809f85d06633d052ffee98a8b45b9174abe8a6d702870b1020cdd06a62373a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IYY5S7W%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCICXkceAD9e2dfeWrvNBgX%2FULPDssuGEYkXQI%2BDD3NOlkAiBH3KGUhpWHQJL4jeLIbvSXJqB5lK6Ze%2FRzV%2FyZjGgyESqIBAjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FDOR4Fi1KifX9MpbKtwDI2S%2BNVWBcPEVN8Vj1Z7QlpcqLCAkynFLaUkXOwRqnpsTdfOIIKYfhlcLd10hGbIhZmWcyer65IBgcgFi5%2BXKRilEy7B%2F8EITUTDz72w%2FsV%2ByfZBJzo8WB2Ot9b0clVDZRND3Agh7k11HRgqFLY%2FoEmO6U3A852KeTJdICXDx2DvoBhR0l84CJnYbreKdQJNd8WhCfe%2Fq0lbICbEnycVwdXujFaGtfHh0iqbA%2BipddxBzzKpiwo6CD9xyQv0YFBNs9Ulmg9lMccFBrmkmCrqXIXClI6jEVx2pmQ8AngfFGbyj9d%2F6tsIltwLf0zljPB7Zu9mrEtaW7k3XtyrimNnxjkCBrNMNifDvZDWSR9QXitUdLIf4QAR8CaT5%2BLx6uwpE7UiAxEJjxsyEmyFoH3gfR5wKS1eNo%2FZw6u5CxpBNztzhXrL%2FDwOpnkRiVWjyjxVZP%2B7xVKO4OK2y%2FB%2FbUaiXl3K%2Bfqg4F64XJAKS%2BvMsOAs%2BL97J1T28mUs0qmU9kOWIKM7gbnzTmQe5YqKC%2BedsNGVb3PcXQKLtSOuutr3S0%2FQ0r8W4dFYF35dWLbkcCYeyca%2BUsRBBohab%2FG9FYWpKlQMpUg%2FPF8Ozb%2BbavgZ5by5JgYS382fnUcsCPtUw3fiWzgY6pgHYIK3NijS2IO1jLRL9vWFTHjw6x%2BPdYhxFMQnSAJD7bG4u8Xdsi3ZegC9GMPDzDIHs7fiNBAuUICUnRvGuKmo2pYryHiQs5%2BcSAuUtmMxKc%2Fpfq3DKGnDegubTot8O4UiqbAnKgT30Qn7xE5kfU0fd4%2FT81%2F3%2BfUb3kVBS4kNbT4IUGxmKUQBvkXNt%2BzR3%2FcMXvyuR1lpuhFhDLebvVIdoZc5N1oqU&X-Amz-Signature=6a3f5168678ae8d421e35d38a2d0b3e80114683d5542d1d974445cbe7648c71f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SF27KUFQ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQDhscfff4Lx8e%2BiIopp7o1Q07T%2FeAbk7uERmGYSjqcoUAIgVb3Hr12Kl363vP6f1XCDy7xaA9yUKXwcmyyaQiuO0t4qiAQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHmTDx7KHOSnDL7lzyrcA3qGG4iZmGBXPsKc1VaBNw8rKtt0BMCk%2B3zRmFxVQ8MZYaKEXXzLenqGUz%2BJWLTpGl3172AIcrZvJPcln5XubpNvdp87SfSAogQ4Z%2FkBGlMxkNjrJyWbdPWaFBwkP%2Fr87qtvKOebznUkH22LlP996aKGtSvqdv2ClgXKw%2BZTI8DOmVhfJcr4tIsYrKdR6EkLksnOJmQEWHRrp05IIFhpDLnq4MXZSPzoXGhDxVAYGQZ4XiKJF8QRRdjSBePXki1jsaZa%2Bv%2FPJmtiPGRnKPEtnlXf4tKYeGLKBCa8w0iOlwe63d3vKFvXXb2t0%2FIc0Gnsu8Os1%2BVaR6suEITlG6kVoeZR9MyyDcV1ty%2BjyMZohBRphB%2BhIRAZLdMTATr%2Fclcmsw6Gyihl%2FN%2BlQMGGoF%2F50idbSWHAJi2QizPAWahpaYOKoiWnOqUUzgzK5%2BeSR%2FAxHyBVdUptWSR1LmVS7p8lQHzXtfg%2B1VXA5u2fSm3tNCMlanNGD5qEbrPJMtaLlcUOF6bJglBhP5jZKox6%2FC%2BUXQkC4Ioa5KlBU7ju%2FvBXk%2B93yXIeKi1aGjVc8eig2JuvzoeqLpEbJFez5%2BUdQ5NtwLH01eRnIatC0sya4nTKb6vsZgPMIXsZxY74bvLvMNf4ls4GOqUBWbGvS1bFlFXOGltbPiH6kPUTA3d7TDlwxl60k%2FRjNeWRuEyOAYM4Vxqbo%2FTJZ9SpZRvLoG1XznoGCKYKI3a1heu6EoRD9HaJSYs7J7ec1mWx%2FLSszXJ7yPCCRSFuIVSFRbMr43vx%2F6puefaIq%2BzM8JcWfBK4K9ipi2aDHqktYEI14gvEJsw%2B%2BN4vkvxapL0gPyZyaCFAoEmQRV3DuN3MSDkEi25H&X-Amz-Signature=5eaaeba6f9a6ed2084da69d9a287ad5a16dad4e92edafc08a83835970e0145bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SF27KUFQ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQDhscfff4Lx8e%2BiIopp7o1Q07T%2FeAbk7uERmGYSjqcoUAIgVb3Hr12Kl363vP6f1XCDy7xaA9yUKXwcmyyaQiuO0t4qiAQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHmTDx7KHOSnDL7lzyrcA3qGG4iZmGBXPsKc1VaBNw8rKtt0BMCk%2B3zRmFxVQ8MZYaKEXXzLenqGUz%2BJWLTpGl3172AIcrZvJPcln5XubpNvdp87SfSAogQ4Z%2FkBGlMxkNjrJyWbdPWaFBwkP%2Fr87qtvKOebznUkH22LlP996aKGtSvqdv2ClgXKw%2BZTI8DOmVhfJcr4tIsYrKdR6EkLksnOJmQEWHRrp05IIFhpDLnq4MXZSPzoXGhDxVAYGQZ4XiKJF8QRRdjSBePXki1jsaZa%2Bv%2FPJmtiPGRnKPEtnlXf4tKYeGLKBCa8w0iOlwe63d3vKFvXXb2t0%2FIc0Gnsu8Os1%2BVaR6suEITlG6kVoeZR9MyyDcV1ty%2BjyMZohBRphB%2BhIRAZLdMTATr%2Fclcmsw6Gyihl%2FN%2BlQMGGoF%2F50idbSWHAJi2QizPAWahpaYOKoiWnOqUUzgzK5%2BeSR%2FAxHyBVdUptWSR1LmVS7p8lQHzXtfg%2B1VXA5u2fSm3tNCMlanNGD5qEbrPJMtaLlcUOF6bJglBhP5jZKox6%2FC%2BUXQkC4Ioa5KlBU7ju%2FvBXk%2B93yXIeKi1aGjVc8eig2JuvzoeqLpEbJFez5%2BUdQ5NtwLH01eRnIatC0sya4nTKb6vsZgPMIXsZxY74bvLvMNf4ls4GOqUBWbGvS1bFlFXOGltbPiH6kPUTA3d7TDlwxl60k%2FRjNeWRuEyOAYM4Vxqbo%2FTJZ9SpZRvLoG1XznoGCKYKI3a1heu6EoRD9HaJSYs7J7ec1mWx%2FLSszXJ7yPCCRSFuIVSFRbMr43vx%2F6puefaIq%2BzM8JcWfBK4K9ipi2aDHqktYEI14gvEJsw%2B%2BN4vkvxapL0gPyZyaCFAoEmQRV3DuN3MSDkEi25H&X-Amz-Signature=5eaaeba6f9a6ed2084da69d9a287ad5a16dad4e92edafc08a83835970e0145bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JFRZILD%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T231734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIHFgr4%2FO3gDuEZegV7ZE4KlmsQc7M1Qeekvl0gPH%2Fgf5AiADDK%2BarHZ%2FSI94%2BdXkvr6wwuYQzmOerMwy%2Bs3bIyxnwCqIBAjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkphz%2FcGGriCqT1hGKtwDRBoREku0RPWE3%2BmT%2BY14BZ8gvMseGph9KtSRq50qCwpwmWBqrh8cQ%2BXZempG4t1snJbspknQ6Ii%2BENo0vo3OehtmLEGQfb2UeCB8caVztZB8oOHuapX49%2BLw7maSNBNTuF1DEjJfQzX9voKycsiNfRfoNtlTH0ip6%2Bu90WvnatQuVU%2FrN5j4GbWYjNtKLvY4T8rbUyAeLX5kPEUcj8PaUgbq%2BE%2FzmLhGgQpbZklY3GCktb8BNzXUwa3QK0pet7cQuGCb6ePu0io7aTW1PvHwUZw%2BzVAGWgW2DtwXiJNKkmIHUNGKyQIsrSTjJ20xSX2hMqaWqG9CYjOjB0qMuVYY822JxhS94wqJs0AhB6TNuTiMSigndZ7wDo7bKTz6yrq09qgHkIhSy6OMnElz%2Bll4sgT%2BcZEzWCAprXerKhYIAJ130VDomIRf9UUjmQVHuCehAbYxUnBTVJvlfQqZzsYsKVs9pfQdzaTimDjvGGrSjPjo2KfARdHSgh3B%2FnizIUVKVAZ7t5HFNCfp8QDEKgzFLDGCSfZ61wPN7owRlUFf9TVXGORRQb2rpAmUNUOe7hjz5EMcbZtx4nL1pokevBOQbmkZOZF4AQiMhUWlyYjVKUGtp%2FKmfiudSsWQizkw5fiWzgY6pgGOKYchnvTvU4Mm0GNb9CxSTjclkKXIF1PAQwDRG6z13YGOntBb6YYLzCaJ3R%2BPYqWaWRFsdQdKEq8IpzIEpS9nnrrpShscRLFZSIghJ6qpqtONMUfwLlU%2BEKjN9umdhbaxGYfaj4x9i1zVLPXb5WGzhFx%2FIp7YR7hjawSQtWiO7VTxqOmiR%2B6EhhgmPGugJMDsaM2XauA%2FYGi9Qi%2F4CjOyFBkNus7J&X-Amz-Signature=a931859df5cf6aa5a785a5176a7067b548327cd15c655733e7f666fa32bd53ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


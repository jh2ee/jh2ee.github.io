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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN6NC3SH%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIHYpV78Gagpqo4SwrjqUpwZwUreC24kw3%2Fl9RkYQstgvAiEAiw5AJosd3mHKRCtQpOFDGOB1KartAvFHPf35EcUvxZ4qiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBbZTfcP41Yfm5R7AircA5HJyhdn4HrhtvNKFQOXEHVmvn2%2FXsVpqvfGVqjoByhI%2Bckq8Rvbnj0%2BvgBZ1y63mp66jqIq4G6CrHPpKWYnKujK1ZsU3XNBYaMJsK3ckLLugLdkoJpoenHmHlb6LAzjL9Tb2vE4V229YJjMDKVXznT4IVwcdCcqSyaS8TbKpFn%2FikI63gwXkBjhnFrVYe1Q79o1xD4pgLA5TmtRjcwoYUXUpbB3juyQossn3ienQ90B%2BjCKEpN1Vzy9h0ZDj4NeSiCchNx%2FgqDGCvM4trIw060DiZM%2FcXQkSqV%2FlsUsqEifMEtVmhOW16NFJ6nguYH66vzJT4EMFtebg6j%2FNCPvnRQaGDhKGhVYgFQcpD%2BVA6hNbBLAoHWii%2BoOhyVoE%2FFCRrlLz8OBMSkN%2BbRHenvLiCe7aAluwz1eeHz3fZQtX21T5Nsa0jEo4kaf5ojLx8ZkyJtEezoQRcqFVcc4BajvA1AUq5SI1SYySFE8HNNK1SSq9TZaHonqryite0FVUqhzqzKj8aDaAGGyKg3Ccu9WGjjB1oACB6iYWEB%2F72rP9J9ErCBiYwqArhGBfONdtRkrMKMSsPFH2Z4Bm5F10dw245rCqvdPvF019gegVcNARA2uF9r3zWMVTg9U9OxPMLTIjMsGOqUBch%2F6K1G5OSR4tc0jxJdKkPMJMUZEFr7JdusmH1koJ%2B7MAnUPk61AH%2BvhnyxxGKQjAxQgMiNq317RmvvogSEPnQU3kZdGxoqR6pw7sujrpXu4aVO6xgDS4JhWyVlIuOz1Pf6GkITtL1GeJZpxKZoLl7P%2FkteXwbHU2Dork3ZiUWAAWV%2BErlBwCjODpIViUvUDrH%2BuKGnEfX4CS5HmSugTbOrw6xSz&X-Amz-Signature=1537d57f034f14937d88fa49fca8bda23c5a9222c901ee3e275658c7e6c5d293&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN6NC3SH%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIHYpV78Gagpqo4SwrjqUpwZwUreC24kw3%2Fl9RkYQstgvAiEAiw5AJosd3mHKRCtQpOFDGOB1KartAvFHPf35EcUvxZ4qiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBbZTfcP41Yfm5R7AircA5HJyhdn4HrhtvNKFQOXEHVmvn2%2FXsVpqvfGVqjoByhI%2Bckq8Rvbnj0%2BvgBZ1y63mp66jqIq4G6CrHPpKWYnKujK1ZsU3XNBYaMJsK3ckLLugLdkoJpoenHmHlb6LAzjL9Tb2vE4V229YJjMDKVXznT4IVwcdCcqSyaS8TbKpFn%2FikI63gwXkBjhnFrVYe1Q79o1xD4pgLA5TmtRjcwoYUXUpbB3juyQossn3ienQ90B%2BjCKEpN1Vzy9h0ZDj4NeSiCchNx%2FgqDGCvM4trIw060DiZM%2FcXQkSqV%2FlsUsqEifMEtVmhOW16NFJ6nguYH66vzJT4EMFtebg6j%2FNCPvnRQaGDhKGhVYgFQcpD%2BVA6hNbBLAoHWii%2BoOhyVoE%2FFCRrlLz8OBMSkN%2BbRHenvLiCe7aAluwz1eeHz3fZQtX21T5Nsa0jEo4kaf5ojLx8ZkyJtEezoQRcqFVcc4BajvA1AUq5SI1SYySFE8HNNK1SSq9TZaHonqryite0FVUqhzqzKj8aDaAGGyKg3Ccu9WGjjB1oACB6iYWEB%2F72rP9J9ErCBiYwqArhGBfONdtRkrMKMSsPFH2Z4Bm5F10dw245rCqvdPvF019gegVcNARA2uF9r3zWMVTg9U9OxPMLTIjMsGOqUBch%2F6K1G5OSR4tc0jxJdKkPMJMUZEFr7JdusmH1koJ%2B7MAnUPk61AH%2BvhnyxxGKQjAxQgMiNq317RmvvogSEPnQU3kZdGxoqR6pw7sujrpXu4aVO6xgDS4JhWyVlIuOz1Pf6GkITtL1GeJZpxKZoLl7P%2FkteXwbHU2Dork3ZiUWAAWV%2BErlBwCjODpIViUvUDrH%2BuKGnEfX4CS5HmSugTbOrw6xSz&X-Amz-Signature=1537d57f034f14937d88fa49fca8bda23c5a9222c901ee3e275658c7e6c5d293&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMYNYUQC%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIDM%2FCT4Jd5fBg0Sl41nwsvCHcw5xHkTYlVNJzKBH%2BneLAiEA93NXL7agKDoDiCGYFOJTv%2BsMMPAWhd6EHurwKVyQt1cqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIANOLNX9KoTA%2FVASircAwQN4%2B1HkiBJ3DhbhziXyYtZdHByXy8eO1YBJfIMLyFW37t9UadBhzHIx0Xnkt1dzMxuXffL%2F%2FX3Uv2PI7cyClyVPDIhSvHrvT5PkHqJ0g2zkeIaVJ2QBUnVmsNItyh6drd3dyLwGaQnkEcNFb%2BWDZslFrxEqZ9kzAN4xRDviNvVZm9DzwV4qrkjr2hIWcu6r%2FSjgn9VcUjSwuLKQju%2BxUer0T5%2BnZ1QX1c2nAQaQ4HLSAbGQK0AfOaQeSDapAU19hwEIzRj5AVtWmCGgEvRSQ0wgUTwKFgt0pkNKP4xut0%2FZo5RC5Id6zZgDLUA51QFQ7cBmp%2FKzIyH%2FrLNiS1KJyXTKGWNNPaQEhvctIlz4D9QPJ5cWPnSQ0kPDFdbjtT3I3sogA3txSn2cJEN8pu4FXHitVpJ%2FWw%2Fc4mJpLeJeorZpKqc%2BDyZ1RIw7Rj3EmGAeodBEY7UHx0MjcXWNa23SC1o4pWBuTWfC5%2BajYunu7ssL1NVnbriuiqZrJ4bG3Z%2F96Uoj4elkio6QLKzbCMYPt0JFM3lIlTHk1ZtemtKvbaswpKHr2RRLS%2BFDd0PRoFCqRbRtOe%2Fd868c8kSt9VW3HZfImLp5Y%2FNhHN3btgN%2FSjOW1psKJ3N%2BOHFt9MTMKHIjMsGOqUBItal7lI2e6j%2BiZGPogCwEEGxRijPJ2bc6%2BXwMUsOXMBZnKv9zRNWQCpetw0h%2FOWO8QvJtO8YBaY3bVpRPIGSdd8E9EnzJ1b2an5H3IiDAP8BAj5HzR0AU61q7KAtSiunmcdXOiBFXb07CB6Z%2FedGakvm5qpdqMs4gUs6WkeViUtJVMy%2B2JFNucNnEZvaPiAiIKUN2BIn36kbkeB%2BanorarwWU51b&X-Amz-Signature=bb62b904e515b96847faa9cf57c12cda32500976b69de6cb48a7ee8f9674e4a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623WB3IHL%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQC8WAXRLAln3pnTkA4QxGw1qSWucHpqavXghwFG3bj80gIhANzWpQUSs%2BmpzR4Q7%2B0HRFP6VrnhQ%2FUZgU8TCF8JsX62KogECM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwQMlxIAmLZyn3EutEq3APJEMhunE56pLj3ANHttLYAdk1ovY3dkVgd3pMVVLIfg5sIkq%2Fu85uVV2tOEmum3GHYA7yvVwfnj02udfKTEd5%2FqBBC41816tw%2BjxnEibUxldqentnWAQPhrZQM570uxyeenXE6eTbWBkWEIVdfbAH%2F0bp2ajP%2FVUdV%2FolwDrwF4s%2FOCS0L%2Fxo3vpK5IUe1Bw7kYsIfbwCTRXXqfVZh7Id5XACHB4sgxshc1VhhfeoMoKScPJosUiHNmMTJFkc38F2SU6NdCijjh%2BJHhwe%2FSgBIvMOMId4OMQauoQB10wkmsWdDauJQGOqrTV%2BXsMOsCaflvSbz%2FkcusoAT45LBkb5pCkP8MfYvlLu2G6BpO5lgCd84sHAXMoyTW55b5L%2B1%2B1uzk8NkIFiUDVeiXevWhPBzuoNUjr%2FeI1ee8i%2BAYRIHI4AHzTl6Ck5s4K8BDbzn4m5zfOP%2FJU6d5mCSqtYQElnMKlUaHaDjYzQKLOx8duApfwUHQDKzsCSUbET52w5tABoYx9zKroq4POKTbCGafkWKRohfcmneb5qpZ1BqqNBoaBxnwMAswH8XoLBtzLFdZ3yt9JhyEDTQJTwnX7BUkTu%2FfSrRUN7Sl7n6HMncJbivH%2BjYwmtg%2FGxpNHHwSDCSyIzLBjqkAUmbBAm%2FN6MxdWhRLdxi%2FGGiPtCQAOSzebwdfB5QuXB4K4607Tu6rdfW1%2FTbpHllr4vd1b6jxi4%2BqwtF%2BYayuRjhaDThxvJKMICwiKxO4rRaqDzBqea%2BrbTXOIqL30sMVKWlkEXicrRCtjnvFzYW1COlnR3%2Fe4Efz8q13LiTXnBs2r5ztoKMcahZVC%2F4vQhZcmZY%2FxS8CosSl9dIj452oGsnE3z8&X-Amz-Signature=068cf16bc40951f6cb05a53374e19f621338c3448c71df71477f01a96ee21083&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623WB3IHL%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQC8WAXRLAln3pnTkA4QxGw1qSWucHpqavXghwFG3bj80gIhANzWpQUSs%2BmpzR4Q7%2B0HRFP6VrnhQ%2FUZgU8TCF8JsX62KogECM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwQMlxIAmLZyn3EutEq3APJEMhunE56pLj3ANHttLYAdk1ovY3dkVgd3pMVVLIfg5sIkq%2Fu85uVV2tOEmum3GHYA7yvVwfnj02udfKTEd5%2FqBBC41816tw%2BjxnEibUxldqentnWAQPhrZQM570uxyeenXE6eTbWBkWEIVdfbAH%2F0bp2ajP%2FVUdV%2FolwDrwF4s%2FOCS0L%2Fxo3vpK5IUe1Bw7kYsIfbwCTRXXqfVZh7Id5XACHB4sgxshc1VhhfeoMoKScPJosUiHNmMTJFkc38F2SU6NdCijjh%2BJHhwe%2FSgBIvMOMId4OMQauoQB10wkmsWdDauJQGOqrTV%2BXsMOsCaflvSbz%2FkcusoAT45LBkb5pCkP8MfYvlLu2G6BpO5lgCd84sHAXMoyTW55b5L%2B1%2B1uzk8NkIFiUDVeiXevWhPBzuoNUjr%2FeI1ee8i%2BAYRIHI4AHzTl6Ck5s4K8BDbzn4m5zfOP%2FJU6d5mCSqtYQElnMKlUaHaDjYzQKLOx8duApfwUHQDKzsCSUbET52w5tABoYx9zKroq4POKTbCGafkWKRohfcmneb5qpZ1BqqNBoaBxnwMAswH8XoLBtzLFdZ3yt9JhyEDTQJTwnX7BUkTu%2FfSrRUN7Sl7n6HMncJbivH%2BjYwmtg%2FGxpNHHwSDCSyIzLBjqkAUmbBAm%2FN6MxdWhRLdxi%2FGGiPtCQAOSzebwdfB5QuXB4K4607Tu6rdfW1%2FTbpHllr4vd1b6jxi4%2BqwtF%2BYayuRjhaDThxvJKMICwiKxO4rRaqDzBqea%2BrbTXOIqL30sMVKWlkEXicrRCtjnvFzYW1COlnR3%2Fe4Efz8q13LiTXnBs2r5ztoKMcahZVC%2F4vQhZcmZY%2FxS8CosSl9dIj452oGsnE3z8&X-Amz-Signature=1f6b6e3c74166a4d17c7e7cdf184dd522282dfe5814da91bac2501fc0e94a031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAZXG5HS%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQD1bGwwH7pFfeKpd4qtazDj%2Bx7o7g4mpjAKGAGN830mEwIgUb%2FhrUFeCFTJtQqXsZ%2F8AHwVr8Tl1WXww%2FAMOAridfsqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIofaALBW60BfxwKcCrcA1nxU5WxzCNBz8BesR%2Fmq7L7DSp71WzJw0hNWg0Bsm%2BjIZ1HLisqzy2JSIPKUYi13w5Kq4W%2Bjh09Jr8P5A3in574nC6TzKkp4kqq1YXb%2B7C%2FnCCMwGa8U1W%2Bb%2FbziUkB5mGvj9dbvdu5SRx4expmjr26Qgktc%2FVk%2Fu8v7BBlHWOt%2BwuD92%2B3gjFTlPHTPsgkAvhZ06gQdKk7ZAFiYwFGPWspQ2I2XYeMMCghRhvazaApaNwo%2FH%2BnbpiWd%2BGA6aAOQKMr%2FBNMMzHAWkaM3cVpXq%2F8vzzA39l2aSqdIB266IGwkT0%2F1SxvWrrreeGVPVxbOoLpWnq3L0OrvZxviHy1mWlPNhJceiI1bFFYP%2BgOF4cGv0WAOwKreCBC6AD%2BPL%2FoOs2anWGsAMfI097bKLo%2B32qtd%2BFlrLckjavrNF58SSMRByeLvqlWbuFiuxByo1twI%2BHEKK6SUX%2BAIr1TkaNzdgRB9Ao0Jr4ye7XvUmDXpfQj0wL4Os7wPBohg0AIDh25IgvuDF2dPi3GEZYfLfQRp63X1Oe9BRvoE0r1gtmfv4taov0kIZcGt0N1W6P2k5klN0iJoG88HyaXIuGGHxyCzqRoNR4%2BuMOgPh9jklAEYkgY5kt4oqY71fTAIwtOMPvIjMsGOqUBI%2BF9mYt%2BbjmEsKt%2FjKbYA3Y2TKfYo5lzMrc%2F1TC3gMZS3yaIYbgji8bCFVWr%2BuVVQg9X3TyKw2lHIJBpXjHjlte74eZaPQCANK2avzAORKRhteIGJFo%2FOiwVT4w7NYOzVuTcXgkDSOU5ZaOzhBRTDicS3y4vDnDKx%2BAdR5jheWuv8HSrxKQKzFfxNzz6UYCyadnvZfOdG4dHTXSW5ycw2BO1rscv&X-Amz-Signature=3467784b13304176a2154224d22332051dc5ded2a953240a2fcb06c1944e7460&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7YLSHIF%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQC3z191QIYij2RhjxqP47XFMMeFevnZyQtmUoXsay8kcAIgY%2Bws0JBXAsDueJyxf67C0NZwMtKd9psn5pj2r5DBixsqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIYCLYg42feyW%2FDVGircAzQkfRDZETkmQsx1Fr5FDRU8aY5scPvnoEEJzDOByZN9NQSpb6F6N3rPb1jb9rvQQKt5pw13oXXYl%2Bm6%2FhZ%2Bk0i0%2FoR%2BQYetqIimDzSM0yjBLBx9FwIlgaQVhl9wJELJ5jFBVfBbDzsEjJkES6lkZEOh16L6zpKyZsdrJnS9xX%2BJFApcKf9ol3HtqW8dt0H1tIvSzAWd8NOyFagFJWmeuNfdVwO%2F8YnkxaxWFI8PRLcIi0YqTxkY8%2BIkOZRjHqQlq8caDtHOkqdAao9iaqou9nv6tpNTQ2s%2Fpd%2BnvAZmgkqVJ7jIIDge4iEcNEmgcONeYoiX9L8HK%2B8wd5oyXEl8xAgIhDXRdOhVLB9UNrBZ0%2BO1Y5pmJZzFEWeJH9Me7vB%2BLBwhEi0PZEo1llIC72Vi38eY13S%2BtISqOmVb2AVCv9ULR%2BZkn6Kn3eayGBF8vM3FLMHTtyKTeEaZFGiCquV%2BySWsTtMk%2FAeJV0h7rP3v6p3q55dhH2iVof33PpPvzggjAXFeyVRXwnMsrC%2FJJL72xP8Mq1mB30NnG4Jtl7iunFRyihCP%2BxgirGIu8ZZZBPaOWtNUROXDjFWNc%2BxgjK6ms%2BKCIY98QFyu9e3jVCqiPkMQGSwnibtrWPpbaC6KMPbIjMsGOqUBPqkFiJapdRRna0Vyewt0NHXIMknmuihKA90uFNcOcIT1ufEa5xbrZHEegQ5r2EsNccovULUpEdSLGBzW6cNd5tYP1ifegYbajJLB0yNE1xX3BuJvWq%2FlMk8s6IbRNjEdIlJSJMizilicWylBebIdcBH2vQjIWlOfURDc4N%2FTKHEW3f0POJPkYwSBLf0pIDz8SN%2FKkYH%2BHG%2B7V3AFJnPlg%2BiEWUSd&X-Amz-Signature=843ed8aa0860325506b13bca684c75980aa4e4e5c4992c9984a8bb265a8d66f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UGNXNTF%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIAjpO2%2Byh%2F9SGv14ltJDUzKejfkoq%2FzpFTrv8Tl6IfxoAiEA%2BPcDVu5z7boaLTVzE5I3McNqYq7k%2FoZC91FUc0gUNhwqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEXk8QbzBV6ChPSfMCrcA2R2q9SukpCPwN7CpLVUx9ARqrIVPDVxAlehfFws0sFfmc8qSatQppHwHfwoCP5lleKn7PACDOgGpsG7XcF77fQK5gweQI3uduk%2FcEabCDe8dvk1Mid3jdIwWhcOI90BsSE4muOqf8PZdCtyROLs7G0WbzlNd85Mx0xx4muo7ckNpZud%2Fgva%2FnYvacLoKkdQKL%2BXNfIAacXBhIaLWMZmr7SUdM5BlkcweCcvCG9vesjWXQdh1m7AXLFsHwEC75zolDfmkHu3ocmv17Rh%2B%2B5bNBUx5ntUp%2FDKE01MYET8H7w7FjnAjwmJss3vFMedG1W0o0xCdAU6vm8k61vVxF6mP0yTChVla%2Fg7gbbOMSktn%2BZtGNoW5ScNrvq0X4zXyg%2Fubxwq1AhfY7QPBOM7KkBFXltPoxMvzLv%2FBhrL0IXA9ATxGTNZ8rbC5GPa%2FIJCctGDCdWOnhqiR%2FxJ73s8Yl7AGEXnbDE6bfGJk7sJQoV4ChYq%2FZalNX9RTSdFg%2FSMeXrYenGdrYahNjzGAzE%2Fihz70lVMliDYKEfcChwR3PpKD1Cfzwa%2FRrxlE3t5BbucCmbCh%2FKKOjsF1nQfaTdjs9OiT%2FPqyRr5JQHajaYwT7wTYFztzA9HRPw57ypxDMHAMNbOjMsGOqUB%2FZzQ6eD1mzCvD4zy649D6pTKJAq6GTDOobuqtDBymBj%2FVC79pXJOui68RX37rNbvzVgUy%2B7xG%2BD5ldhVit%2FLAYRD0FT58P56cJojwB1P9uFs1noBoXP8J2bf8vhDIiszvVTp8ryiymM7y0uciFTbHx4Ow9qgB97x9ocHsSCCU6oyr8a6S7xA3GlR8Kv7SYck%2B951VNkY%2F39a4BQhndclDg5wwFni&X-Amz-Signature=6dcd41727bc653686fcdbe841e90832cecb3302223e555bab7b77632ffde48ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKKLDYQC%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIQCPCWB5yMBwWEH5uaPRLtBfWnRl1vZliKz%2BLXfv%2B65ObwIgd2r%2FhVOTlfPZ0bvkaqqNrQ6K47fWP5pRffdtU6k2Ua8qiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlStkhZ6Dl6dtnjfCrcAxdSDzsjC5Gw4NbUL4DRrBT1kte7x5sh%2BaUCbc9I97BeTKBljZwY7f8bAkGrT2hNjB6%2FlmLDjF5pClL%2BgQv1DNB4Mk85caJbxiErvlxnHBWWEkeXJFCl3x1TPwEzu%2Ft00v6VbFcylxZYoTl6wRSuCWdkmbEAbRBb%2BLqeH%2BEcuNVcJH1yMp4ILox1BgrJr%2BWlB8DBRV%2BDUF0G1YZ%2BcLtOAYbc6y6HKB743a%2FZP1jnRtbNAcRUDMlsq79byZiwX%2FTsv1P23NVO%2Fek5CF7lrLhUHKMEbqA5m2O2TN8561egcfyeymdXTPYM%2B0RlptjiwVQ3B8EZru10SBBdHS0MVdECJWp3R6JTgXG%2BU5pq6V4G5H5LZ3qL%2BLfuiT%2BI2wpqJP8mKOEcksQSEVefnYbSZBpuaTxFTaq%2FO6kVRvOrItCevaLDMqOYfKGrFr4N%2Fa5wlDuOlnwKdRTNXEJjjaZYsU%2B9Q4C2Cyz%2BeBoJY818puREuLbWq5rXervM%2FNClFMQQBmeQ21WFn7ArMN86QPRXcfNmnASnLHo%2Fg1TOrBBnR9WxuatPH8GA%2FT0JsQD4uksUT3vsL2U2Sh6%2BliyGm6YAoa8F781JXh3vBSSqDnpMCOEnJgcTJ3AWShnWThduSxbxMNPIjMsGOqUBrSgYzAIscnW9o7FXIduh3qj%2BFXvnKsNVX1Szj78AGGMYVNyrO3ltEd6BDwEXZmaAe8ibwz4fZ3kVb0r1xklR0BYM7f6fVSy3ic9Fivz5jSr%2FFgr07U3WhxD%2FNYB%2FdPm69RdfJrRFaHEiKDiKStV5mYJvzq2POI4AmRQY%2FzYPVwJMLrrSgqloJCacqpgh1oEoQBe4PhDtV0PYPIih9XUhcqu8zAVs&X-Amz-Signature=67ddc1e3e6a64ced99b75d9a0709a36aef5cb8938838a24c8b392e21665a6c1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKKLDYQC%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIQCPCWB5yMBwWEH5uaPRLtBfWnRl1vZliKz%2BLXfv%2B65ObwIgd2r%2FhVOTlfPZ0bvkaqqNrQ6K47fWP5pRffdtU6k2Ua8qiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlStkhZ6Dl6dtnjfCrcAxdSDzsjC5Gw4NbUL4DRrBT1kte7x5sh%2BaUCbc9I97BeTKBljZwY7f8bAkGrT2hNjB6%2FlmLDjF5pClL%2BgQv1DNB4Mk85caJbxiErvlxnHBWWEkeXJFCl3x1TPwEzu%2Ft00v6VbFcylxZYoTl6wRSuCWdkmbEAbRBb%2BLqeH%2BEcuNVcJH1yMp4ILox1BgrJr%2BWlB8DBRV%2BDUF0G1YZ%2BcLtOAYbc6y6HKB743a%2FZP1jnRtbNAcRUDMlsq79byZiwX%2FTsv1P23NVO%2Fek5CF7lrLhUHKMEbqA5m2O2TN8561egcfyeymdXTPYM%2B0RlptjiwVQ3B8EZru10SBBdHS0MVdECJWp3R6JTgXG%2BU5pq6V4G5H5LZ3qL%2BLfuiT%2BI2wpqJP8mKOEcksQSEVefnYbSZBpuaTxFTaq%2FO6kVRvOrItCevaLDMqOYfKGrFr4N%2Fa5wlDuOlnwKdRTNXEJjjaZYsU%2B9Q4C2Cyz%2BeBoJY818puREuLbWq5rXervM%2FNClFMQQBmeQ21WFn7ArMN86QPRXcfNmnASnLHo%2Fg1TOrBBnR9WxuatPH8GA%2FT0JsQD4uksUT3vsL2U2Sh6%2BliyGm6YAoa8F781JXh3vBSSqDnpMCOEnJgcTJ3AWShnWThduSxbxMNPIjMsGOqUBrSgYzAIscnW9o7FXIduh3qj%2BFXvnKsNVX1Szj78AGGMYVNyrO3ltEd6BDwEXZmaAe8ibwz4fZ3kVb0r1xklR0BYM7f6fVSy3ic9Fivz5jSr%2FFgr07U3WhxD%2FNYB%2FdPm69RdfJrRFaHEiKDiKStV5mYJvzq2POI4AmRQY%2FzYPVwJMLrrSgqloJCacqpgh1oEoQBe4PhDtV0PYPIih9XUhcqu8zAVs&X-Amz-Signature=48cb580c0d2ea70d450f2b93c6ee1aef6c859e8a78add189ee69060d378e4667&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOAFXEUE%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQCSD7rf%2Fta%2FLYpXthDFRSdTkqJh7r9Z%2BayfkZ9yTh%2BvSgIhAPAWttquMvqErqYjqegWX4SesU%2BrwHJvZQWRXPDI%2BJoIKogECM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzTvQzhh%2BpfeVhq88Mq3AOCA15bQLpb2aWpbMBpJUhe%2FZK47vhl6qHc9wQRj808ZQFUltFXn6KiDb3F6qDCjHF0SQ6nVQZ%2FE9OogcrBW0sAiVixYAf%2FPuefnt4bUwU57e%2BPA7oqIm8M8yQ07bxf7VpOMGPwyLMtzVoHvCB3VEWhBcb4c058bZavxt4m%2FSzwabvWjskckxiqJO1p0FOjuGrpC0BB%2Fbc7iNkzDbqMgAMln1pvSnvrK%2FDy%2FtbQfC5S9ICTEmgDsRfM0arfuhDVFH%2FsPjjhZywNsybPGf9K7JvuhQT4lIYlz4e9KcuwXFoIEyncPzzKNkmJXQkPGInG%2BoGjbdg90sJmxyACGpMiImNdGj0fOKvv%2BhIfnmp1cypwReq7yc58DBEv1qp8n8Kt9YpnkiqRvz6Wk5Mcfq88lhGWs7kV%2BfB8Z06r8%2BiLOTNKHqIdaOvvn0tZC1ZGFwWailh5cHHlCf2cMW68CLdVb3RDdl4vXIWozhV17SALjoLbSdciQZ1L%2FbFwfomK4TmYb%2Fm84lwTN7M1a3AEBBb%2FVF5bDxlTPXSlGluLt2Ro%2BWDEHRTaFvzYTjYYG4meS%2F38gOuQcOlrVYz7l1hrMGiG61cNVYG8pjRz3rvjKHTM6u6brKh7hdVUbztNtQj8sjD2yIzLBjqkAS6ISYbS6CV8SLya0v0JR0ip0eBiV9KFc5XloAL5vuFdO0Xiejm%2F0JerAIklHp2%2BcLSCV6guWrxq4cBEalfwEdUCsEDplu6GczumCfGv%2BB8osHFcq92ucOFqujB3IDa2eSRhwq7A1lXbULelQzVFaQFZvYJliYp81JNscu15a3KIfKO2dQ5qMdwB4x5shZzdRmc3Hifs1mCyrBrJLKYd9QjMWs5C&X-Amz-Signature=1692aecf45e8963fca995c0331507a55d5f0b0dc1522881e2b2fb733bde95684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMTNYOGO%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQDHkQWgo%2BcnAFfoEMbUigIE%2FhH4JnPuCZDx%2F%2BpHkaaBgwIgHnXpTHObBMwlynWCJEgLPRrUC9B0x7UA2chM3UXlQfkqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM2pSmvU8mVnFktJCCrcA%2BoTQnByj86PJOKily32xzxg6U5FgH5Fuy1nE7mUJXYkkiqIOqu2Cj3aj9A0tVX1MGx%2FLqBMVBWlI3GrP8kP%2BRJWh27gHoULOGaK8s9WXo1Rc1vM47g8vepezG4v6P0SwvA0QiU5J%2BUGQyN4RfkQDIt4zfjcuEKJIVaF9M9WV06Nke4KUd1E2mcn4KP8r6X5mhNLeFYrBzW1kSs6rt84L%2Bv1h%2BjqyASXIbjSRYnYXVEKB9aaW%2BjDSU5meEyfkY0QhkVmn3yPWb625KDLFKrlpMl7bxei%2FB6Qucx9V6asJum%2BrthYoYw0Y%2FOCX3AF8PBdp5XArabD1o7ZDSLU2lwuTosygaycDpbrOto3m9%2BtimXcAxI6Hamgq5Asmjct1Q0s%2BfH4%2FfoeSAvSoMAQ0wfKs4Hy8Wfdk3b%2FwxP%2BngHpdhjEIAsATsuy7VPhGkZsXqWV%2FkZ84eB8NjPupTn29K7tM%2F%2BzOTeZPYuzsAz8BBfzPvT3p%2BfXXw2VZjiWLmBpk9ICDmE4hGG49wEzXPV3xbCe6PpaYIaCbogpypf%2B2KEHcDSSNlxD2xAqkpVhsczN5OLSWKETwVcm4FliTxaajMItOtQmkKsYhbvDup5xv%2FpZQ3JbvjsWMDTxMpQ%2FWcWyMLvJjMsGOqUBLEChrgCYytBXSvkDk1CYKKgSU5z6c53Qtd9sixENxoyNrJMsfXhCH4IHP7qetIm1WWB5ivd6QerWTGblNZ2qDhPHdKtsUljnbzPhtZ2gtDEX3vzJ0Aqwa0liIKtPa%2BUvlv%2Bc7yEmIhB8Oh7W%2Bxy95sSRstHVsJlO7yxaF1U5bAFxd%2BORMuaXAF3lVlRuRYD%2ByxntRWMkIro3yD67FAPVQgUABaKn&X-Amz-Signature=220cf132aef47d87ffcbf20ef6ebb6a4b8e4fd4a9e1ca51be7eb14b217f84cc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMTNYOGO%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQDHkQWgo%2BcnAFfoEMbUigIE%2FhH4JnPuCZDx%2F%2BpHkaaBgwIgHnXpTHObBMwlynWCJEgLPRrUC9B0x7UA2chM3UXlQfkqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM2pSmvU8mVnFktJCCrcA%2BoTQnByj86PJOKily32xzxg6U5FgH5Fuy1nE7mUJXYkkiqIOqu2Cj3aj9A0tVX1MGx%2FLqBMVBWlI3GrP8kP%2BRJWh27gHoULOGaK8s9WXo1Rc1vM47g8vepezG4v6P0SwvA0QiU5J%2BUGQyN4RfkQDIt4zfjcuEKJIVaF9M9WV06Nke4KUd1E2mcn4KP8r6X5mhNLeFYrBzW1kSs6rt84L%2Bv1h%2BjqyASXIbjSRYnYXVEKB9aaW%2BjDSU5meEyfkY0QhkVmn3yPWb625KDLFKrlpMl7bxei%2FB6Qucx9V6asJum%2BrthYoYw0Y%2FOCX3AF8PBdp5XArabD1o7ZDSLU2lwuTosygaycDpbrOto3m9%2BtimXcAxI6Hamgq5Asmjct1Q0s%2BfH4%2FfoeSAvSoMAQ0wfKs4Hy8Wfdk3b%2FwxP%2BngHpdhjEIAsATsuy7VPhGkZsXqWV%2FkZ84eB8NjPupTn29K7tM%2F%2BzOTeZPYuzsAz8BBfzPvT3p%2BfXXw2VZjiWLmBpk9ICDmE4hGG49wEzXPV3xbCe6PpaYIaCbogpypf%2B2KEHcDSSNlxD2xAqkpVhsczN5OLSWKETwVcm4FliTxaajMItOtQmkKsYhbvDup5xv%2FpZQ3JbvjsWMDTxMpQ%2FWcWyMLvJjMsGOqUBLEChrgCYytBXSvkDk1CYKKgSU5z6c53Qtd9sixENxoyNrJMsfXhCH4IHP7qetIm1WWB5ivd6QerWTGblNZ2qDhPHdKtsUljnbzPhtZ2gtDEX3vzJ0Aqwa0liIKtPa%2BUvlv%2Bc7yEmIhB8Oh7W%2Bxy95sSRstHVsJlO7yxaF1U5bAFxd%2BORMuaXAF3lVlRuRYD%2ByxntRWMkIro3yD67FAPVQgUABaKn&X-Amz-Signature=220cf132aef47d87ffcbf20ef6ebb6a4b8e4fd4a9e1ca51be7eb14b217f84cc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652UFC62G%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T051618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIDujzIJCWp3S3vOXVFDCNXFIbDgm778zAWaZ0AQ8N%2BQUAiEA%2F8CPXrD4OwW77%2Frvwog5Jf6dERxuJURLPgYyr53joQMqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE0oOMnT66SNdMjLayrcA8NNW0wNEq5U5EXux1UHqJD35AvlG%2F%2B2OmyooRpbjG%2Fd2mjwIiKOpBn65U5OwvGE38d2N5BWRz1ZTXGtrgX6kpjOcDGWKU5iTj5w3oOkJcB4Gpb8RPFi3YGgzaC57LXiE4IMYs4tPFZPI55HGhLHHxd%2B23PNp1T7WYfrJSegp3tV7o9JVk6UIIU2TzVtNCvK%2F5iGo2ihl1NS05x6mfIBZ2nepct11elMxTLm7q6%2FgoUh5lVloP4tyMx63yyGEKJxXemTGNupJU9sSVMpgiAiM2FNwiRUC4AYiVWtARBULibGLv6PhN8i%2BSub5087M6GkGSrRStppfLbZu%2BhIY505imlxN5TVIWbuW0OUJNSCf1TeLFTxg0jNeRxl%2FivzCkZGz9GR4ORUKjUM85PJ0FHsRJU1DYdn9bgE6Ij3lnesZfbr5yqAgKSffTJFJR6Ro8pYYs8gNIOqMIfkOtv%2BwuBn%2F0lUJDdkyXv5JQ7UHx47HTyJxikUcsSkDl8pJAW35g%2B82OGTwZCxlLYTZEZB7So1AXLuBn%2FjcG3VIVX4ePKM7Vq5VSxGJC1Zx%2FiZKrQ4InD6bHnfgOQeCShGR9JFoFLXxzLI6Ps1vpzhlEvam2gLR%2FS72UqppSf0rofC6rUHMK%2FIjMsGOqUBdYwu%2FSxw7C2haOMvUcBxoDs6493L88jBYX7OGQv6OiTDGji1gyHc2GOTPpw4wGr6b9PdAZqkhg6It2K0QzsT4TQbckQHB5ph3SU1cAtqmZ4%2BSGalej6zAlwkG460Jwpr%2BvwmKhzzSVDdQz4DB%2BXb0XGZtmZYuRx0ZxwOlA%2FINsSY5ke9jOcWqon0PBHoZgmUZbtGoKMlihqLfgH%2B8r%2BKaqFER79p&X-Amz-Signature=9b986236e5b2f8e6370f00cfbf35bcce3b2eda7ec6f9eb08c25421be56671ab1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


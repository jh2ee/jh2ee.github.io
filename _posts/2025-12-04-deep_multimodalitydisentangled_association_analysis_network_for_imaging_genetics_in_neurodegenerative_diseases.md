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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IJ2NPQU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIC2fJxMoAHRWf4hPZdNI%2FTERf9XOH%2FcU7pZRpjF9ZBdqAiEAkOpDbNMlOLS3HzpJs9yxFdlUwoSxaIMtguKQEH2qMfAqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLqKUKyquRWbVw1dIircA9YQdeeVBgN6Gz1mwUBYKxBG0MTO9yQvGnSuBWzn3HugNhmbQdqCB3P049P%2BpigBoGG0xq2cOvmqgxjxqmiA9DHx%2FBReZiR%2BLQZnaaI2hLikQSdgQMQTcR246UhfNafGNcdgmAJOMnHzFn%2FjoFIAoZITQjJltXQH4ysppk21nyqv%2BhYt3gmbZufKgki7Hh8DM71co%2BQt%2FMdx3Zxde7%2BtaTMInOH5iCg2SgzPVRcUQhLXnnNdFIeOiY8JvdAE7Xo%2BvNVeq6e7hMaYJHTA0RJvtkKSp%2FbQEqvHE0GYvkp7ag6xhW6rs960dLzW12TcsZGddFb7aSR9rQQZYT6fjRZ9NoIDa6WjirtW4a451BQfzxKBOIs1mrC9SukWbinf343yRcnd9lIokIsoo9IcW6bEjd%2BqLx9ZhFyLQJ0zEvE7Eq%2Fhyw9fRTQfxBezNPXfpqw6kMsPtVxTSP3ht%2Bue27f4k9SvUFk1gue0sbDvihXi3umPUtmcaar0T8C0S2V%2FOUH3p9uyfe1m1A%2B5FHlc%2Fyw33JabDLC9VklUqPOJit7oP5X%2F%2BqfgT2DH92mC2bLCNcZxVquGQhexcAQ1kuiMeb4Q5VzYNlkt6QtfHBZW298UE1oOEtXNkEoZP8FWB52%2BMPnFiM8GOqUB%2Fi2nIFrLNUoN9SXjX1pT20E1JkAnIBfb2%2FDMlf4DwFQzdQmH%2FpiSgTeasA6dC5mA%2BnSqagw66h3NH1keAfDfCJKlT6%2Fhc5j%2BsJXmKQ9eHJeLAUFEM6CmlsZAHySXK3%2Fs4Niu161vP6Np%2FGr%2FibLDBz52rTZtscTL2cXjfJznuIh3acIcBa7uiLxFgoc0bqrLRQZcjpKUEHgyAmVN0U%2BrgJiRJKWK&X-Amz-Signature=191b338e345892f189a6dd28a9ca5cf13bfc418c2d2c2f2eab7cb519d0806461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IJ2NPQU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIC2fJxMoAHRWf4hPZdNI%2FTERf9XOH%2FcU7pZRpjF9ZBdqAiEAkOpDbNMlOLS3HzpJs9yxFdlUwoSxaIMtguKQEH2qMfAqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLqKUKyquRWbVw1dIircA9YQdeeVBgN6Gz1mwUBYKxBG0MTO9yQvGnSuBWzn3HugNhmbQdqCB3P049P%2BpigBoGG0xq2cOvmqgxjxqmiA9DHx%2FBReZiR%2BLQZnaaI2hLikQSdgQMQTcR246UhfNafGNcdgmAJOMnHzFn%2FjoFIAoZITQjJltXQH4ysppk21nyqv%2BhYt3gmbZufKgki7Hh8DM71co%2BQt%2FMdx3Zxde7%2BtaTMInOH5iCg2SgzPVRcUQhLXnnNdFIeOiY8JvdAE7Xo%2BvNVeq6e7hMaYJHTA0RJvtkKSp%2FbQEqvHE0GYvkp7ag6xhW6rs960dLzW12TcsZGddFb7aSR9rQQZYT6fjRZ9NoIDa6WjirtW4a451BQfzxKBOIs1mrC9SukWbinf343yRcnd9lIokIsoo9IcW6bEjd%2BqLx9ZhFyLQJ0zEvE7Eq%2Fhyw9fRTQfxBezNPXfpqw6kMsPtVxTSP3ht%2Bue27f4k9SvUFk1gue0sbDvihXi3umPUtmcaar0T8C0S2V%2FOUH3p9uyfe1m1A%2B5FHlc%2Fyw33JabDLC9VklUqPOJit7oP5X%2F%2BqfgT2DH92mC2bLCNcZxVquGQhexcAQ1kuiMeb4Q5VzYNlkt6QtfHBZW298UE1oOEtXNkEoZP8FWB52%2BMPnFiM8GOqUB%2Fi2nIFrLNUoN9SXjX1pT20E1JkAnIBfb2%2FDMlf4DwFQzdQmH%2FpiSgTeasA6dC5mA%2BnSqagw66h3NH1keAfDfCJKlT6%2Fhc5j%2BsJXmKQ9eHJeLAUFEM6CmlsZAHySXK3%2Fs4Niu161vP6Np%2FGr%2FibLDBz52rTZtscTL2cXjfJznuIh3acIcBa7uiLxFgoc0bqrLRQZcjpKUEHgyAmVN0U%2BrgJiRJKWK&X-Amz-Signature=191b338e345892f189a6dd28a9ca5cf13bfc418c2d2c2f2eab7cb519d0806461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J7YEO2F%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIGKt5gJG%2FqVx7S9HIKt0sdZ7JUES%2Fo%2Fj6odzO4RAiZKiAiAiE9Pk5dJYcmm5xRXTLhwLcFLBqnJTw1Q6f%2BoLEyHvlSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu36w%2BPVn%2BfHVl9t6KtwD7kMwxyaTXdIv0xgaeT9mqN1vXqogunU2a2rtJQL18vBuChUjK1IhaAGaZO8E261eCtd0k0Jh6qb424rsq9ONMR38QnXpMmDZ7MbFZxt3wy1F6SsPw60AUq0WJMQ52dCSauMjpeot9nkHzpjXdPj9pwi7mg8EDpmtV%2Bftqxw2y42MOb5ZKw9JV8QXOV5yLkSrQ9dFoI2vZp6%2F1cqLsu9TaW%2Bj%2F3K4J1HCY5EI7J%2Fu8IV9z7jUH6hjnaKGfj3jLA7uyJPDIgRC2cWF%2BmGYiLrttJH60uH82Z8ANlqOl%2Bf2gAxk6lRsCkt36RDJYBVnb9rFYWsuQiVHQsn%2F9bsQI4uDum8eQXTm%2BIvgFi05ccoagpa3f87kvt4%2BEtUKGlhLyg%2FYXtoksb7VZ2QzygCee1NqSNseDdLDF9lN0RngO1IGCwFZVh5zejfdGrm2u%2FLpiJ%2B9%2BKp20awR2EHN2cfLVdRhjWO%2BQ8X%2FhsYngFzLsvc4DdDRcuakfMarLDyPwQkEItl%2B8ZYdQthUp5t1bYOIATPMuuFkKxp8XAp7rVbD%2B5a1ZJaY%2F05Z4jqxz3dkq44G8whkCEk0YrL3lza%2FhAi9ma5VX5xHsGiyUvl5Ui6HDQBR6Cal2h3VERfA17FI9gMw2MSIzwY6pgHW%2FZugnZgGDhLXodu726%2FO84%2B6G0xhGE6z7omL3W57JE5vGYsCDvCnM7Qb7rWKQIGgpAh1uEY%2BT7vG1flX6ho9%2FgA0GBUlI%2BQf1p9bweiytX47iuySROvzu0n6tFyeDSP6Y0rAbeMhIVHCLTT84mT0bK6aSOkVU8zWr2RIXWSbIHCaOHPuyyyq9JZdmDa%2BwiheG4BRu2ADYpfWK3YL9XF8Ncri8E0p&X-Amz-Signature=f1f1d0a91c2b4611c412e9ac06d94304a766f7b2d771a89432b5679759734bad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3IXMF46%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIFnf75kHyWNdqF%2FBiW%2BMJoia75QVRczzSYiyqp2sjojrAiAgwMyTBWQ33U5dG8%2BRsjmluMftI%2BjrOPgD0u6Ur4YOlSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3x0Z9k3Hz1%2BScS1vKtwDuhSbH0pd0ItvzPesDP8iJQ%2B4K97F2APntbwcT%2FPokBASkcCdX1234b6nVw5qDWWcB3pryup0VhmEMA9%2BIMUDnZ%2BqoGQDuaoNUW6UFHJIosSWaQaVvhn7XF9o%2B2AvybMeIR7uSB6seTYvx7YlKSnqig7005g80ajcX6ZAobx9e7QBSeIduxm0T47E2ZlhoYU%2BPWVzbR5MDCMdrRV4tkLlkJmkO6nqIZST6MHpaOjEjR2sNEQdxtU47ZKZHyfP0FH8S1mCW67L9GVWQAOto%2BElHwbIqr3G%2Bj6VS0BMpDC0GwrGyuW0rN2P1v42yNDxeMTg%2B5aiWYTr%2FI%2BvZ7Dk6eM714yug2Bi5hXrJ%2Fw2DKfVLFRh%2B1borab5%2B355qBin4Z%2BcvjAu1TldTiG39%2BuLFbFNSFmeHcNMNnS3kgMtbtkeEW3c3Qqb3nDVdIQfvzwxPqKYFwY5fC2IqhSR0F676sV4EPUt2KMsnurTjcdeZKZhRGxwDRLvso5bbxhihAZav8eKBAk5soK3ICY%2BSkoZmgPHjSdTgLPnalnUtegO3ALOKj929vOlMUntkAbke%2BTj7%2FVBbEaajWk8lCA9M%2F9NRXTHqYerIbmRfd%2FACSpiGZnsY2mlEK58Rj5Ziqo2l1Ew%2FsSIzwY6pgGipRjcL7d%2BbAEZpY0rXgt6T%2BqYdc7UN67U4Axu95Cp5VJ4rO11jqAp4XUhr4KPyM5dBGoXh426p%2F37yFGycHq76RNqH4i2USpHhf%2Bgyrsn1oZLKJZuigJj3%2BdO61qIKr9s9Q1Z47xxn2BvBxCx%2FkuOlYt9w1VQ%2B757hKdi3oBdCy2bhW4ieQqaQFvXZYqNDKAToVUQx5C8DXgnK0pFdxxGp4rOXmdJ&X-Amz-Signature=217b49ff7dd6f7ee908b86709d7e54eb5d5ee929092637413f285397e722a26e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3IXMF46%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIFnf75kHyWNdqF%2FBiW%2BMJoia75QVRczzSYiyqp2sjojrAiAgwMyTBWQ33U5dG8%2BRsjmluMftI%2BjrOPgD0u6Ur4YOlSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3x0Z9k3Hz1%2BScS1vKtwDuhSbH0pd0ItvzPesDP8iJQ%2B4K97F2APntbwcT%2FPokBASkcCdX1234b6nVw5qDWWcB3pryup0VhmEMA9%2BIMUDnZ%2BqoGQDuaoNUW6UFHJIosSWaQaVvhn7XF9o%2B2AvybMeIR7uSB6seTYvx7YlKSnqig7005g80ajcX6ZAobx9e7QBSeIduxm0T47E2ZlhoYU%2BPWVzbR5MDCMdrRV4tkLlkJmkO6nqIZST6MHpaOjEjR2sNEQdxtU47ZKZHyfP0FH8S1mCW67L9GVWQAOto%2BElHwbIqr3G%2Bj6VS0BMpDC0GwrGyuW0rN2P1v42yNDxeMTg%2B5aiWYTr%2FI%2BvZ7Dk6eM714yug2Bi5hXrJ%2Fw2DKfVLFRh%2B1borab5%2B355qBin4Z%2BcvjAu1TldTiG39%2BuLFbFNSFmeHcNMNnS3kgMtbtkeEW3c3Qqb3nDVdIQfvzwxPqKYFwY5fC2IqhSR0F676sV4EPUt2KMsnurTjcdeZKZhRGxwDRLvso5bbxhihAZav8eKBAk5soK3ICY%2BSkoZmgPHjSdTgLPnalnUtegO3ALOKj929vOlMUntkAbke%2BTj7%2FVBbEaajWk8lCA9M%2F9NRXTHqYerIbmRfd%2FACSpiGZnsY2mlEK58Rj5Ziqo2l1Ew%2FsSIzwY6pgGipRjcL7d%2BbAEZpY0rXgt6T%2BqYdc7UN67U4Axu95Cp5VJ4rO11jqAp4XUhr4KPyM5dBGoXh426p%2F37yFGycHq76RNqH4i2USpHhf%2Bgyrsn1oZLKJZuigJj3%2BdO61qIKr9s9Q1Z47xxn2BvBxCx%2FkuOlYt9w1VQ%2B757hKdi3oBdCy2bhW4ieQqaQFvXZYqNDKAToVUQx5C8DXgnK0pFdxxGp4rOXmdJ&X-Amz-Signature=efb9d7a584a7e7f89c475852563a1dab96cec4c854420c55e2be15f09d3f54d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7MXXMUB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIG%2Behxr6zLHjYcMg6Izzy%2FvSVdQ%2FdValLO7Hvg3dKFqqAiEA%2Bl%2FVGVkdZFUUcXJqQ8e1CIN92l6ANCwu362zkFq5THEqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBHK9k6g%2BPFMJ8wfuSrcA4MjL4gRRkOuj58pTsuANM%2BZh0PuGny2OvRyk9GcSNtAICuZhgqPHIaUJNrTLczOvLUqe%2BbA609C5a9GxJ7UsDFypaNeHjq701E%2BT1ELVa7Mv7p3tnIJS9Ea8Sr%2FScQZghr3QAJ6GVpe0lre9KIemEB0SouLM5zZmp0fKlNKDzesdWjLKEYjj7CJ4xhkEHm%2FkBe%2BZ3rIrMz38RBsB8WE9Ds2qpmEn8KNu6zHU%2Bi4jcpSXyvMqvCyXqJuBPHG6RiHu6z0EU3f%2F2d7NqmZJJFRbUgNcR5WCgfjVpLgktbdwKlxnuZUz%2Fxm3fH8pBldS1MUXCESxR%2FsDbJYiH9ag4NRgLCCdrn0lHrbh4tkK%2BWsVYgxj%2FTVf6RecWLidTXfe0xTjL8ACAC9k%2Bb7eXTIU5Jad3Jf9IvphS%2FvxxrCEf%2BYug3Nc6WuA8Qlc%2FBuV7MNHJd3H5YLn0bv6wkLBswlxKhC1QMKlr3V%2Fww8%2B93OhQlZmwBWhjRTjiEdMzKO9vS5yCf3k7t%2B4FPAXdcCakwUsYSmj4IwXujaEER%2FQaPHa1EZ6lMtxzscbyd6T4ZuqchslJqXKsaZs%2Fl1kvTCHpFn1%2BqwXsu39T%2Bt2%2BkvcJeVoMENEoGti4WKKo7hseN1VFq5MITFiM8GOqUB54HsmAe1nuYJNBq4zRjf9D5S1X4gW4n2aI7RYdGVkTsEnzmuovCiXZ6MjzKA7Sao%2BVcEZVJlARyGEVfQezIRBcu3nQg94f1wNhwJ25w5eqEvHTNht54Y7VNTOjNJiwJoHRXA3tpLW7FztCU2gzGqxycL5%2F23Pjj055J9xkpLWmSteyIKEQ3m08UW7Sn6Fb5MdyAuq%2FMCabKn0bL3fko3tlNKanmq&X-Amz-Signature=995c7b3270fbabd53808eb2c21bf2b50d2b39556dab54c030b67896c960e99fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3JL7ETA%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIG3TjuOViEFf0T68IJnYNwzsK6ytxbPj21JEeW3VREALAiApPruB9fDjZk1MhG587vSR0gvBEpYcAUCJa39x8uHdIiqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcaXPzkyLcH%2BAQd19KtwDHYzE%2FPWIS00qjDQHkmsI7RnOfV3M%2FkOs5qaW5d59KVS8%2FK%2FZuIoPX%2FrKOLU6kqTb%2FPiAii%2FsNmwV%2FCDqnfHVWxebFBiYtViWXnQLN%2BpVNASby9LvYMIfIA8SnXptjS93xvfA4JoLQ8D%2F4mvA7AEFzw1%2F7ZcDHQfSkOux9q3SntQLzTn80bv3h8PojPPPVPsz8YFXWMc63YQaayg5%2FM5qWM0v%2FPHwmRP17e6rC2zILeWIUsM0zOhJMdL6ozTwKz%2Fs%2BRQq3gpDlv%2BxGIOAV34UN%2FfLQtvcMGVFRijy%2FNh%2F4qDIXILwgXYaxo1y2XQOfC1vQy5bDmmzUDUep6gDv%2FBDJZunNuWaxj%2FBv%2BfGurgZ0KvcWwh5%2FeOmIVH8EbSCwLMlbIx7BXsCs7rvYSmQt3B%2B%2BuPTexgw%2Fg9b%2BOa9BBqbWq96ZBYgRNqrCAVgHYeL8KZh2j7bcpDNWDxsa0iXiH5BolnowOn0cK%2FD9GmZGjC6MccMs%2B%2FvB%2B9pP0mLlUkN67rwLmD7%2FMczCP%2FPQyKk69FPLp3qybB1Gx1hs3kCK0NJFWYHJlm8qkm6QVzp6Nnxw9Hsve250SwRQNmjvGRXO1xJ1Vww67IQ731DBOQfoS2vUOQwGO1T6T%2BdEpmeO%2Fkw2sOIzwY6pgEYR2ry0UKpg8dkcNohTSDoQ5gt6xyYhOMvapyrisEWUbmntwo6BmUwdXSDBxX6RG9t3kz0Emfh5cBu4Rp4dpoeAzNa%2B7UaWdlXOZIgNCeXwXHeDl3zRqypahQd2Jc5n0nx0B%2B67ZkwQXiqw9zPlAx0SNU7SthKrYOkqpp4qIN9HSztWZmwNBTdTOPqmqGCA3WWZGYkOCQNRU8zVVTb70o4rlTC4tB%2F&X-Amz-Signature=ebf4e753e0521a4f6f0d3ac38ca2f40dceeadc3598b5b6b59c45555aed5d94f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEDE7ZQP%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDyG198dKWz%2Ft7zxF0fQ2Upu6h3M%2Fgm17GaNBmgw6A%2BaAIgRIDOBvSfpJECrysccKBJe03j6xeTZzwdDE4kvrsK1FUqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDINf6KeBPMzNWYYUUircAwFfUkmMCJu6kRO69%2F0BAghNKIdColItwKYMv%2Blj9kj1n5wQWnUNdVoLsrLFI1hBfJgonoUZlVAscRjf7K7Hyo9VKgJwSRNliGvgJJjsz61Q1cJRM%2BOGhIWdisMitUFDfWMMXZpJaLmfIaK5M1rVCEaq%2Fj8fTL225pvm1UGku4M9A424efgV%2BWF6Lev3V9gbrzajakhq9qwK2OWvOCwC8JpJ2Jyv%2FZrY0NUVRmmbCDgepDoHNqVG%2BsE7iRiOxiODcMevQ%2BEPnMuKS8XrYgZZWCGyLQ02oM8GhTxlvHoAikvGyyhqBA1affSG6xgRVU6eHK%2B1NRLhHE2YdGZ%2FQy%2BvZ9HeC0OGQ77qyv5dhlEaNXwPS1WwG8EZKH4mFkHUzhCseZ%2FI9nSB98eifTY8BJmb0cGnH4x52%2BkrNW2GVUORCgLcAjckijo%2F6evdAh3uihK%2BjSy3Yxt1w8k39bqZFc0csCoFdhMiM3msa5EGuqWzlcM%2BHoAgUBKbDIhvcbYqJpyILqVHMlqz9cd9VpfDxGdtIxs6Vck0sSiTIWDf7rwpMJvzBKScswu4UV3ckUUoYCUT3vG%2F7oYVmyGGISvScUrxahCMqXzyyS9%2FTckcU2g9TttYirIOEzmboo5CWZTdMIrFiM8GOqUBWJ4wWMEUgv21gsQgc9tbL%2FuIkBpmPcQdTkqr3MBSVbB68sG2Ha4%2BetpWdprDvnRY7VSUOj7ikw1VF4Q4tL5jw6X%2Fiqkil0EgP%2BlgFPxDFt9DvOqtH7wH0D6uDlNVt3qxqNmAjHXXNtvpcJSDpKVyOuJCTdXcCjkSRNQSm%2FB2Mf%2FoWnCQTa38v6fpK%2FIIreZghXauPBc5Yzdff%2FaoQBkh6fqPHxUA&X-Amz-Signature=c6ca24be9e27ade58a2746249910e94916d68aa2b13d35d2ff5525dc52988043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQC6HXMJ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDmVqsRrf9v%2Fl6GBndDnAWo7spvjNK3omYkbF6kixpqCQIhAOOawrob3eMx2Fguyv5jcOb5M0DJ4NTPag72Arvb7luxKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwahchp%2F0M%2B0IT%2Fx%2B4q3AOgYdQWtaqkoIdJZ5vqrvj9FSzseZPhqvNMT2j7Kf2%2Fcnhpj8bU9zWCnzkOSjgdu%2B0rXXiH1OVA%2F4MbYr4uC0%2FEL1%2FblS9oI20WS1UOS5K0SH4g2jXBgfDVAPLurXgoNf390O6SKZb%2BDFHlLZsOjTiW%2B%2F2jXa5HDK623UAZx9qCweicvBZ16h%2BjyZs7GICeWdETqPuGqQSjeVGF6XHuytFdWV9rHCBy%2Bz92XeDI4p5ci247oXu3WgBuKpqCEN1CEkN7dkU6A%2FcLtI19Sj738K7Pf6Q%2Fu1o4%2BxhCSMsybGWOSybHxeTIXfJGRyljOwiU3UQVi88tAzH0ZBe19M56kwOP4SRVxB9obim5NQ81C6Y19RD9bH3%2FspgjwM%2B8AlpTMiwwDEj1HjTBOraGZdKhdjiX3xmCCdR8JhmrugAaRTnbpAVb3UCSBHaHnDrDRcA%2Bs6YQjFmOmkRq5EkAikQWCRXla94lvcN%2BOhRrDiaK7xnVXEReXMVcPfruZnQyZMEC2pIzCy9l1RSjc%2Fu9ceP29EjiwJhZ67sVhAT1e50Dr1%2FfpKdCZo832mdn7vYNYnkPcQSvJOabadtPhW4YUZzzFoIX48kzQVORxgkKqArarcp%2BYL%2F80m1l9HlTh%2F5mLDC3xIjPBjqkAVDAkpCS0MEXS1MXAH2DG7jvBK9%2Bb6IOsoESjmicOEvOjZC3F7qQ0XzXzFkOry04%2B24jTPDXqa09o9mzttzI5W%2FNxI8d80HbF54LaiB6mp4Xrto9stmW%2FmN3xhnhnqJiIjfkGAxCKUCxu2zbzxLW3oFDGKTHwVAVqG8ejgVNIj7WS6lmkOYYK7%2FQnzFDp1M0U26K8eqq6oQGWcjMa7DiGFr9QZDc&X-Amz-Signature=f87e3dfee12ce1a90cd3c190078f40adcb1e5a36753dd03343633a57d247ba31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQC6HXMJ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDmVqsRrf9v%2Fl6GBndDnAWo7spvjNK3omYkbF6kixpqCQIhAOOawrob3eMx2Fguyv5jcOb5M0DJ4NTPag72Arvb7luxKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwahchp%2F0M%2B0IT%2Fx%2B4q3AOgYdQWtaqkoIdJZ5vqrvj9FSzseZPhqvNMT2j7Kf2%2Fcnhpj8bU9zWCnzkOSjgdu%2B0rXXiH1OVA%2F4MbYr4uC0%2FEL1%2FblS9oI20WS1UOS5K0SH4g2jXBgfDVAPLurXgoNf390O6SKZb%2BDFHlLZsOjTiW%2B%2F2jXa5HDK623UAZx9qCweicvBZ16h%2BjyZs7GICeWdETqPuGqQSjeVGF6XHuytFdWV9rHCBy%2Bz92XeDI4p5ci247oXu3WgBuKpqCEN1CEkN7dkU6A%2FcLtI19Sj738K7Pf6Q%2Fu1o4%2BxhCSMsybGWOSybHxeTIXfJGRyljOwiU3UQVi88tAzH0ZBe19M56kwOP4SRVxB9obim5NQ81C6Y19RD9bH3%2FspgjwM%2B8AlpTMiwwDEj1HjTBOraGZdKhdjiX3xmCCdR8JhmrugAaRTnbpAVb3UCSBHaHnDrDRcA%2Bs6YQjFmOmkRq5EkAikQWCRXla94lvcN%2BOhRrDiaK7xnVXEReXMVcPfruZnQyZMEC2pIzCy9l1RSjc%2Fu9ceP29EjiwJhZ67sVhAT1e50Dr1%2FfpKdCZo832mdn7vYNYnkPcQSvJOabadtPhW4YUZzzFoIX48kzQVORxgkKqArarcp%2BYL%2F80m1l9HlTh%2F5mLDC3xIjPBjqkAVDAkpCS0MEXS1MXAH2DG7jvBK9%2Bb6IOsoESjmicOEvOjZC3F7qQ0XzXzFkOry04%2B24jTPDXqa09o9mzttzI5W%2FNxI8d80HbF54LaiB6mp4Xrto9stmW%2FmN3xhnhnqJiIjfkGAxCKUCxu2zbzxLW3oFDGKTHwVAVqG8ejgVNIj7WS6lmkOYYK7%2FQnzFDp1M0U26K8eqq6oQGWcjMa7DiGFr9QZDc&X-Amz-Signature=b1b8d536a505cf97606621d33446c12f350e1eac6bda8b29e127a4fb597285c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZO3QJ3J%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQCujpxp7F%2B0QWHbBVBNhh0l4VY2yJKq3JljwgkpqeMm0QIhAMCzhhmTEmz2cKDKd2MKmrqC4%2F1IbpjcymOG58I4xHXZKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwTz1%2Btjsv6Y6vT6jsq3ANsthMOKvX1YIL%2BwlPxnvdPrB0zPhMVZgkmzQntTLaDRTajFZxQfcb0iRdkDqVogLG81qVH2Y1Dd8L4jb94IZqFhnxn0%2BUB1ZjXBMgzos4SnOqQVw24bI30RquxHp8YFdJ2%2Fx66XR%2FBVb4s0G0Mu8pXHUmcaiBpOVb%2BOHjU%2BG3ceya6yGgM1aKAenebBJSW8tcJVk1T%2FKBKmSolV6ar64DE%2FjEDfcdpqgens3XpzSXCpaPVaIJRGlNmGOyxtvs8mpN5SvaAFRwNS3fWlRsYpvAgnSYkjyXQdLRimMqRssB6WrBLQxvop58bFS4GPN6qfwjuvMG0pJ1GlzblgEPu9Yw5U02rKc7aTuLFeUd9WBXmVYefW4e8BTAShdVRAOKKQZcfZqcJcT2OVItVqDGQwzOf3bcEAWLozlQaBFcdj6iCsYqNLBG3tiVaZSkqi0k5Wops6ui7nfgthEeIa0UWbxbbTy%2Flj6WyML09XniEBYPrgcoOC5tSsvzNrwd3JwFQhr%2BO45VlsqQwFt7dYVouUgCWluspoUT6XJ2aHlkIGyif5zv%2Bfo1fCo7NFmvi8iqE99XDEOHP3PPXU7ruqvUaHD%2Fyi9G32RbS6JJOuLnWJANmlunaDqdT21KMJ7SAjjDVxIjPBjqkAVAhw4n9Np%2F9ILeYcL8zUoqytrzGNqqSVoU0nQb8QIctF3V1q3iCfB1HW4zEqGDC7RmzNK%2Bl6RiabU1hugpL3%2FRht8QB1RNeEB%2Bsj6ws%2B%2BOpluEw5IpMOrlz3YJHLwX7PyPO2aiCfpAikc999nYMjr4CtqwiaqfTN8EauWI3YpIYw5wKLXRZ32DeFEJGNatQ8Ij5dpcNrRpSgXFnRoAR33MZArcN&X-Amz-Signature=83d1e771040476017382c7b618677676f47f37eb46c95a57e5fd9aeba3934c95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UF6RNECE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQC0w%2FqVmInogGc85rQFA17STVwpkzU9i1Y23kV%2F7tJyAAIhAMZqsnZRv%2Fv3BQUn6oc5AqZoriEZVouMqZLnnkDq%2FqxjKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2FRlQb%2BAD1G4wy0I4q3AMFeY4gO6iF4cfx1BAgxMwz7V0PMR%2FSV%2Bd8jxhT6GqHG01GKoy45GMpV7VgopQYHEDA43qned2jXmjxj8NJNFZ%2FpWXiCRu8UC%2FEzre6SFPd0PqFDP5TuenfnYGLQn94jb1%2BIx3g8doBbwcQmPFx4TJZwSFxSDFElQ5eaEtx791ZrcccrWFyrGvR0cEHAVHjspiZ3TDWF8JwW6FQ%2BjW48y6kyjdopaeUeNuQ6GMdy5dq6B8GhsqeJaBL%2FHemHrQ9t0wPfQW5EKAJtrW91cPhMWLFyfcxUMxvmZ%2B7ikDL67XpbwUGZwMnLfUDl7R%2BS9%2BX04AUmHpyc3xqbcSiSxuPJFDiYBDDgZT764Qu7beLUONzuENrfspmOrJ4E6qbDa2EQioGfI%2FLOrL2YQy7nljP9zrDxjdM6MQbOXaLqWRAb9HTx3Pzld%2FvFQ%2BvWGBxG4OpG50oC8E4U2kbbEOwbI3yJBnGFaBELEb%2FS4W7jFy7wCupkuCFWbzTqMxsV4wWazlQfb8MhYyf1L6N8bKpELwja5xcSW0REtXsNP%2BknS5fU%2BeCRyMAwWvCZ6KmHmAYuI1G276k6%2FH%2FoXIwJCqCD5RK%2FJbfk0ccxzGEp6s6QoZzS92EWBoYMI3jvv4zUyuVbzDtw4jPBjqkARR0cUu0L59ilz4byS02Nmm1kOCe68XMOml8ZXlQYMWV1u5%2F5Mdxpshsw7XPbWVtO6jd46QxKNPn3WcyB6ww3EfSYuT5pfHOWd194Hr89LkBetZA5k%2BLxFHcJXNBBgBwlEiH%2BnYGow2hvfgHD0JYWYY93OtuDGzLps72G3j1n9wRogItsuNQCpRABoMw8rm59mx4ar6AvcBt4CeqOQ4H%2BcNU6Zfi&X-Amz-Signature=77f6217a0ffa9cb5dc00d370ea57a116c107c6f8c96605cd6bb5742d2d0ab159&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UF6RNECE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQC0w%2FqVmInogGc85rQFA17STVwpkzU9i1Y23kV%2F7tJyAAIhAMZqsnZRv%2Fv3BQUn6oc5AqZoriEZVouMqZLnnkDq%2FqxjKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2FRlQb%2BAD1G4wy0I4q3AMFeY4gO6iF4cfx1BAgxMwz7V0PMR%2FSV%2Bd8jxhT6GqHG01GKoy45GMpV7VgopQYHEDA43qned2jXmjxj8NJNFZ%2FpWXiCRu8UC%2FEzre6SFPd0PqFDP5TuenfnYGLQn94jb1%2BIx3g8doBbwcQmPFx4TJZwSFxSDFElQ5eaEtx791ZrcccrWFyrGvR0cEHAVHjspiZ3TDWF8JwW6FQ%2BjW48y6kyjdopaeUeNuQ6GMdy5dq6B8GhsqeJaBL%2FHemHrQ9t0wPfQW5EKAJtrW91cPhMWLFyfcxUMxvmZ%2B7ikDL67XpbwUGZwMnLfUDl7R%2BS9%2BX04AUmHpyc3xqbcSiSxuPJFDiYBDDgZT764Qu7beLUONzuENrfspmOrJ4E6qbDa2EQioGfI%2FLOrL2YQy7nljP9zrDxjdM6MQbOXaLqWRAb9HTx3Pzld%2FvFQ%2BvWGBxG4OpG50oC8E4U2kbbEOwbI3yJBnGFaBELEb%2FS4W7jFy7wCupkuCFWbzTqMxsV4wWazlQfb8MhYyf1L6N8bKpELwja5xcSW0REtXsNP%2BknS5fU%2BeCRyMAwWvCZ6KmHmAYuI1G276k6%2FH%2FoXIwJCqCD5RK%2FJbfk0ccxzGEp6s6QoZzS92EWBoYMI3jvv4zUyuVbzDtw4jPBjqkARR0cUu0L59ilz4byS02Nmm1kOCe68XMOml8ZXlQYMWV1u5%2F5Mdxpshsw7XPbWVtO6jd46QxKNPn3WcyB6ww3EfSYuT5pfHOWd194Hr89LkBetZA5k%2BLxFHcJXNBBgBwlEiH%2BnYGow2hvfgHD0JYWYY93OtuDGzLps72G3j1n9wRogItsuNQCpRABoMw8rm59mx4ar6AvcBt4CeqOQ4H%2BcNU6Zfi&X-Amz-Signature=77f6217a0ffa9cb5dc00d370ea57a116c107c6f8c96605cd6bb5742d2d0ab159&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWSVWPHE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T124603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQC4ScSESKfjAeCg%2FyaqnyoDt2E4Z0rjPhYvGeclsjHKtwIgRvEvey65R%2B2UZL5eocZQI7AVuVQO1z80RmYdvSOaI8UqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN4hjmAgDfHZu3IPbyrcA3%2FERutyWGomUXy6s2BvKIUIRKZynCnvBc1epCeLycTIRJqb1XVY2BUZVU%2BkXe1UOvs8wnJC06k2%2F6Z5gDtw4LQ57AH93CEJOIIfpE6vPlrgW54VInSWH1qDN%2Fgy2VCRBZXBswSHOsONiQ6DvTPIDiBITIj9Nf9Sc1MbGna8%2FeZlIf72jKck2kMLw43kMYzELkQYAiw48pYAuQkFoOSlicmTla8krFVoTHnfg576dsy5H4DabN%2BH2hrG5tKI3jEglneunOvUwx%2B5XT%2BU6jJSEzP%2FLY5q7slA%2F1Vdf0MA4BJsAReqXXm1WdiLiIzGD03hLOhEqY12ZuyxcpcLX2Efy6ODQ1%2FiILM03vhVwOV9NloVRvTG0braJtk4R5RAF2frwNas7fYJiZeWrhNPe1MH3Q2ZT9L9Kt0FoMG4u%2BBjSaFCfVQcRoGzNtLoUQUrBBqsMfueA%2FWyaqUMjUI96Cf07HgLVxE8p8ctS%2B6k5F0qUJMXvBCyK2mJnMGWROLFNR7unpNwuPkl9X86d7fo%2BD0lbsXBbVjHiWT6WXpNxEr95XS2JnVjpoH%2BqaYnwMwhgY0oie6QWzPLRGzU7RAPH3UCLwtmp4U6%2Frpwigo020lzsC8FUh66ne5y66zlROo9MLTDiM8GOqUBsBgI4apaOdoQLmph4iXizVRM0bEXPJAhc0zQ8JHAwvY2BA9WJQlaVbrWQvg1xErVuGkFUptkUY565VIq43V5ApTo5HsOg8q8PC2lFBY8MilXdw%2BJ5x6voGm%2FnqdRloFrNd5wGFwqlM%2FYnv%2FyDZEimyiUUsdxoBMikCGE4FOnNzCF3S33LZDZecGuI02TLBeZQmtHdx9enyonHFD5zrwM1q%2BLnq1b&X-Amz-Signature=23eecdd31b29e9b76008a09c8ac08a2e2bf1556d380ab8761216646529ceba02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


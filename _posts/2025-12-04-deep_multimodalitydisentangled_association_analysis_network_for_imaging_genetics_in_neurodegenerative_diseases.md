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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YZITS56%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIH1lTKfzPiJLuYgH57peVxG0Uuz52JRcUAYd7JDdDPn6AiBO4m6qoe8qHqYOFyvt217vMCIMIkzuMKmHRNuZlwsD4yqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjHJGe1LOFjb4Fpk9KtwDwsVkd9rpFLkU6AlIEQszWGqOgL68GqrEZNGf%2BRqU1qHdwCM6zUi5Y3ZBzpN%2Bk9GqYjvp1KiZjhLqqRHTHtpdCsB%2FeO0dttMvPHUW7MPmhjr6yCtPlX5P%2BQF23zqDCQ0XbaFJTKnZKJgdWzWXk8v6luwDyATalT3hyC2c9rV6h2QFrhzP3zjwXFgVmQBCM34vRx6uxdD0YpBVpaB%2FMmMeP8AAqgqjjPf50ytBJjA%2B1%2F4KUHCkmXFHDWXB2OYRtbqHeYs88bxfYm5T5o66Uc8Wbb%2FFdy2XIMx%2F%2FeQZgFdskKk6hRTwdhIm%2BIwWvwmArxlS2DGfyJCQoYAro324Pi4T%2BAkeIofr5y9A%2BUMZ31bxzWLEQWZAtUnfShmY2QdDQo9f0COZ8G9Yjdh0SITyIsJ1CGr3eTtz2BZTwdabaBRwjY0f0JYvIXHQOqD9%2BrZmbX2%2FxQC32c9oknTZv%2ByXoSbSCcycjBQLVWC6TRuB%2BuarTTptO5mfpVFLQA1n%2Fjmhrld7G%2F4jV7rJ1lY7GjuZ8JDIhaePrZ9RiDYePr56LF7ju4A7BWCpB%2FBLnsKV%2FSz7EdL6cAzztvypUGwFhtWjWpsH0pxf3vscWuBYs39roIp9YXwdnqYj4zACIogQPX4whLfSzgY6pgG%2FYWvIwtBgDb6Xc3%2BSa5ASY4S8RZNMsXUicKrwkufBHsoBB74jDkHgX5wxDifAWRfesn3OR3i0jvulqySmFjOd%2FxP5PcJxNQXP8LeKoI7ASjzo%2FQwn8CNHgDVVFsGnxp%2Bo3EoRU4LcaB1LVw8t3kj9ZoFLBWF2m2amoN9%2Bai%2FORTt9%2BKPXHGPlhLcvTlXqUGt6OYH2wYB73jUcuIimd0qbZA7y0bui&X-Amz-Signature=32aba5251d5a3acdc8877b6e6843ab9803166ac1cd0937771321700cfbd776ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YZITS56%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIH1lTKfzPiJLuYgH57peVxG0Uuz52JRcUAYd7JDdDPn6AiBO4m6qoe8qHqYOFyvt217vMCIMIkzuMKmHRNuZlwsD4yqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjHJGe1LOFjb4Fpk9KtwDwsVkd9rpFLkU6AlIEQszWGqOgL68GqrEZNGf%2BRqU1qHdwCM6zUi5Y3ZBzpN%2Bk9GqYjvp1KiZjhLqqRHTHtpdCsB%2FeO0dttMvPHUW7MPmhjr6yCtPlX5P%2BQF23zqDCQ0XbaFJTKnZKJgdWzWXk8v6luwDyATalT3hyC2c9rV6h2QFrhzP3zjwXFgVmQBCM34vRx6uxdD0YpBVpaB%2FMmMeP8AAqgqjjPf50ytBJjA%2B1%2F4KUHCkmXFHDWXB2OYRtbqHeYs88bxfYm5T5o66Uc8Wbb%2FFdy2XIMx%2F%2FeQZgFdskKk6hRTwdhIm%2BIwWvwmArxlS2DGfyJCQoYAro324Pi4T%2BAkeIofr5y9A%2BUMZ31bxzWLEQWZAtUnfShmY2QdDQo9f0COZ8G9Yjdh0SITyIsJ1CGr3eTtz2BZTwdabaBRwjY0f0JYvIXHQOqD9%2BrZmbX2%2FxQC32c9oknTZv%2ByXoSbSCcycjBQLVWC6TRuB%2BuarTTptO5mfpVFLQA1n%2Fjmhrld7G%2F4jV7rJ1lY7GjuZ8JDIhaePrZ9RiDYePr56LF7ju4A7BWCpB%2FBLnsKV%2FSz7EdL6cAzztvypUGwFhtWjWpsH0pxf3vscWuBYs39roIp9YXwdnqYj4zACIogQPX4whLfSzgY6pgG%2FYWvIwtBgDb6Xc3%2BSa5ASY4S8RZNMsXUicKrwkufBHsoBB74jDkHgX5wxDifAWRfesn3OR3i0jvulqySmFjOd%2FxP5PcJxNQXP8LeKoI7ASjzo%2FQwn8CNHgDVVFsGnxp%2Bo3EoRU4LcaB1LVw8t3kj9ZoFLBWF2m2amoN9%2Bai%2FORTt9%2BKPXHGPlhLcvTlXqUGt6OYH2wYB73jUcuIimd0qbZA7y0bui&X-Amz-Signature=32aba5251d5a3acdc8877b6e6843ab9803166ac1cd0937771321700cfbd776ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZWAFOOU%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIHTKikPPmsL%2Fw2GuptUC6tcD7n%2FQgYPUWKvdFIcJpxwXAiAXjUaKhs%2FOMMbns7L8A12DadkHVTCnbUn%2FNfMmrLUP%2BSqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKLobMNOcuRjLVdPZKtwDdPHnu85CsAhMQdtTPvaPz%2B94K9BHV47%2B4d7ZuhdtbBflAMvKPfLvO54t5FR2plt12k1FwfZlkUUnPFmEY0wiU6TmNsRBIDpvb9iJ%2FjraGYH37TGUb3Y7nKDyXbwvlsZTv8fbrbuM2WRob2u7%2Bd8swa7ligww0yWxcoa0fhtvlTngehNCwZ4MRkUKBbQa8crrWxrBL14nUkvay6izTyRSLoU%2Fwoq6HQOshkDRTGtZua%2FiQHnvnMN74QtVSYSsTyS2rrMYDtQubGmxQabqDSuI6Nk5w%2FcCsU0vFA%2FJglbNh8RDFOmba8qejmWg4OBN7pgIxgWdFzRcMIu%2BNzHZZosARXkp4wX0SGNG9CKEdoOXfU1w116W9qJJSfjsVODGJanXrGQ13tctwOGILe7YqRVgff%2Fz9rd4dRe6DYbwfKZ3VFRC%2FFVQApH9MEWOuqogRXO7TYkkrzU1r8GCS6yQ8kH%2Fe0Z1ZTOjUSJGP65cCQGfjtUTiTwPvvYtuQxT0Sa9IWJCixJds0TF48qCLUw9OM82HVPYaEE%2ByrNOLF0oIaOVuRAX4sE871nvpjbsdT%2B6gkZ7kRTbiaOAWW%2BJYsLkgLh2eee6w%2BgCTZGrXgdFEJlHD8%2BITvESaLP%2Bh6Pq1PswtrfSzgY6pgHnlOlZxUClxEbU5pgolcwXl9zrQAhBCQHXpJhy9IK6I4nsAPkASCctdLUtjkbnab9begX0sN0G2sJV5YuLn1Zbwd5HOoBkR%2BFJYGnPMJgbdf0uMUVJXTbo7XkXGmWelYB3obgJ6DwqKL3FM2bpXtcRHym8oRJmBhn0tiX4ykvi9oi%2FiRqq3TMS8Qmcosd5ggGzspXNyjcXu6kDk6nroH%2FVOydjjba4&X-Amz-Signature=df4f936ed40a0926182bf6d72d7f8c01c94c12b583bde70335d2fd6db2bfcdf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG3VS6VY%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDFsNZMKphwV6xLdae2Nj%2BOoqX%2BFEl%2B8c1D2EE2Qtn5mwIhALIiscMy6CE4NJ0zUjXUlqTG%2BEP4veQKfvJ5PPcK7Y5YKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx6TXIAgsEa2yH4LJYq3AM0kVoOveyXMX2vrHtGc9%2FRFRivySfO2J%2BlizYwswzraqm52tS68PWYacFQivN6%2FOmN1l2Q21w3%2FYeYklWvQKwe9rny2ancyl9mws80j92tAoDe5O371dVgCaV6boryhHQnlXYwJGfzZ%2F3YI4JcCtD4c%2Bi2cyPAtjpFuBumDs3ozSwMkIAgdGZhHzdodhK%2B3ZOHRVMxBbKnztFNgN7pdcquS2qap6HlRGkdPIy4rA8IsvNdXhPrpf4sl9ETWFfVcSKRK3UP96%2FC33NfFPRL1oMtUjgmP6oF%2F5IkTxZ2zEBFIPNYcdRUxEyeNNHwCjL2IJDD9FmRcQy5aybVAiaY1bHQsd0%2F2eEVh2sEeBQgKIVGZWFuERv9Bj2TUs49VjZFjAYzET2aLUuP51C7zVc1dmoG6z7R0sbMZxgYGxB7keY2JCFUjrT9BYO4%2BzmnAn8SldAWOQ09mjWd0G2NgG1MmHPcVXGWG4WLMw9SK63cQGlgD4iu%2B6rgiptJ%2B8PoHGbjJG8OhLwA2DSfTGUlN2MBs%2BO31lBup4kcN8qIoMEcg2FTnsDnzyRduo7JtmE6uN4k5tfFxrVDNCprE8%2FHUG0EL899ixTWFon7BVo1Nfa5j7c8ecOdg5BwFt6xql1TDzDqt9LOBjqkAWZaGQoYP4%2B00SQR00HpRQwyoAFjR7SJs3WgcflVxhsb%2B6mMpZMBw6GkYOVuIlVaOpJ83itv16vKbvpVzUPA%2F7Kj3sT3QXYol93Lfh1fkhGUovIWKBDbxvUsY1XrSar4PoIZRncaxGJwdAWYoTDpCnzIvOP68JR6D9avcimOe2L%2BEaat%2FpmhdqxE0NXG1EUqpMn6nlk7qv0lCL6mMowOVen4aUKs&X-Amz-Signature=448092bd2cd35efc78e7bd6c3269a8a1848c560dd4fbdb806749750c42369664&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG3VS6VY%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDFsNZMKphwV6xLdae2Nj%2BOoqX%2BFEl%2B8c1D2EE2Qtn5mwIhALIiscMy6CE4NJ0zUjXUlqTG%2BEP4veQKfvJ5PPcK7Y5YKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx6TXIAgsEa2yH4LJYq3AM0kVoOveyXMX2vrHtGc9%2FRFRivySfO2J%2BlizYwswzraqm52tS68PWYacFQivN6%2FOmN1l2Q21w3%2FYeYklWvQKwe9rny2ancyl9mws80j92tAoDe5O371dVgCaV6boryhHQnlXYwJGfzZ%2F3YI4JcCtD4c%2Bi2cyPAtjpFuBumDs3ozSwMkIAgdGZhHzdodhK%2B3ZOHRVMxBbKnztFNgN7pdcquS2qap6HlRGkdPIy4rA8IsvNdXhPrpf4sl9ETWFfVcSKRK3UP96%2FC33NfFPRL1oMtUjgmP6oF%2F5IkTxZ2zEBFIPNYcdRUxEyeNNHwCjL2IJDD9FmRcQy5aybVAiaY1bHQsd0%2F2eEVh2sEeBQgKIVGZWFuERv9Bj2TUs49VjZFjAYzET2aLUuP51C7zVc1dmoG6z7R0sbMZxgYGxB7keY2JCFUjrT9BYO4%2BzmnAn8SldAWOQ09mjWd0G2NgG1MmHPcVXGWG4WLMw9SK63cQGlgD4iu%2B6rgiptJ%2B8PoHGbjJG8OhLwA2DSfTGUlN2MBs%2BO31lBup4kcN8qIoMEcg2FTnsDnzyRduo7JtmE6uN4k5tfFxrVDNCprE8%2FHUG0EL899ixTWFon7BVo1Nfa5j7c8ecOdg5BwFt6xql1TDzDqt9LOBjqkAWZaGQoYP4%2B00SQR00HpRQwyoAFjR7SJs3WgcflVxhsb%2B6mMpZMBw6GkYOVuIlVaOpJ83itv16vKbvpVzUPA%2F7Kj3sT3QXYol93Lfh1fkhGUovIWKBDbxvUsY1XrSar4PoIZRncaxGJwdAWYoTDpCnzIvOP68JR6D9avcimOe2L%2BEaat%2FpmhdqxE0NXG1EUqpMn6nlk7qv0lCL6mMowOVen4aUKs&X-Amz-Signature=1ef7d23c83126a63b917766cc0cd8c10e523b6201f645e776f0c7d30f7994ef2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSJXH6CS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIBBxb6hD4VzlAj5y7hSZShdFLfwKMx0LIli0ilE0KLmRAiEA8dIw%2FYLRvBD5YWQHNVkwo%2FGnAytV9nEkLplcopp%2BtuQqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOjAM4%2FEXAR0KJ4uLSrcAwO8JjVYBANtL7xbPBbfHYeqdcJLH8cNrPUxEDJvRofhadBGJr960lQCz2qesziNQloGkr%2BiGFj2pdRHc26edP63%2BVBFgefTt5QNqtqjtWO4fSe%2FMDjCYiTlA8eKulcQXo5fC48%2BGfsG4OxvmGboluGFRnnRmB0QjbTJNZKIuxDu1QCkLIZqtjjqrUdspNwOsc4h10VNwD3BLG6W8jKqKnaJNKMrkddOAzrTk1gHH0hZCBQMvgrj%2BkJ8aeszBsW%2BEWt%2FcRWJHH7foo%2F6Awlih4RyqPLvVZx7AeUOKbH4Gs75flijB5yM1xLmrANYqRd3EZewgmF6FVKIs0YEyvJIx8k5GDXe8jIoOLVm7FQyNLeUJ7%2Fuv4mT1Ep6ZcxEEPHy67E8tT7iLv83%2BiwwaBTBz8N6gQkY9KFoUY%2BDz5vwrjmoGNmAhlRTlHkoVHmStoohdQ2NeKoMEFTh%2F5oHhIiin3kuqozp0tRUOFEWiullP9z3t7NciP22AXInLQHwfCaIL9%2BoiYSxYExYzt8pJfCv1MfxrcfsJIodn0eRanf70Ee1cUu8XjplkWNARheUz0ikg%2B1ASfLAGO5hLKEDxy5ZDAwOcObGB%2BAKdxGnvNHr3y88XB%2FMHuiFVjaOAvS3MJ610s4GOqUBxdLIa%2BzUAt2PNvYy9f8f8XsTHGfJyGCym8MEqgeqeHS5a1pcfE7WBeL089aTG3Nl9fzz9P5G7Z%2BTL1YnTB6flFFxJ0cYk55%2BoPQ63i8DmgWrro%2BOs1U2RklY2cqV14MhrumM%2BTc9QEt2dkx%2FZC6QrGZgOwfSJmNEfWFjgj5NnQrsoreQiZIZb0SQIS7P8SANyP3d3lFKuCrVSz0rpjgw4Ar6pWgh&X-Amz-Signature=fd22f3605d38c4d8542f70409bda54183fa103f3b77bb38f231fa5d6fd9cf96b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6H5HITT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDUyQhba8rHlTwvmKDRQuAbp4P%2BL%2BJgVPjuZbNubppQAgIhAL2IhG8PKvQLmHl9ONBVd0FMxjDWvIL%2BiIqofNhTgOQsKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzK%2FpvxvrAd6gAKKWQq3AOLPf0H3EclpppzwD5dZHaWrv6VInElOlRBLWEdFsOleupVRykukYN45vCOkANLEtpOWS7YpHMQUaVbEIpS6%2B%2BvHwq3jKh5%2F5XzTDjiMgP8PNf%2FyahDlsDHUsVj9qoQ2OH100DntrhUlSSnY%2Fjdhf4XedSZ7cNxsYyiFJ2LXwBBIaa7kLR2HAooVYKg50j4zG1kUU8DoJNInImN%2F4eUyfvTNygrfXnuVfxFHuO%2BCSoCCX5W7GeaFuMnrnG0Nb5DSpCL%2F%2ByCFesfCxIOFvVItzKZ0inkrE7oBMso8bcREqqxlNpagAhtauTfthyCl8FOUvWxwCC3KMN6ddpn4tWladkeQAXBks7bPwXHBEjKFkkioFQGlJUlPr7AJZl12qfq9GHc0FoLr9NIVhzPDL2gJLGZgFyTGOOTzY9Jyn5HE%2BwS1ujLvd7vllVid%2Fvksf9B5pwqPn9kMnEeHG7b04Bto600cHdYgMNoPxEZP0zXHwyn0grnB9vFE%2BpJaOZ%2FgVC1em4pGSxAjM3UxvaWFuC60A01G1cP6eGOQYDQhfKbjuTYKaHBILXTgC4dgM%2BHInhJtTFQpXJy%2BpbOIjYd7oKwQyghdUWAlU1NMbtNXOA1YGnvdO9BCPNtp1UtxrgX%2FTCxtdLOBjqkAcYmbf5zrlfWlq2wG7r9h5tLagPbNxNSLzqTu%2FIuZwfq0msqQcOyUt1UMLPU47hmYModhwmeSS%2Bt6aan7JhDYdejzO1xyWZ9kMF1Hbe3yWS2DhqeHCc1jSp023%2BC5DQrRcZWzConWpcrz2MXu0%2BOiQuPnGbjyeLF5JvqNhVHhlEQ7h1kdtWvPUK26R9OKJvP%2FDnqZqS22v3xvT28XlXXyv%2BArQbx&X-Amz-Signature=b0a300bc83f50e8d7737988b158848ead1140d82610d16aa9cfd043a639c6c03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNTOYOR6%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIH75g0BvQx87D4eR1zy8wOUaNbUZBnGrt03ZI3%2BsrSZ%2FAiAoZoec2qv0FpeSRPDJbUqycibnTWEmi6tyeBwZNV0tXyqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQ1b9WubCymwa259jKtwDArERQ5gaPa%2FTioiL6mNw1e9Z5iC8zDFhdijUBwOcI7OQTHX9tmtC1qX%2Bj7O7fcWJwEoblYqKZ6hG3%2BPcg2fMOpuJK2J62vgzE5GMpQ%2Fc%2FMppmderYjvVrUA2P%2FUgPZb4DA0ZXSGkT9c7cShIXpipm9rUA9Syzk3bMhWfIXzQ3jAgHca%2FZr3SdUKglDC9yjIZ4tQpo%2F60RNr%2FPd5jA%2Ba4lBdSjMVkxdPJdJbmwOAJqrwKuBuiK%2BWj1c0%2BBV2FSQOdXM0WVoW1ipOxwP0qCaYeGQBysuMAHupxGj9A80ij6HagG2t98k7l8XVF3%2Bcj5nLyM3x%2FSH1NDtMBCb4Q%2FgILyfrVwURAkt84jfCvAwP8I2TQLCdVv3YbFRbXObGa7jnC%2FpA6V6POQm4dNPUY2GUicseLV5JcA4N22%2BgmZoqpmQsj1fF2GpBY%2BhhDg3fYD3VqWHPvRZU5pp5oA%2FLmvEThg9JdMq%2Fi7T3M7y5l9pTcbtPDvULnqZaniR5ONl7iDZcWQszq4m%2BTr1u7xFQ6qitvF2sEMrSX05OJkI27Mm7w2j71fk4TGW01qjCqgD3nzVSseXRmHtDQeIETqMMuOKNUBjcTQkiViFuEsZa%2BqoAQpJwmhcGMQrOs0uh3Dxsw4LTSzgY6pgEYoxaxSx7s77h3gsgDtxUB5difzdrCoXyuWVoDQbiiEf4Mbo4heJO6USjo0ZGKa6C6guaFtUXGxUFNYsIPS45zKcZxImzluZH8%2BAjQWSV7b%2BE%2FDRVvRb9uXofHJ7MrtkXPrAGPx%2FL54KY3YoLLEjirz1srniRCL2aDjE8uNRSTSa%2BbqjZMguolyBQxBTm%2FXSMUiXRTI%2BVFA8aoNgNXO3M%2FR1C9grzb&X-Amz-Signature=f6e34b80af8f786ec2cf39130acb2c0b7ab853f12969f9426a4b9ffd8861e30d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZX3O7B2%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQCsLRvQeF8ZjPmD1Cs58Kl%2BLylerb9pIzzsordwRQ9uggIhAOAVQaYy6w93j%2Febq6pIh9v7UIsyvMLqyEKS4sSXZC8gKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx297ITY1A2wibwA3Eq3ANC5LT1NQVuKGqlti4lnGAJw9YIWuA0JpQsixdxpe1vEVY%2FoUfg9HIm6eEPj9CwxtmmXKD%2FrN4DjFdlYsDujXV%2F78SYcTpEjUk0r2BFhKmageBV8MtJEgpINyqaN9NPibLE%2BlLZ5K5kNbuRuxOki3kLqA5NJsKGGvS4a3gWK34KGGEDIsunQIt4Aw%2BRixJi%2FhA4rQAcrLtr5MWxLyLjX6zbWiEJmG1TPRNbZI1zNCC3hx7RBk5oylhJERlxbrcgtAGUqtee9hIoKISpmkrfQ1X2CbTosoZjX0%2B84uKXT4v%2BSFa8nifjAWPXGdYrK6b0Z7fz9uW4cF%2BMvQ2XaIi%2BlxE21NUJPEaJXnfD2td62rpJhPxNZzARNLaZXqPnJJUnBdvEPKD%2Fl5GytrKfUkuFX38P2rFd1PssyDs8RpPbNU7Vg9lGbYeoovYXGnzrSOQkFXBqv4%2FnApy%2FsrSwHd%2B%2FrfxJp3%2B7IF6xToWC5XJxBOuBJZMv235Ft9iRvt9I7o49WAt7nMrohkTvmkb4EwiXWhUctAfqs795HtLA5eXNPa%2Fqql3us5sO5lSWynKILxbda%2BmNdxsf19Nj3qTyIBeWoaPEZsrLsGWRs8gp6Oi9EqSQmXxDfiUTXI5U1qTvqTC%2BtdLOBjqkAWjiR1%2B6EEn0zfpyHZaipS2OKpjMEIWjiFYOO8J9ZfxliXq535Y%2BaYl95mVz34pOe1kNdIuZtd4wigP88yJO%2FVK5fQqcrVJkE8pV%2Fi7L07wXhM3%2FHkVqQH36FUNnAxZ2VdUxfgfjSamCiBj8RnBE81NiuecOd3W6W2VZDyAheXwPq1WJVkGFAUXGhj3XoeimoYGkjscGDy%2BAIxzWBv9C2dcTGDQ2&X-Amz-Signature=43840c5db896777c395c522d3af3e30a1f5c0556f2b66bafe2561c5a659ef1c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZX3O7B2%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQCsLRvQeF8ZjPmD1Cs58Kl%2BLylerb9pIzzsordwRQ9uggIhAOAVQaYy6w93j%2Febq6pIh9v7UIsyvMLqyEKS4sSXZC8gKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx297ITY1A2wibwA3Eq3ANC5LT1NQVuKGqlti4lnGAJw9YIWuA0JpQsixdxpe1vEVY%2FoUfg9HIm6eEPj9CwxtmmXKD%2FrN4DjFdlYsDujXV%2F78SYcTpEjUk0r2BFhKmageBV8MtJEgpINyqaN9NPibLE%2BlLZ5K5kNbuRuxOki3kLqA5NJsKGGvS4a3gWK34KGGEDIsunQIt4Aw%2BRixJi%2FhA4rQAcrLtr5MWxLyLjX6zbWiEJmG1TPRNbZI1zNCC3hx7RBk5oylhJERlxbrcgtAGUqtee9hIoKISpmkrfQ1X2CbTosoZjX0%2B84uKXT4v%2BSFa8nifjAWPXGdYrK6b0Z7fz9uW4cF%2BMvQ2XaIi%2BlxE21NUJPEaJXnfD2td62rpJhPxNZzARNLaZXqPnJJUnBdvEPKD%2Fl5GytrKfUkuFX38P2rFd1PssyDs8RpPbNU7Vg9lGbYeoovYXGnzrSOQkFXBqv4%2FnApy%2FsrSwHd%2B%2FrfxJp3%2B7IF6xToWC5XJxBOuBJZMv235Ft9iRvt9I7o49WAt7nMrohkTvmkb4EwiXWhUctAfqs795HtLA5eXNPa%2Fqql3us5sO5lSWynKILxbda%2BmNdxsf19Nj3qTyIBeWoaPEZsrLsGWRs8gp6Oi9EqSQmXxDfiUTXI5U1qTvqTC%2BtdLOBjqkAWjiR1%2B6EEn0zfpyHZaipS2OKpjMEIWjiFYOO8J9ZfxliXq535Y%2BaYl95mVz34pOe1kNdIuZtd4wigP88yJO%2FVK5fQqcrVJkE8pV%2Fi7L07wXhM3%2FHkVqQH36FUNnAxZ2VdUxfgfjSamCiBj8RnBE81NiuecOd3W6W2VZDyAheXwPq1WJVkGFAUXGhj3XoeimoYGkjscGDy%2BAIxzWBv9C2dcTGDQ2&X-Amz-Signature=4fdd01db98ec3f19c0dce72a5cb348b68bf1765a57aa80b8dd5a365f46f364c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCVXAONP%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCICHu0hzdvOXNPZHcUF4O8gNX14EO%2FgbB0evpVTZkO6tZAiEAuYojgJ149u2N4IKr5a1LTU%2FdMmdWpO8Gy9CS9PMjFM0qiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIb3SUiqtf2sH5aDYCrcA7hGoUj%2FEMTsibVx9DhO%2ByMLYDXfk9FatvYBVyIcl1p287%2BwK9c6FHi31OEAfp%2F%2F94Yy%2FeikBoUuXcnICVfSKk0WQ4ZdlRDkNIBKpY9CCGZV06On1vIAtyZTF5BCj%2BtPAi9BJX9NTZEPf6EXbdWECEGEb60iOG0%2BUvoIrHy9j7Wsxx9jSCzrraXmeXGH3bJZ3%2Bvg86lAauLZ8e5RmXjw09JEqcZNsnuezmR1ztAiPZSCtVsE9QUBnhfeSSDf3oE%2Fv2FFO6xwt7DASEcednk2agfsZyYUmPJZ6vgHgaU%2FqaHU794I7ne25Z30qhWY08ffxEjHjeYyBb51%2BspZAMR%2FYw7nThsUlWdiLpZxyPUrQXcd11Iy2QQPkqUDOIIsPsnIjcvqv0RBULrw09X2iUscMQGD8cqeG3Z4z7Y%2B6UrLTMNagJGXoDfpFNmWHaEyk7lPTScQ4fs6kLTuk1SzdnhtVQoQZPbZ94Qa46%2FlkEzjRHZqR7TLiaedLSvMgJ9QwWr3h0Dd7Eyh3sACRnsXmvEjPfOg37Q30HKHC%2BAloWttvPiwNDppL8iwdJPvdmV7ds0L%2BIH9D196pwqHJSp9ZpNmr2SHWFZo3Wdidn5uUs4wwjl3fAXDtoWcgDkqIV5OML220s4GOqUBTpaVa3yGIILiScNpaEF5cuI5lafY94nHRwzxBFbOVSPI4z43wfHLHp5a9tYu1YhaVAhhPv5Odh3SycPLUFxLKiwrdpBUwGQzrFU3eOlDbGn%2FW6MQ2TkQuk4lx7zn8BuX7qgCAqX%2FJVH9vI3hjf6Viigd8wdvgxLSxil9xUB5Fyv94aMW4ia%2BYLxJuZx%2Bw%2FOOLrdb9OnUhjw%2FByqD7MS0EXc3D7kb&X-Amz-Signature=a6ae88bec451b6ff5db5df79dec4bcd273a9748514c2fbd6608601979e83b3c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGEU6SEG%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIA7b%2FvvVQBMOq0ZiC3hIILgSq%2FUxKPmY%2F7ZczUMAc1TmAiEA07AYV4%2BhvGa9qjkg%2BeGxbjaS%2B2%2FWPdnzzsocwQsCFdEqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCL%2BCYImUac9JDVBtCrcAx1dFPeYgDYW2gXHitBxEZ%2BsnoonSpwP0ba0aAfMgg98ogq%2FoWe9fqZDZq0YrR3dX%2BDN%2BGstEPe10QVzMkmnDJVJLrD8GmTD6%2FT1GuefafrjMtKqZtO5R4VzNK%2FLr61290bGEZTQDDDzPeMGS5zxvTlI%2BtCONYprttFeypDO1dmzshYn8aCTplWaT4HlFHENBHuJHBdIpO0LK86y4%2Fps7Zrsvej3%2BzDPlgoueZix7CpR6bKjv3tVdMD3lXX3VfWwTp5q5m1%2FxeQAAVIfk5tsCCZImlg9x9q4MfdpJuCE3yZr8kwU2uu6FsfakxME8Ro5HbzXDC52lELS6hm6n6hAhS%2BHw1Bn6TTmTTR8QccQbn40aD4alFQZJlVX6F2zt01O1wKmbsboSRdU1YJKezhNb%2BmQIZCC0JUddBZrVbsDuwXZ%2BLaKvqb%2FkxJSqhn2XnEKk5NB%2Bhk%2FnIT%2F9F5aRLhgb92a64gHZLb5V%2BxhFcHYs6l5ioSGhOtaJ3E8bwOmk%2F5GVWh56KkRdUA3o%2F5m53ctFgj0YTPLH4kmPNEv5O8hzQ8DFAEBXf5b8k1OlecwMDdYvVymSd7CR8719JJYfgcXhaCOFp9DHiTefxoJB5lrKygUqyVmeBPMMeg5%2BtXXMKC10s4GOqUBwZ9I2GgtsfF851%2FODPyhY54enN0RP63fVr%2FHulLbqBCbFNsBZf1EtrX1D2TsgnEcGw%2F93sMF76HnEM%2B5z1iX45PvXfhQtomm1KmOturNUELK0d0WyOwhHYbYreHSmCoypkO0Mm0VT9ptwyJ%2FPmUl%2BpQ2uBANvOSJoSWtMvhCN0Tg4uL7YmoZBx5d99tXCTaWSbZNTmbz8PlkTi0uwl3%2BGayiHLmi&X-Amz-Signature=6f8882006526ec2c71900612917eb54b152a5cd66cad78c75b3441afc0ce89e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGEU6SEG%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIA7b%2FvvVQBMOq0ZiC3hIILgSq%2FUxKPmY%2F7ZczUMAc1TmAiEA07AYV4%2BhvGa9qjkg%2BeGxbjaS%2B2%2FWPdnzzsocwQsCFdEqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCL%2BCYImUac9JDVBtCrcAx1dFPeYgDYW2gXHitBxEZ%2BsnoonSpwP0ba0aAfMgg98ogq%2FoWe9fqZDZq0YrR3dX%2BDN%2BGstEPe10QVzMkmnDJVJLrD8GmTD6%2FT1GuefafrjMtKqZtO5R4VzNK%2FLr61290bGEZTQDDDzPeMGS5zxvTlI%2BtCONYprttFeypDO1dmzshYn8aCTplWaT4HlFHENBHuJHBdIpO0LK86y4%2Fps7Zrsvej3%2BzDPlgoueZix7CpR6bKjv3tVdMD3lXX3VfWwTp5q5m1%2FxeQAAVIfk5tsCCZImlg9x9q4MfdpJuCE3yZr8kwU2uu6FsfakxME8Ro5HbzXDC52lELS6hm6n6hAhS%2BHw1Bn6TTmTTR8QccQbn40aD4alFQZJlVX6F2zt01O1wKmbsboSRdU1YJKezhNb%2BmQIZCC0JUddBZrVbsDuwXZ%2BLaKvqb%2FkxJSqhn2XnEKk5NB%2Bhk%2FnIT%2F9F5aRLhgb92a64gHZLb5V%2BxhFcHYs6l5ioSGhOtaJ3E8bwOmk%2F5GVWh56KkRdUA3o%2F5m53ctFgj0YTPLH4kmPNEv5O8hzQ8DFAEBXf5b8k1OlecwMDdYvVymSd7CR8719JJYfgcXhaCOFp9DHiTefxoJB5lrKygUqyVmeBPMMeg5%2BtXXMKC10s4GOqUBwZ9I2GgtsfF851%2FODPyhY54enN0RP63fVr%2FHulLbqBCbFNsBZf1EtrX1D2TsgnEcGw%2F93sMF76HnEM%2B5z1iX45PvXfhQtomm1KmOturNUELK0d0WyOwhHYbYreHSmCoypkO0Mm0VT9ptwyJ%2FPmUl%2BpQ2uBANvOSJoSWtMvhCN0Tg4uL7YmoZBx5d99tXCTaWSbZNTmbz8PlkTi0uwl3%2BGayiHLmi&X-Amz-Signature=6f8882006526ec2c71900612917eb54b152a5cd66cad78c75b3441afc0ce89e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6EYBH5I%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T061032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIFJd6hxwd2XI7rQs4njWqPzK%2B%2FX%2FpZSDajKY%2FHrqY4f%2BAiB0bGNfJw8yBDcCwKnuK%2FJdaTFpt6FkkHaMPy8T7V2j8yqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmcBDPzHDbF4lQEahKtwDoFyxFjQiZ00DWf%2F8A1FLTdqM34CnWUYHGsImr3DPHKRvEB30wAdbL3J3GRjT6zIQ2V5h2MpclXfcbUG9ZuHGU8wXCEcamEhHtJ246KCYiM%2F2cSJJNA8iEV1QSOMGcB8YxoxUyl1lLI0T9YoD8G7RQ6VknaNERgyjYfDfqu6TnEbZV5oxEzTbInr4tLfvmNA4VYohIvclJzmCN5yjlIvnh6soKZS39Z1RXvQnT8XXsLy7aTQg3pXo%2FkU1cnV%2BX2Z1Rw4dtszt%2BEOTucKApn6Pc8wvP7QOQ1bL%2FBb5Sw%2BcjocIix6RO5%2BzNrEN4jpLqcCL6jCo0ddzlj1TU8xjBA43WcFN%2B433gz0Zahg0pRZyTmiKEVOWLqJHzHyXXL%2Bd09Icm19p%2Fe3erm9KnztJy73RTTtieELEjgNuxIUozXBUGc3hkKSQFhxoRuzmklvOdQzePyfzUet7AuTjnuqzrNnpSHuMXyDpg6fVEd3awKBo92jQu0EUUDXxvUMcoae6i9GbFjpXtjN1koe389d02eq8JpJbbicmImpaOUUmhIBHEhZaB%2FsIel4y%2FGt31i2zrdfi%2Fn3gKN2WaLStF2eQvQYpsOmY%2Bjoa0vTYtfuYgTby4y2gVtsVweqsArdg1mswh7XSzgY6pgHfc0x6xOozSgf2Y3hhkFveQG0ppncLiqPmlGVT3D7Jri53m%2BePDnUkEik1c5Oc59JaS8e%2BqLykVxEAxWUMgZdmMIdCwnB0guhoYg5Zh%2FpUqwB7aNkjUgp6eM1gaMBDCUjbjvnGilFmsLpT5txHoCTnoOFjnKYOX8ErV3UhDWSWvZF0ShPe2K%2Ba6xoDa%2Bye5hylDR9C283m9E9NvH1QHHYZ219i%2Fe%2Fk&X-Amz-Signature=79a6b6f53c97f5dbe9fafd14bb1368df59d1039119379081ed3083d2b6b5b831&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DSHGDAM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCDYw8GqrnkENAIHkQnfdssXTGUpoj0dOWXBSain9PB8wIhAP4R%2FJi3ZIpyfgL%2FY20pwCX7mJNU5VMSvOvqLDmdQafqKv8DCBQQABoMNjM3NDIzMTgzODA1IgwLY%2FN3%2BYKQA02XWXUq3APe%2F91jQk0SYk%2BpjLHe8j8MDyvW9QP7fgmCoAG2K11ZBOy%2FPlkWairRi%2Fm7CkkSVG%2BKSgL99nza7wSEqynDyciQoY111Fv87w2QclvPIERxp4f2BRIwGLkLFO4XCz8p7WTvpgVLXKSg33ZVrWHeUT%2BP44wrYZ2h1A6kyGP5c1b%2F85AQVRjxs87JNwwJJciQpglU%2FtL3DDI64UmBm9duMKpWu0QuB5f6i4Q2h9zWRVF%2FLnLuNeM4buRvk5L6WAfLe01RaV1P5pD3yVFV2YPpxU8T1PeO0cy5GDlaGcJUYt%2BdVIxSskw2dCSo%2B%2BNV3HE%2Fwm2qPuH97AAyoYsdQfVSMSoy9CmbohgrqiuDEwGPaa6KoWe91pmJPHRyhPBq%2Fnxtz%2Bym9DCLmEn%2BMB8ewUfFkeMS962ohw72qjqOmGjS1FtM9UspzavinTr8gXQ5BBJuD2P6CNu6Oy6xLufwkAEp84OCaoctWZTqBYNrQKkF7LAV7A%2BA2eW7vYfo49bFNwVrR27DMc6Tiinknt9w7nqC5Ys%2FqQVps25m122lEcwTSsc7B5YXE0WgpgMfJJo7lTimt0hmchIwomoJmmHZv0PienShHbncJFr1%2FBFQwXQ9aYL0%2FmO7UgbHnSxLm6eW1zCBo7XNBjqkAZB1CEEsw0nP1Yp1QJyxxMuOd51vWZr1NV1u0CnqMolvok7irlXpzehrosQtRlKILbdaJhg22Ka2Vq3pj6mMiJVQ22HWwVZSBjrhe9TaZQe14iyJCxAEL2pUbriEd%2FkN4XK%2BJ9T%2F0rNRN89BHJdBKrauPIoGzI6rjD1AFxk4NEq9jgEIWDvtQ0gLaRsH7Kh5ALS1I%2FgqcqJHhhzJ8g2ywf%2F%2BGou4&X-Amz-Signature=03f00764a88b58a5c60d59b7ca15966296bacfdf46f526fb9c086edb2d6a0447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DSHGDAM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCDYw8GqrnkENAIHkQnfdssXTGUpoj0dOWXBSain9PB8wIhAP4R%2FJi3ZIpyfgL%2FY20pwCX7mJNU5VMSvOvqLDmdQafqKv8DCBQQABoMNjM3NDIzMTgzODA1IgwLY%2FN3%2BYKQA02XWXUq3APe%2F91jQk0SYk%2BpjLHe8j8MDyvW9QP7fgmCoAG2K11ZBOy%2FPlkWairRi%2Fm7CkkSVG%2BKSgL99nza7wSEqynDyciQoY111Fv87w2QclvPIERxp4f2BRIwGLkLFO4XCz8p7WTvpgVLXKSg33ZVrWHeUT%2BP44wrYZ2h1A6kyGP5c1b%2F85AQVRjxs87JNwwJJciQpglU%2FtL3DDI64UmBm9duMKpWu0QuB5f6i4Q2h9zWRVF%2FLnLuNeM4buRvk5L6WAfLe01RaV1P5pD3yVFV2YPpxU8T1PeO0cy5GDlaGcJUYt%2BdVIxSskw2dCSo%2B%2BNV3HE%2Fwm2qPuH97AAyoYsdQfVSMSoy9CmbohgrqiuDEwGPaa6KoWe91pmJPHRyhPBq%2Fnxtz%2Bym9DCLmEn%2BMB8ewUfFkeMS962ohw72qjqOmGjS1FtM9UspzavinTr8gXQ5BBJuD2P6CNu6Oy6xLufwkAEp84OCaoctWZTqBYNrQKkF7LAV7A%2BA2eW7vYfo49bFNwVrR27DMc6Tiinknt9w7nqC5Ys%2FqQVps25m122lEcwTSsc7B5YXE0WgpgMfJJo7lTimt0hmchIwomoJmmHZv0PienShHbncJFr1%2FBFQwXQ9aYL0%2FmO7UgbHnSxLm6eW1zCBo7XNBjqkAZB1CEEsw0nP1Yp1QJyxxMuOd51vWZr1NV1u0CnqMolvok7irlXpzehrosQtRlKILbdaJhg22Ka2Vq3pj6mMiJVQ22HWwVZSBjrhe9TaZQe14iyJCxAEL2pUbriEd%2FkN4XK%2BJ9T%2F0rNRN89BHJdBKrauPIoGzI6rjD1AFxk4NEq9jgEIWDvtQ0gLaRsH7Kh5ALS1I%2FgqcqJHhhzJ8g2ywf%2F%2BGou4&X-Amz-Signature=03f00764a88b58a5c60d59b7ca15966296bacfdf46f526fb9c086edb2d6a0447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFQ7C7ZR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIEvD37TfzYbCcJPeDB6Y2AGYrQnJr8mldvDOu0IMqszZAiB0TgGLleTqXexb%2BsreAVKKSujzRMMXNCRg9L%2Fpni8eEir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMYYqPNdTeYtHcFeUBKtwDhOzzku%2BejrPfcnMXg5ujnhd4jrtcyybzdPX3rdaPVdgwxqT%2BNT0Hd8MFS8F1x2AooLrSn9CG3hFGGI%2B3NcfEwKv4NBZuOp87EAmArr8x3fkYplJ7K9vTN7luC1VzAlYiHNHaJUGDW0Ib6Wx%2Br%2FNw8l354IvKqVD5exUiAJ%2FUFMXCl5%2Fi65nYo1mbzwF4SwdUbISQjWYAHI1RN5zYUwv3tJGAm2dEgrCCaVYvU%2BlGtXTxNZao%2B%2Fn0CkrrNVI2gJoajMCBXZFU47Z0b7RfppuKZoxTWd88G%2FrEzycxu%2Bm9GtSDMzStb%2FyJNcKnGbWUChkFlAdmn%2Fd6YsUDSVlLCgRb5UtohclvzwmEhKRNHQPyu72jvgYi7EPgByEvRsnqfuLUA6lRAmLsxW%2BWd%2B4VN5%2FCYrEgFbwoiC7nrCyAFT0Fk7R36qH3KkxXrtxciEjUpYmRwxAQEm%2F2DSGULzFtUl6dtbIYiPC%2Bas6g5U5otGBG2zrDfuzR44MkTYxqtPFMZJVGgIqkvQo06n2qGlMS26VEydSCwH%2BoVpfrX%2FStbnRm30LWvvr8SxB6%2BHBR6L0FucNbEdFlnFwjrbEOcVSGsHOavh7E2bVLEdv1pUBHYHvlSi12dYdOfPU1YnvRdXIwpKK1zQY6pgFlkHL%2BmIODQJYe3plTSGbESK6ltCgJzL%2Fe970Fo6S3c8rSZjkA3J96xap1DtKwXoywBU6nLPMtwVjYu9iye0ohlK50LQlAeAp%2F7x8aGU2lr1M4ivqmJ4c0MH9hQeno1ZGgBcQ2aDb0%2BRASQkd8j9rTbXyAdw4Qgir5luunO37Yk2mGkBC0vt0dBkBQJd6iuEpH%2BpIadvsKO2aOPLY79Sv4wTfSOoTu&X-Amz-Signature=c7a8234d08271c9f393b974afc213441cba70a76404e75638be20ee86f235dcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6RD52LL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCEJYvwtdtg51eZzJatXG9E4B7KYsYlXYHdZmgrjPg5RgIhAMDNV8SB4iDnC0CpI4p61OsyaZZrNYEQDlD8yfHBEgD6Kv8DCBQQABoMNjM3NDIzMTgzODA1Igy80BL%2FW4Hhk50LMDwq3AMTrWryIvDuruNRWfbwiL%2Be9SM44De4ftRDrffzzyDA4qbGNP2GMIjcrM%2FB9aFKWj3JYw32Vd%2BNAqoyU5AzdMSz9abvTLlD2BjgLyY9RlmZiPVX98fI3PD82fYXXfJV72BTCpAjKHWrPx7N3ZOPcdtWb2LAs3DkeXxllLrbngJixp%2Fdlhbj8jFLx0fkqZdvjz45X12bWbduWiahEDjR%2BROEcdeaJfQGLnPXAPPW0mYm81Skuf3CcYOwNQFThv580DyCZfC4BU2uP96VifQMr8yupRhQL7cBqfTPs0i9fJG8zDuWwKzPciPaj%2F%2BEfJjWElUI14d%2F2S0AryDlVgGszjd12BKWixcd8lH4E53vfZYa9kaChDGuw9Qo5WS3uE8HorC%2Bw8woXytSuQfOu35RMUWczkz0E45Eeo0tf8Yaf%2FS%2FjwnfF84DC77GYrQcD1%2FHPaV9bOzGaB42WQUd8OhUfwLx8bjCqyFw5jktQUCsSSV0i2%2BERcG2dUL40LVgg7HvvQIIsQN%2BVeD%2BvUGpR0MhOvxeSZlKLD9EMGb2SDf2qg2IUM0qlrX2qJl%2BjD7x%2BMbyirlKPP00aLjIKwqoJKnloTJK03E3NPusZvtZOoZ5vVSgCmon12ltK%2FGxBX%2BvTTDdorXNBjqkAbuGhDxWMriVK3ZNDfMXH8VuopiebDZ0zJ%2B5LBdr%2F6UCovNa5iYCsF0BF9zPz%2BnNhoU%2BUXzFyshtNCyH8gPEpI0aufs8VWVaYoW89p3cWEnyJLnyTOMllPVRJp%2FGjJBFnPl6XusVtJXp9oq0GqlTgGdjVhSVRPlSBnbG229XeOVQjahOCExvGjTemQ4egBTJIDltkF9XRE83Fgb3R1dNDx62Kam7&X-Amz-Signature=21743b41b7e8ec65f364d7db7dc71addb3b98de2a6d35f816bfd830be96bbd63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6RD52LL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCEJYvwtdtg51eZzJatXG9E4B7KYsYlXYHdZmgrjPg5RgIhAMDNV8SB4iDnC0CpI4p61OsyaZZrNYEQDlD8yfHBEgD6Kv8DCBQQABoMNjM3NDIzMTgzODA1Igy80BL%2FW4Hhk50LMDwq3AMTrWryIvDuruNRWfbwiL%2Be9SM44De4ftRDrffzzyDA4qbGNP2GMIjcrM%2FB9aFKWj3JYw32Vd%2BNAqoyU5AzdMSz9abvTLlD2BjgLyY9RlmZiPVX98fI3PD82fYXXfJV72BTCpAjKHWrPx7N3ZOPcdtWb2LAs3DkeXxllLrbngJixp%2Fdlhbj8jFLx0fkqZdvjz45X12bWbduWiahEDjR%2BROEcdeaJfQGLnPXAPPW0mYm81Skuf3CcYOwNQFThv580DyCZfC4BU2uP96VifQMr8yupRhQL7cBqfTPs0i9fJG8zDuWwKzPciPaj%2F%2BEfJjWElUI14d%2F2S0AryDlVgGszjd12BKWixcd8lH4E53vfZYa9kaChDGuw9Qo5WS3uE8HorC%2Bw8woXytSuQfOu35RMUWczkz0E45Eeo0tf8Yaf%2FS%2FjwnfF84DC77GYrQcD1%2FHPaV9bOzGaB42WQUd8OhUfwLx8bjCqyFw5jktQUCsSSV0i2%2BERcG2dUL40LVgg7HvvQIIsQN%2BVeD%2BvUGpR0MhOvxeSZlKLD9EMGb2SDf2qg2IUM0qlrX2qJl%2BjD7x%2BMbyirlKPP00aLjIKwqoJKnloTJK03E3NPusZvtZOoZ5vVSgCmon12ltK%2FGxBX%2BvTTDdorXNBjqkAbuGhDxWMriVK3ZNDfMXH8VuopiebDZ0zJ%2B5LBdr%2F6UCovNa5iYCsF0BF9zPz%2BnNhoU%2BUXzFyshtNCyH8gPEpI0aufs8VWVaYoW89p3cWEnyJLnyTOMllPVRJp%2FGjJBFnPl6XusVtJXp9oq0GqlTgGdjVhSVRPlSBnbG229XeOVQjahOCExvGjTemQ4egBTJIDltkF9XRE83Fgb3R1dNDx62Kam7&X-Amz-Signature=6e9868978d4ce7b55e93b9a7eea21c1739e1cca45a7431f1556737fefe641ef8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MOVQSGH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFiS8%2BAMfu7%2B8N%2F20lwMJGIV3fJ%2FrcNWpp3gofy7tNLCAiEA%2B6E%2B4Ku9%2B0UaOAhLAqsjeMKhzbrSjLNSJB0GIvYWGBoq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDHWkWqeOzYnxqWIcySrcA1jyM3LwfXlv%2Fj07trH6GW6MurssUfvCeIeYQHmi%2Fx0V6HDef7ZCtfcfA%2FTUhkkvrfH%2FCj12HCIW99o%2B1EtPMEV4ZOBXFckgCYHBeA8uDMhrya3nTkP%2BT1bs7J2N%2Bc3LRCSvyCF57v9goebqkxQWDoYUZPuzeWrxAJwKOrV7PPMwilGxCNigg4FF4UkgC%2Bsv%2BKtN1FfTd5x0j0i%2BEzK8cZ9u9k%2BHaQbHlVHbWORmAxqv0gR%2B9gxBQUCTcT3Bwi7DeEa6kKkFVbmSuJTnht8lXMmi5cRBwiLPhHLFp1qrbgdjL3kJTgg9XeSdZKy7PQgH%2FYst8iRV11Fme%2BFFV4kmOj%2F%2Fdcb0ZRPJ2evlO3KoVhScYYXU2USmfF%2FmBPD%2BBdBb8UZtCEKaWMCz2NEx8dUBm5sVP88j3loHCYW9pzafjy80Lrhl6h9RHufzDnm9nw4sX5lj8DN8pa2PX35W7VTqWoe1ijjbNwU4f38CpNWpcXVidIvTNFvgA8M8C4or8mR1hbQrkw1fk%2BqpA5PpmMksqrj5F5LVL7bTVa3QbKKWGV9MlzDL0iAF997OwwQ36olLeKtZO5F33uRRhkZ7k9gqFqv3JPUHquESMnDLM6LUQuUTIzpqJFrDlwsEyTcyMLqitc0GOqUBrby9W1p7xLYfaBor9aO3um3PlmMx8qtPqlnmq3jkpGQM7B1IkZL%2FeNpr6GL1JbIlLa6sIJ9ShVYzPcl%2Fk96i2uhDjB6VCNOU0p0R0fIMz9Cy5XetKEFTrAU%2BsJ5QV7Hnfy0rfz88tvQh2k5bYd27HXJiM4qf9HjRCLsfaBZbAqZn%2F%2B8s1HyaEtJ2vd38OVcsBRRwauVSGatM93%2BjaP6UTdWxtPRt&X-Amz-Signature=2aa9fefe9ef05f79083aae7482e1fd642ead281a91e26ff894375facf0c844bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRMNIESD%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQD6EJYbs8In0avylApKQeaLzgMVSH5TmLS7MnN%2B7NnJewIgHG%2FXjQTRKg6n83XeQHZjNXkkJneOIjClB1OgFGCwBAcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDHnkgM5a%2FZMqAWERkircAxE9BHP8QuWwM71qEXWWvzG0YieBdXUPy8MIe86FBHaj5BQ6M%2BbkBDsFd%2FVwgEYHY6WM5zBoqvdiT4EQVcZjuTs%2FQt4OKqwQnu3OiPj0WuD3ytkc4XlSw26lZiZ6P45RYPe1h5x8rQit%2B8tX6EJCEG7YlQlyAVbvFYO7zDYlc7P%2BK9hHrafHc%2FIdKZfJF1TiCQzefA3s4pskp5vqL2f%2FpoJRJewkHf7wxsQwQDtdOhu5Kg8OHyHyagYpUzvea36QzKXnUWyI7cl%2FpECsoJizQwy2gHI1IJJ946606tWGarC%2F%2F3rDv%2B1eNqmuDUnlX95v7ilblvQgDJobWR1i7s4rF%2BKu%2FmE%2Ba8PGPzINVN7vzC48m0cAqEF57ChgxZW4KLGSHa4hDVDnqA1tXO1%2BTSjKOgzhnM%2FMEZ%2FNaAW86N%2F6uWQprXqcgo2u%2B9TmNT%2FNN2sNhDWJkHt0MPL%2BTixiM3UK7XilLH4zUXI4RZKFSadnva8LRrQ6fDIV6fvRLkOO%2BnCalGNDPq6W77zD6C9q7xykjUpA2K2oR6OkNB2M6F88dFrN%2FmdbY0UcuoKIfG3QJOfrENZyBwqi32VeFEOOkUX%2BisSsI9yIU4x03hmnrafeVgajbDoqaeAznlqD%2Fb7oMKyitc0GOqUBf0Lxq4AJAbpWYiGYBUtlqt588XXhZi6rFM3J263TAFUs0mxKGE2zIOn744x%2FrojljjG3j6nXJP61dcQMhF4tYc2f2Pz4s3HC7AGpTAUFMxaeci5dyZF4x2t80R%2Bx%2BKoELp%2BsDFEDkHP%2FRgq0R8k4Af0rBtJN%2FKZn70ngWzPwdYCa31leYtdl5EJaf0eZakPpzyN9yVoS7zpFECIdUl4eaL2%2FH9l5&X-Amz-Signature=090b5391535601bf6f2d1d14d2cb9b4ecd59a4e4a7fa76e3cebd54db67b65663&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB7CWKVZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCODLjNnw%2Fj%2FpmeUFl1%2F2Bs616vW33dPCwWF3bMFl3FgQIgfhwXGTc18sIDKU%2BsRIng7b9OXgGToR5Tib60e%2Ft54l0q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPTP5C8hu9SAh4SHRyrcA6efqTsJfhSw6AF96WvVFp3uCdjBVUX8oHgrORrVGmdeC5qrGSpdlVEld5buSLgZbsIMEw8dFTHErl%2Fu58L82nXrpGpyYZcdUysGNruo1dIRhPU3aajTYOUyy232xUgZmekUsbIoI%2BCqoham67%2FCd%2Frz9l8LQdtI%2FhP3XKgcYEmwerh0mWinofQg%2BOWjbSKQrcpd24ATtPpKHBf43x3b6UBWmWjtvhsmdufjkYxMaoS7k9BfjZI8HeLiKqNvVC%2B0hNbpx8eEymxjywmjCgUW8H7sK%2FR%2B9QAXT0nMIcdz2Evjr1%2B7glVR%2FEIX%2By%2FmvGAjUeehA3JtJhhErNpmZVQr9VVuU2Vgegh2iH5ye3nOPbnlCsjN7jyDXeeBQ1UuzzhqFHbt2I%2Fp%2FRX3cBayR9sRsH3oTHm8WhSQ5Y%2F2lhBah7l6xIFZMwG4gZD59p52%2Frzis3R2DL3%2F3KFYMQ9qhTM2crL3cEeE7Th%2F8H8DaWdW3WTHGrQs0xGDCtADp4YTYyyG1871iV6IOTtYHj%2F8IBPNkc8Qvp9rvpt%2Fg%2BIP%2FCgMvK25V7It34Hu1pWH6QqqGV2eZbGgwShq2KZTi6Vj6QYBJutkCg3NCLGSBgB%2FBUwILxq2ehU9oscuWjveQQZRMNyitc0GOqUB1s8SmK8t6M4m9N%2FOz2eaml5fACQlJSNFFfHzV0ya13gF4RuI%2BstfY6MK2DOMXK6mZC5w8RRAYSMtx76H8k3MbyIMCDW5NsmMP%2BZVsJaK9eEP5Z3r9PlPUUkoMabHuuUZVMU7lqVfJi02fanf1vZO21nN5c1fpSTBHsRI6OYGho1wLFLxgBvJidfrIuRZk6e2GJIC%2FRiM9drSFCH4y4KOBP1aJTi1&X-Amz-Signature=90ffd009d7652acafa82565abf87fc75dfa0e472f40d2af65d6fdaf1f6418158&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRY25HA6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIAQxOYApYcUa96TYf%2Fyek3IHvnM2Mnw3Pe1CqeYkxZGMAiA%2Fl%2BiZmfmFse3c1KVDEcnCXV9NFpv3bI5Gk7NHMVydwyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM1j355ZebYdHbsecRKtwDv8U3rkudzCqRc4%2BVXYCcTlMm6kRAZa1M%2FZs%2F%2B2g0In3ZCWRx4QB8chiE%2Bghd1DT98WVeVgbP1rHPCB8q9DJ3AFZjlUDyXkT2gqvKTguiBYZD1cdV%2FwFzeta4qSAZzcsAdeC9VXGQ%2B7Vlw7%2B5ande%2Bpjup8mpUOFu0A1ps%2B14M6b%2FEiqyEENV%2FnBxAgc7kk102QkbiRPt5%2B4cX3ZjlfWz7okUToZhMhkLyL5lcKl0YE6nk0rLlqq9rEd4p42nBd%2Foi%2B5JdljJwUjnskliszOiCimwJh7BTFYXIHlmvuNaXhnIIluShLQ4e%2B3GXDhdX5FhbaZKvOBXPflL6pLtmUIdBHyTjUp6oFzDf7Pj4Fm90qY7QsXeaIfSTtZ9A%2F3GRAlaqdmGGgWwf%2F1bQVO83FUiv%2F2tSXxou7MPon%2Bmy2MisH7OiVNQzNxOkkZcXu2yuemKeZ3cslcYguwnfA%2FC2bwJKPpvgk%2Fw%2Fr1loiQVZESAgUPHs0e85bJa8Y%2FXhWsSWZLAgS%2Fl6jvQh4qOxXZgACPiRmkHPccZGjzSuZauVKTfWmWBsKqt9bYL5RqQu%2BFEKiqHzqkp%2B0SDMPQwXTscw61yqK1SlR1oqY2sZi23kjN1XQ7KMdW%2FEcbnJ%2FbEpWkw46G1zQY6pgEtDimyRmDHgZlbn6LQWjIvUuIUeIrr9LnfnGSAgNsFaiUluUkzqrzwYAx7GYXQJQw%2FliXQ397mik64SikA62T7dOy8%2FXPvYEHwaRRPiUDqLCjkg%2Boo4Zf%2Bw2ln%2FQQdXxoASIudNlrcYFaNKTHQct0B2mi9CWnVwOYvaKZt5rfkwO4GDa%2BVqTKWtS%2B2vdBsJGaNlnfY%2F5S%2FHqcGi4elayR7HfJugA9z&X-Amz-Signature=a319e2261479d89a49576d78a55011e4275fe50b25c8db029afff6e14c5f7adc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRY25HA6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIAQxOYApYcUa96TYf%2Fyek3IHvnM2Mnw3Pe1CqeYkxZGMAiA%2Fl%2BiZmfmFse3c1KVDEcnCXV9NFpv3bI5Gk7NHMVydwyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM1j355ZebYdHbsecRKtwDv8U3rkudzCqRc4%2BVXYCcTlMm6kRAZa1M%2FZs%2F%2B2g0In3ZCWRx4QB8chiE%2Bghd1DT98WVeVgbP1rHPCB8q9DJ3AFZjlUDyXkT2gqvKTguiBYZD1cdV%2FwFzeta4qSAZzcsAdeC9VXGQ%2B7Vlw7%2B5ande%2Bpjup8mpUOFu0A1ps%2B14M6b%2FEiqyEENV%2FnBxAgc7kk102QkbiRPt5%2B4cX3ZjlfWz7okUToZhMhkLyL5lcKl0YE6nk0rLlqq9rEd4p42nBd%2Foi%2B5JdljJwUjnskliszOiCimwJh7BTFYXIHlmvuNaXhnIIluShLQ4e%2B3GXDhdX5FhbaZKvOBXPflL6pLtmUIdBHyTjUp6oFzDf7Pj4Fm90qY7QsXeaIfSTtZ9A%2F3GRAlaqdmGGgWwf%2F1bQVO83FUiv%2F2tSXxou7MPon%2Bmy2MisH7OiVNQzNxOkkZcXu2yuemKeZ3cslcYguwnfA%2FC2bwJKPpvgk%2Fw%2Fr1loiQVZESAgUPHs0e85bJa8Y%2FXhWsSWZLAgS%2Fl6jvQh4qOxXZgACPiRmkHPccZGjzSuZauVKTfWmWBsKqt9bYL5RqQu%2BFEKiqHzqkp%2B0SDMPQwXTscw61yqK1SlR1oqY2sZi23kjN1XQ7KMdW%2FEcbnJ%2FbEpWkw46G1zQY6pgEtDimyRmDHgZlbn6LQWjIvUuIUeIrr9LnfnGSAgNsFaiUluUkzqrzwYAx7GYXQJQw%2FliXQ397mik64SikA62T7dOy8%2FXPvYEHwaRRPiUDqLCjkg%2Boo4Zf%2Bw2ln%2FQQdXxoASIudNlrcYFaNKTHQct0B2mi9CWnVwOYvaKZt5rfkwO4GDa%2BVqTKWtS%2B2vdBsJGaNlnfY%2F5S%2FHqcGi4elayR7HfJugA9z&X-Amz-Signature=ecf09bf3206de6f38ad062e30501fcacc444af54a6cfe91e966e7b6db7765fd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZBOXMNF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCeyPdMZ0GB3d0hBO5LMYnJQ9xDnqzpfcwQ%2BDNEy3HpewIhAJ6oBiALYlzKJuna7uU2WYeR8aKcr3XSxgfyY6t53tbTKv8DCBQQABoMNjM3NDIzMTgzODA1IgxzWW3O52jrwfu8G2sq3AMBsYkZXAQWmsY%2BowlzlgWgEiKDcX0WJ7OKTFiZOivGnDUD3Fp89Az3Ar%2Fbi9awvLF%2FFE5IM6YjNZfvGl9o6mYza0Quj%2FpTd9a0bsr%2F8IQeaMlxIwBAbe33cOopMTHq7zCaiAYKIzFs15%2FnPH%2F9JOy0hgV8ZEmOacU5qyDkO1Vo3H3IKvk2Gg03iQ%2FPTDVQofDrFMEsYkA9qr0eV2yFx7LQitd1bqgngnq4yYGpCaAyU%2FoiE08FtB7XIU9MN3tmoxyYO9Xhj%2Fo2w0w7eCJ9JR9VpOCtT0sajzdq6Ja7myVl%2B0Fw9FkQ5GUADnh4njFFxcn6zXDpy%2FpgwfBg9tSDpFXtYc6%2B9bKfpm%2BtjdLyLoF8M65Nc44p6D1eYjahMHmNPCHZPgsR0fTWrjbpFGi467Wh%2Bw%2BfBkxr67%2Fm%2FXpqLAgVTRu2Gjy1bCv5cwDGK4GC%2FtB8bH3xGqbVMEwjXHiMkTZmB%2B0%2FlOq%2BDWn2Eu6hi3dXuUQ%2Bn7lgcSXVByKbbPV7TXktq1mG98JnlweQ6koA33kAZXxS1FKBhPQWISVJMKVnONa3AEdVUMy8fkPOrAO3toerGNDOU9k9JlqcErnJS38hR9Q5UHSHe2K62ym%2F95aOm53x4dXkO6vcp0NZ7DCborXNBjqkAUBkhnrlyNE%2FyHC4LlR6AezI8sdWMbdW69bZGppTBh7otYOrli%2FJjldU2aufq06%2Fs8XKHTxp%2FBNNV9oDtf781FL6kIUIT2xL23rT8Dh%2BDq39U8%2BCPEYd6it4y%2FcsamxIMLwD6lPgrA11DxD3AfXGuFeFZluP71TQnJKAPy17Djzt9Hf2Y4gYpPAz4ffuDFfC85S4y8rKxxsLQRafTOmVQdT5eg0V&X-Amz-Signature=598a1e00c872b19726fba7eada83195fc17b219115a7192ca482e61820e2e7d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKCTHA2I%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDdkLGOaAOnqIJDHWOIOq6qI3FkopygC%2BtXNPfxI1DzSQIgPpWM7lT%2FAG1JDhGhjbD41h%2B6bj1SQ0BrE%2FZMGzQ7NG0q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDGPzyp39ZzVBcdlMUircA41f%2B%2FKF%2BDU5toNwezRum%2FOrirJ5teps%2BQBA9TDm6nvG86tf9TNs%2BvcZleqguCfF3YjrVro9BrMVLrLkWhNDshr%2B3jQPXjQ9ksIB3fthyPrSKn4wVlxqgoqjRxcuUkD%2FbIZ2T1Us5xTbF%2Buh8KAg8A1CNMOga0Ud9x0MpLdP1mWjEd35AJv6Vf6E9InCpXBbu65a5yzqSQOSKSoI18j1XYG5ZeSQwcUJvUZ0W%2Fwi4v0xDi%2FC4f15FQras4fO1CEuPajI%2BvzZPIn4Lx2%2BQGZNgJhE7ChQOncHMNpdSFHHOolux5fv6M0xjDznlWl8motvQmAoaQpo%2Bg4GdCYXe8HO0WvA%2FIQ4SF0qBuRAe0xsT6Zth4p3nMSjPgRPsYYYvo9zI21RGFhiP9BJoSJUHTUMoMhp%2BCrYfNvIUt5m%2BjNqLrN01o6EIFBpprNyNkAB5Ik6cZoExvm8Z%2FQHEBZD3qYtXQjKfuDnDWF6GyAPm4YevFJRZXkpqw2w%2FxbWAWrBQSZ2TJnAJ28W5y2%2Fbl0kANd259yvQ2NjtKHS0wmpMw%2BwUoGo57wMCuJ0IEXVVz8u4Ia9gCm1heVgIHVlrOl2q2FmEsflp1xaXlghJnUQj%2FyhYtWAJ933Q8eWYPTwCddSMKSitc0GOqUB5Az%2FZA1kxnYKq25UgousKN6bIBZPucV0Hu6IpJdX26hZqBR7gc%2FVdmQyReBnt2jRYYlSMu1PIkNduN1T5P8rmQs9mDku7%2BsxoR%2Bd5zjtjteZDiY6BnG8H0AByM0%2BcM8O9WG9oBmyRoAPNZtfDf%2FsycjYsU%2FaUp4eLFqjAqFxJGN3T6tAnD%2BJKdts2jsrY6gOFS%2B%2F950a5TNb8burMl5x8IzYmMe%2F&X-Amz-Signature=caa6d055a65fe1305e4a123b838bde154061561fa99ac3421839e584faa9a474&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKCTHA2I%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDdkLGOaAOnqIJDHWOIOq6qI3FkopygC%2BtXNPfxI1DzSQIgPpWM7lT%2FAG1JDhGhjbD41h%2B6bj1SQ0BrE%2FZMGzQ7NG0q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDGPzyp39ZzVBcdlMUircA41f%2B%2FKF%2BDU5toNwezRum%2FOrirJ5teps%2BQBA9TDm6nvG86tf9TNs%2BvcZleqguCfF3YjrVro9BrMVLrLkWhNDshr%2B3jQPXjQ9ksIB3fthyPrSKn4wVlxqgoqjRxcuUkD%2FbIZ2T1Us5xTbF%2Buh8KAg8A1CNMOga0Ud9x0MpLdP1mWjEd35AJv6Vf6E9InCpXBbu65a5yzqSQOSKSoI18j1XYG5ZeSQwcUJvUZ0W%2Fwi4v0xDi%2FC4f15FQras4fO1CEuPajI%2BvzZPIn4Lx2%2BQGZNgJhE7ChQOncHMNpdSFHHOolux5fv6M0xjDznlWl8motvQmAoaQpo%2Bg4GdCYXe8HO0WvA%2FIQ4SF0qBuRAe0xsT6Zth4p3nMSjPgRPsYYYvo9zI21RGFhiP9BJoSJUHTUMoMhp%2BCrYfNvIUt5m%2BjNqLrN01o6EIFBpprNyNkAB5Ik6cZoExvm8Z%2FQHEBZD3qYtXQjKfuDnDWF6GyAPm4YevFJRZXkpqw2w%2FxbWAWrBQSZ2TJnAJ28W5y2%2Fbl0kANd259yvQ2NjtKHS0wmpMw%2BwUoGo57wMCuJ0IEXVVz8u4Ia9gCm1heVgIHVlrOl2q2FmEsflp1xaXlghJnUQj%2FyhYtWAJ933Q8eWYPTwCddSMKSitc0GOqUB5Az%2FZA1kxnYKq25UgousKN6bIBZPucV0Hu6IpJdX26hZqBR7gc%2FVdmQyReBnt2jRYYlSMu1PIkNduN1T5P8rmQs9mDku7%2BsxoR%2Bd5zjtjteZDiY6BnG8H0AByM0%2BcM8O9WG9oBmyRoAPNZtfDf%2FsycjYsU%2FaUp4eLFqjAqFxJGN3T6tAnD%2BJKdts2jsrY6gOFS%2B%2F950a5TNb8burMl5x8IzYmMe%2F&X-Amz-Signature=caa6d055a65fe1305e4a123b838bde154061561fa99ac3421839e584faa9a474&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAEIWUCX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T120108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIBAt40KEGZeZAtDZxfA1T71lbtCD9XNQPPqBqomurddwAiEA2wM2p%2FYqrd3eQma7yXl1k87hGvs5CSYjglCw%2Bb9aXbwq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDKiCJSFUPzv5G6qQ6ircA5Wly%2Bf3LCkYrIijvI3QLKThUO4dm0vDo4b7kBXsoimrgo7gZyGjArjHF05WGdpjT%2B%2FQZsst0Dc4Rm8ri9bDRliLKxJdf0EwMcOvZp%2BdLkMcFI4%2BPgF43lqyRNvipohWEDfXCqAJdW5PGBdX528tCBU%2Fb%2B5warurbQRYV59Sg143Wh46g9KgWeJUHbLrmTdClUjW4icRN8XiC6PiL2J%2B3bPXHPWHQhibr%2BAVfbMm%2FwpxGX6%2F33XkQbbtlmf9MLaiYjNOCw4lCB%2BbZvpBFIExgC6m2Os%2FwkzQCSwcrEf0NqGNWP5maDMLKXIC0hNd5lBLSChtcN%2BYgxsxPvcLAmWIaGBR6%2BQMxu5OmrtCB754jqLiidSzwn8QgeiGxO%2FqPlnTOcTSs48uNPPMhWMCP%2BE3ZHqkL4gR3NtWiLQEnM2joC3G%2F8ku9hUq2nFdZ9yPHcwAotP3Mwq25hmH5WDHn%2F5k7RfpQzpM1G5OCMIJRluFn9NsHgM2P4NBo5j6BzGveC7QXTzcPr7CYbmGJEXvGZtnVWnV7KQcm8TmLyNfORGffFPaTXgXri5sVcw7x5w%2FRzAM%2BFoX%2F5Y4T6j%2BhHMn7JIioHB42r7EvZfbr3W1tYfWT3S6jnkZ3BLwWY%2BHMHGVMJaitc0GOqUBR4FWuPRWaI9PzPNoXQRNPbbmIbtnAYKx%2B%2FdHBeFSiCoyqrLJ%2FHTsk7M%2FXPDe8t38ULAj%2BH79r3fy6jTWddvNiAiyCOczYblFRc%2BCMms5kAofryHJcOU%2FSnrRZFWxrEo6GqcyBjm0%2BlRkIdbrciwYWars8ovvQ%2BfksifdA7mniY6uhW78NFuqnafh6GQO81ppordsuIfW9wnHcnDEFYfNIgtnnETa&X-Amz-Signature=c3ee12e26661d33065b707bf2ecf37f54ae108272e281fb09cec076c80ac13dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


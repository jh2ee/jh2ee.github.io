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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IR5V6HY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDJe%2F0eJI9SVeHOdq0HyZubo%2Fg5FFkHN92wpy1bWw1nZAiEAjPlFjewpHcJcWgGurYh%2Ft7jN2kbgiLobPLg7jenQbykqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAJieFHNxjTAg%2FQJ5ircA0EaMJWS9cLIPViEYB2lqwOu3mY6UmAlB8pGBhv5OpuADLa3EKbKwVN%2BCiWTvDtjlshn38%2BxFnQOKX5G41V%2B70BJzbc1pvqOskWD%2FlE6IH4KnaM0gYNBYx%2BvscXNodx6nWe9v313ia5do%2FMTQ1Nk2Zra2NzgJjV1xLiDAVDZOVZPZSc8b6T%2FDzpA%2BOfTq%2BRrecAXoAkLHpjGgECP4ct05YhEXNLRK60KoOoMhX4maTZOypwIzXrnxHKyyf0uanW0%2BsRhm4utQGD7Vn%2BiSfdWAFmWAE0IS%2FENUSElEmsjGG6grh%2Bhrwzm9mmqf7XP2wLMcMbwoMFlVTsWL0isIr7P5kS3xhxXgRQidhPfOcTZyQ1zqtJjSCJmJm9X3LFvNTcSCLzvj%2FZMs7vzT%2B3h4s3ZTtNDssfyxAPgZzVlY%2BhZtjuQPJgTkohbxAS3QfSciP1tqQhZGrvtzjhGV4vpMSb%2FpWHFWgziGY4IJFhswQ6opF0NeuPq3AfIG63zlKmdkohTBtlLKLQeC4bPXDSlHRuUnDGeu6p300lV1VtnfKLu2t0WSMAkv2jA%2BHQHBSdSd1tYr7MfcnQE1yQI6vX63ujmvAs9382KCD5kwLoUi7pqvEnY9Cyi7zG7wn%2BCjbhmMN%2BB0M0GOqUBXWPGf60kSfQ7OFH2PNl1UMGBMi5fAoIrT96R4IQVadOjT%2FoXrzHiIpELWsJV3Cjq0GV4Iyo8lxHiLkPtxt5xXodKchu33JknZt51hwwg6eaUte6PwHaDRd%2B98B9PiuIYn7rP3D79s9HEGR7c3g04Jxe1lpmLyt5Na7JdAfeagjr0XIBLBq44pLqK3pwyEn5WRURvkvpiZcjtEV6sFm6Gt7j4ddeQ&X-Amz-Signature=4565f5e5719341fc999e3fd297f630d0e645e26638f28fe91d7223d824c78dd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IR5V6HY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDJe%2F0eJI9SVeHOdq0HyZubo%2Fg5FFkHN92wpy1bWw1nZAiEAjPlFjewpHcJcWgGurYh%2Ft7jN2kbgiLobPLg7jenQbykqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAJieFHNxjTAg%2FQJ5ircA0EaMJWS9cLIPViEYB2lqwOu3mY6UmAlB8pGBhv5OpuADLa3EKbKwVN%2BCiWTvDtjlshn38%2BxFnQOKX5G41V%2B70BJzbc1pvqOskWD%2FlE6IH4KnaM0gYNBYx%2BvscXNodx6nWe9v313ia5do%2FMTQ1Nk2Zra2NzgJjV1xLiDAVDZOVZPZSc8b6T%2FDzpA%2BOfTq%2BRrecAXoAkLHpjGgECP4ct05YhEXNLRK60KoOoMhX4maTZOypwIzXrnxHKyyf0uanW0%2BsRhm4utQGD7Vn%2BiSfdWAFmWAE0IS%2FENUSElEmsjGG6grh%2Bhrwzm9mmqf7XP2wLMcMbwoMFlVTsWL0isIr7P5kS3xhxXgRQidhPfOcTZyQ1zqtJjSCJmJm9X3LFvNTcSCLzvj%2FZMs7vzT%2B3h4s3ZTtNDssfyxAPgZzVlY%2BhZtjuQPJgTkohbxAS3QfSciP1tqQhZGrvtzjhGV4vpMSb%2FpWHFWgziGY4IJFhswQ6opF0NeuPq3AfIG63zlKmdkohTBtlLKLQeC4bPXDSlHRuUnDGeu6p300lV1VtnfKLu2t0WSMAkv2jA%2BHQHBSdSd1tYr7MfcnQE1yQI6vX63ujmvAs9382KCD5kwLoUi7pqvEnY9Cyi7zG7wn%2BCjbhmMN%2BB0M0GOqUBXWPGf60kSfQ7OFH2PNl1UMGBMi5fAoIrT96R4IQVadOjT%2FoXrzHiIpELWsJV3Cjq0GV4Iyo8lxHiLkPtxt5xXodKchu33JknZt51hwwg6eaUte6PwHaDRd%2B98B9PiuIYn7rP3D79s9HEGR7c3g04Jxe1lpmLyt5Na7JdAfeagjr0XIBLBq44pLqK3pwyEn5WRURvkvpiZcjtEV6sFm6Gt7j4ddeQ&X-Amz-Signature=4565f5e5719341fc999e3fd297f630d0e645e26638f28fe91d7223d824c78dd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI2F62FH%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGBSE%2Fa82nMnGBgoqxIEzx18%2FwHRvpICqJQMi6wMWb6CAiEAxrhfBGA8D44VvUT03H9oGTHoPWWOhgejVH8q5BRxpz8qiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJQiHuf7L41%2BsCE8iyrcA%2B7rj095qnhENG5%2B8p0Rlsg2vPZjJ1MlAIu3NxGF5WDD4aD3vdH5DjLDzZvfYzr0u%2B%2FCYc7D%2FUYVp9cVcfFxvwvdFA3qVXpnN5FXd%2BuiWapqE%2FkS96ODh0CLf70xG9plrKjy5qfv8NqGOsB9aa3jogL7pNAc6c3loiZ3nwKbfOgqbuUgfFSwYX%2FX1yl3522eb7gtBg5G25rFSifZFkjfKmeneM6usLczAnft2ADAv0NN9WY2XVAkcnDH43mFE50fbckR3Jcyo9DjJTpcEjTd1WA4AiTSL7j4fBd0F5lR0PgYA%2Fik8rVl4m824rv9miA3azKWG%2BU%2BVcs0%2Br0Ei6w0MXX6w2DgYoiCuZpUwrraMCWYHPeumNB8VaPSNsRDRE5cGkdz8mtzUCT5VnyhvBGrqAB%2ByVNvqOcrHH5%2FopLW%2BljJraV6h%2FTxzm2lhSJL1L7XwxRxM5ot812CPBTXK0TeQOO0hu0ch%2FE0%2FXHMt2qjci%2FbmNzL7kvWQSjh%2FAcUjOQjKRUx4PyZpNl56tMWwAsMeEn8Xlin%2BNIMwX2x%2FFtPYUBFb05yMrRqve9BstRzWnZ1p%2FlQm3yeQGJ4uIQY4I1rsD2BMU31XcIcnQdR%2BLHHe30tRxb5EbUuJuhsHkMPMKmC0M0GOqUBmYqSBFVFh3Jincm9rIS4hTRT8miBFVwhOGU78NhTaqb%2Fuf6OkOLdqbjm2jWe2XMnc5jQWp%2Fh09OEBB%2FsuQM80oZFnhvPvEYURMXz3CsjAmY4Jd4sf2VhAzqaczPNVViWDJOrvQDLiBZYf%2BdUG91ruti1uF1yHSTNr052OsFpP0ZUUhk6bP7nokjwBGHxyrWO5VQhZfoC53N23an8OVI9S0OES%2FLV&X-Amz-Signature=112ca6300b877ba1eb64041a1c5a8a3a459a098e1a7885465ac9896f56aee549&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSRBA4BB%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC94x7iADxkvQjYoJVURGyl3q5byYju5KWx8qZtCKBWdwIgBkOOTiklgHp%2B5SHvc%2FRIIoCaEsWqcLcy0uow%2BNOu3lUqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDETUsHUZOQNK8263QyrcA5NRYGr3ItmTjOpMpMEQFWyJTD1EB7qGzcl%2BxhU%2BQaH45lD7oyo933OJWC%2B7fK2iXwAx0r64jbPp%2BqQWu8LpbbGahoX2v3XcUi9LjUDv6ieqPb5LdoCcDHokMpMM46MlsfFhU7RPW%2Bv8GxocIQL88RpVBGpJyn%2FNnHTXIbHL70DIN4ebqqfXOFxdkvGPv3cRyJLwPmsvHWtd5XQaoVdBNt4c5CNm17dNk%2FWBOnnlu%2Br7vmvu07XPNmuhpZGPDu3jfnZdl8b4FNT9JYcmVR13vQOQwrnhzr%2FUTADNIPsVaESZRMtzI4m3umxz9jtTNQAWORkB670y1ljSkCWYJ8zHVUjm721%2BVutfaWAsageQyrLmvEgT0EXbRR%2BXoTTSQdH%2BwdIYeI9jnUpJhlotnkpj%2BaX0rMOSkyGJq9wllrvRkKhZnYKpzdkW%2BKpAFNrWV3eC9uOl3ypOMGCVXyYu%2FrdEfye75PdtOXTkQWk5gXxExSj7YcDLDJl3mxyHEb6MPjZXBT9gZ44v%2F%2Fb1JJhfRZS%2FN2uGVed3m%2BuIbWSUYwjSjp5tofDkuumGt5uST1QM1G1GHH%2FaJQQ94FFfOzZzuZUXETXu9sFE1MvSXW9ojAJRhv4Ryk0yPrDms7Y2NfRzMJKD0M0GOqUBBaaxWibnZpA42NkeRCEujTXL3y6NDZjDPJ3JM3%2FMeZYKyOmafKoPDWWCcGICOapqtD%2FM1zgXEDB3ONRzyxY8ksube%2Fj8XI488KZyRDzLLkaT3LwM9IJX52RFjxgJ3U7ZFDI4wGVHSvVmN5XKsa1T9Cle0p1RTzf9tMVVafW3tjH4ZZC641UdL5gFU6EU4lC5qWHGqBg3EdaTdMhz1mX4wk%2FAxG%2Fc&X-Amz-Signature=ebcc7d384e581ecf55a4cb8d40f28162375a8a661cd22de146d16f0caf7d285f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSRBA4BB%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC94x7iADxkvQjYoJVURGyl3q5byYju5KWx8qZtCKBWdwIgBkOOTiklgHp%2B5SHvc%2FRIIoCaEsWqcLcy0uow%2BNOu3lUqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDETUsHUZOQNK8263QyrcA5NRYGr3ItmTjOpMpMEQFWyJTD1EB7qGzcl%2BxhU%2BQaH45lD7oyo933OJWC%2B7fK2iXwAx0r64jbPp%2BqQWu8LpbbGahoX2v3XcUi9LjUDv6ieqPb5LdoCcDHokMpMM46MlsfFhU7RPW%2Bv8GxocIQL88RpVBGpJyn%2FNnHTXIbHL70DIN4ebqqfXOFxdkvGPv3cRyJLwPmsvHWtd5XQaoVdBNt4c5CNm17dNk%2FWBOnnlu%2Br7vmvu07XPNmuhpZGPDu3jfnZdl8b4FNT9JYcmVR13vQOQwrnhzr%2FUTADNIPsVaESZRMtzI4m3umxz9jtTNQAWORkB670y1ljSkCWYJ8zHVUjm721%2BVutfaWAsageQyrLmvEgT0EXbRR%2BXoTTSQdH%2BwdIYeI9jnUpJhlotnkpj%2BaX0rMOSkyGJq9wllrvRkKhZnYKpzdkW%2BKpAFNrWV3eC9uOl3ypOMGCVXyYu%2FrdEfye75PdtOXTkQWk5gXxExSj7YcDLDJl3mxyHEb6MPjZXBT9gZ44v%2F%2Fb1JJhfRZS%2FN2uGVed3m%2BuIbWSUYwjSjp5tofDkuumGt5uST1QM1G1GHH%2FaJQQ94FFfOzZzuZUXETXu9sFE1MvSXW9ojAJRhv4Ryk0yPrDms7Y2NfRzMJKD0M0GOqUBBaaxWibnZpA42NkeRCEujTXL3y6NDZjDPJ3JM3%2FMeZYKyOmafKoPDWWCcGICOapqtD%2FM1zgXEDB3ONRzyxY8ksube%2Fj8XI488KZyRDzLLkaT3LwM9IJX52RFjxgJ3U7ZFDI4wGVHSvVmN5XKsa1T9Cle0p1RTzf9tMVVafW3tjH4ZZC641UdL5gFU6EU4lC5qWHGqBg3EdaTdMhz1mX4wk%2FAxG%2Fc&X-Amz-Signature=697b7ea0c5a67b2240e54d46705b2c318f5a2239070e2d0f369863aa7629c474&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HEZMUMM%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH3SHsFhkW%2B6E2UNSQnaHrX45COuOSsAbUDpdivPtxOqAiEAtvB5WCfgULNSMoQDiMeCPYJ4rCUM43a38TslKiEVlmIqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLolsjgzVCTWqLKDCSrcA%2FLvE6w3EEGUXnx0mbWTbti4zGTf08k3RMYJUJjDasuVAPg%2BGymZxE1SS5V8DBHyeIi8y21e5p%2B2G8OQ%2FEj4t8gZQh3eAWnpV6Uk3DKa5vSVYuBm%2B0TAZLXunjTztz%2Bu017RtOIJkovwG3vvWZJaonOUL7ngNZEETMFxToawqp24pirFi6lTsUN2vZpdtpLuqi%2BLRNXnn8D%2B%2B4qNF1g4q07cSdcyRAq11MHBqzw6bexLksghrKDeB9oiPvdOvRhY1BMgHQgAl4%2F0KzliwdoEO16%2FkkD5Y1U03YbUVZQZnoCJ9YuRHKGdeR1PuTEAjGTBMqVY%2F%2BiYtQLJrdP84oC8xnLQE%2BOrFNYUSkQLgBFkTSRwGEoPuTVwY51U9wRwKsKPd%2F%2FChOSXYk8ubMSVQbjnw9m0PvjGbOcEhFKsAoa6yfUEjKQRI5gmxFkEGCe70CI7V4Mt5Gj99wrjhin9SczMpImZME7GsWEBOQIKjmyt%2Fg1uOPPFlAi6VJquNVdXOrEKae1KQdz7zURgtSwOJEXtDJBUZdfK5mmP40xM4claEuJh0HOi73Kve7Rs15f%2FKLW%2BsTl%2Bah0XeiGlridslN%2BrhMByoidk%2BlKHUBPcw7TyBEWhGFyA51Zv1H3xGlenMNeB0M0GOqUBc4tIYZOQ%2FUx26t6VFUj1RdmlVTAf0dEhPfHXobhMchhXviCVvpnC4E5NncqZ2x1FDozsbQpnYHu%2FxRfrNgcoj42keXmiMkKv%2B3gTPg4bU7mVmt9H0YSm1HMCRo3psT%2BGCG6%2FXtOUufDI9pXqcSJiyPAJ8E13XtDNLdUXeWfaR3f55XeO3%2BTi0BgbewSxAuq9TFxzvmpoTcGe7x9zg%2FyU0GcWjbt6&X-Amz-Signature=8022cd222040cdea9b156972894499e668ca0e85e47b70bd6c612b1e6e3ed791&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EWU5FGJ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICt94Xjhki9fNE%2FrcFQapiaWjDG8YkGnLcytitynb%2FSxAiBoc%2FHovQ4BtYJQxALSsWk3pjdvKLtu7zgUYFdHgOESQiqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMw%2Betkd9ikAcJfXc6KtwDu6qOy1LzLTPGXhLDRosBoz21JrZmXWRCM9vZoM1s9WKvY%2Bl0NBsUiiBK64X1Rj%2FFtQt4sMutabc7B9AHPI0Jp0fSbbDnLzT1PoSagJPkU3%2BSo%2B9C5UVzlo1JEUpHaKIV4y%2B8rxpECC%2Fd7L9m%2Bj6nEqcnvKSbR%2BpwpLkYOvtSnfgMQoVBOAWIfH%2BlDLWERVO29h8x62n3jZ4HlAjb5Cte5ToJSPcfoRxXsbnv0YntQcckVKKXBLFVcJRyHuOf6njgL3JpSNsL5l6UnX%2Fs%2BIf8L8HhBnVzX%2FSFL3zqtD4BdWRvmqpMv3svFWNhzposh9nBpJGRl%2BzgPXCkOADvu3a64el4%2F5I1Xrw0tLAfjsFHI7VfbNFrMEgZzEbz%2BwQK2VZ7IqFTiX7lxesh5dqxEmpNqztfG3ie%2FFcCjnUMFDQ8x9FUv%2FW83IG95V%2BAlan76jt8DZcMAQ1tPCo9%2FzK%2FwZbaE94R9abc0YyivWrKu3GiIVpgwS9z5T5Jj4LYt9jIS%2F27zItfN1SG2cT7PIcKISe3zux1jlW2GF9dU6I1kk5AlRmWvACTuP7cG3TOEvhmLOqMtW0vh2ioSIMavWG6djnYtj1y4ESkuQBBFE6nab6Oph5KUjQs%2FC2%2FLhLfVVEw0YLQzQY6pgECp5cPWkhJefsb7r9dltiyNV8pv2EgWMWmYVdKiRK5C13kXW4UWFxfnKVhBxmNTQOCOu1Y5bFdw%2Bz82XtKmgLIIKb8%2FiPEA0Mb0nZdDYndmTkHsKRySv0pG4YCSEgghOrsWAjAfKTtcJWW0%2FTeBQo1nzzAgh2feKvZ%2Fp6VWjKKSdJTnYet4DXMZFPAPPCTOvhq612mFdOCz6O2%2BkeVN07S1k662kZV&X-Amz-Signature=4b007a17da3b7bb2a930bc9b11aee1c27333d0b91fa6e85dc2cd5925632b3270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662464KA4O%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZWQE0HRCZ769nLYzGvWTZZFeOUIl85lxVkGzfuTR4kAIhAOGcwomt5xI31vxelsb%2BFHHY%2F3A2AKv9qVyFq10ErNVuKogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwF4j77jhStM1NrZ2Mq3APSNqiMoD9ronsWScyB99Mxc%2FQ5y%2Bh5lsdREr7j24ZptjLqI9h3EWRqHNtuN6XPE9J5WccfLP1BayHnU21CIW4vgdol%2FHcVZQOetisy2yG8DuF4D2xJ4ARTDm62ARKiG%2FHYpeFUj%2FqABPsFioEhpV0X5pesWpngurxVLQ7nLxhBcdYQNA4Y%2Bw%2FrnNBicz7uwm937MSa4X34dTw5RB77BOFYs%2Fz5qaOn%2BF215b43vQaDiH7pKu84dpJI6UJHMPvOK06mCfyzF7t9Dvd2FKcBM7zNr3UB6%2BW1eJ3hyLMuy5NrkobO5qAkvT3QCs%2BSXr20PRRly%2BiU%2BobXfdpjndEs1lOvCOgGnmv1dNlx%2BKIYZyh28Ub0%2FVswGa0cYxjZvBzUxnmDpsjfiqbrdv4mep4bsQVx1TDzhqLq6LfeeFJO9ftGqag1P3rVZjkltCTQacmN0wmH3OGZQBYT05yXv%2BxmN9m8%2F8LHbm%2BuXccbiOKV5NWXyiKUokTNwGLdOFo89%2BePdL9EB8HbRbv1QWTYDy0vzdPRulUfBbnCYOb9oC5SRLsea97hj6rihK1bcJ7hOQxjBrKwV2ryjE%2Ftx8ODA7D5n5ArGXEgYven7j9m5RvYecz%2FGSCIr4E3Oe4wjgeftzCtgtDNBjqkAZuKx96lSIrknjTRcEyg5QcnkeOvPunY5jhSFKFT0nh3baGDlkRe6PBxKPVqy2mo9RNtP7FFWFGDWIi5lf6wV4F1SWPiKHHqx9E4IgzZwE81wWe1DS0PuHBLXlh%2Bz5RPhNPMx5ha6yR7%2F46T1ug7vFMUJ5fpG9%2BP%2BlqQ2YkBgEej8CNpNOuO78nTwtldk4WXZpcb1R0DZSJJZrC8lvyJaxKkNu7f&X-Amz-Signature=d34c4aca8d9a4bf9f79e4d791649590a84333014e9e42120b3585b1383f8573d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4YFGORY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8nMss7fZU7U4NJx7yL1BHpROZEs3ClwKuqE%2Bh1PBRHAiBJWIY4o1FjIlCTMzjahdnqmpc2G2wBEqlqDhdErcUoviqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsQ27IxFVPUOjCnt8KtwDXmq3dC7dXMh1WpyjBqdDh1TWiWg4NDr3WFreRIl6AT%2BopYQd2VkbUIRGeo%2FWIgT4063MHtPMxegOzj%2FueeX9Ld3FZE%2Fc1TRWLgAUqLUbid8iQy16oEOJ8ZptsBZkzKLJh3lXYr4UB7hVTxVOQGBCSV9uETU5k3vMS0VB4GTsLnD6V068%2BHkxqs4qDCAvfJPkCeurqmkDMGqim89hGURCuB2qmfzWD%2B5FLSAAZ5pWM%2FyCqFsCqubdar4fHPJumKVu1kXFOCj5ci2ae%2B2QW%2FQ6PDyQIOmi4uz1zHR5lfCfr9fG8jTHXqAtLj8DmWUzSOGFP9HmXTOJCHvjwNbxlk8o1riWLXpxc7FbWEt880RtFHVF26KxSv9gimVTzFlyxbYj3SpeSoP96ZpT0qwIwvHaPAETP3LpZhYTCblEN%2FAuS6TmpL6yqH6PwogptCsH%2FcFbyoP%2BNnEyTL5AVxVnnvPe0OsjCBZbyz9l0Az3Fr7t%2BauqvTCmLTZnsczDsrlO6cREz7IJ4Exj5rcHSRVF71WwcsojvchyQpfpcGW77aL%2B2C04fFynI4huhxtvLGm5UZL%2FMLzQSnXyqB0ku47gi7W1AnnsZ%2Bn8aERaAhGV66U6%2BuuDZu6IogEmOkALckww94HQzQY6pgH1Bm6Spnw6EdN89W9yazO%2ByjrbA%2ByugRrSOWfbPgbgi3IwmDwxqIWKRyaB3PrSPLyIzvNBNu82K1ZZ%2BFIusC0u%2BOTSvcAcNx2JffkhbWJAy3AsViHJbJZkdKzlx6lC8UwnX3OuOm5kla4vSNwqw2uS04eUkfqXrIqYo%2BwkJuZRTcFwj82OK6Xbs4yl5VLS8Enp0MAMqlG2poqc7K7T3xKIOcukpMZs&X-Amz-Signature=3797e80651f336a78cb7205430934072128a46440eb3c5691e9431afb4b558c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4YFGORY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8nMss7fZU7U4NJx7yL1BHpROZEs3ClwKuqE%2Bh1PBRHAiBJWIY4o1FjIlCTMzjahdnqmpc2G2wBEqlqDhdErcUoviqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsQ27IxFVPUOjCnt8KtwDXmq3dC7dXMh1WpyjBqdDh1TWiWg4NDr3WFreRIl6AT%2BopYQd2VkbUIRGeo%2FWIgT4063MHtPMxegOzj%2FueeX9Ld3FZE%2Fc1TRWLgAUqLUbid8iQy16oEOJ8ZptsBZkzKLJh3lXYr4UB7hVTxVOQGBCSV9uETU5k3vMS0VB4GTsLnD6V068%2BHkxqs4qDCAvfJPkCeurqmkDMGqim89hGURCuB2qmfzWD%2B5FLSAAZ5pWM%2FyCqFsCqubdar4fHPJumKVu1kXFOCj5ci2ae%2B2QW%2FQ6PDyQIOmi4uz1zHR5lfCfr9fG8jTHXqAtLj8DmWUzSOGFP9HmXTOJCHvjwNbxlk8o1riWLXpxc7FbWEt880RtFHVF26KxSv9gimVTzFlyxbYj3SpeSoP96ZpT0qwIwvHaPAETP3LpZhYTCblEN%2FAuS6TmpL6yqH6PwogptCsH%2FcFbyoP%2BNnEyTL5AVxVnnvPe0OsjCBZbyz9l0Az3Fr7t%2BauqvTCmLTZnsczDsrlO6cREz7IJ4Exj5rcHSRVF71WwcsojvchyQpfpcGW77aL%2B2C04fFynI4huhxtvLGm5UZL%2FMLzQSnXyqB0ku47gi7W1AnnsZ%2Bn8aERaAhGV66U6%2BuuDZu6IogEmOkALckww94HQzQY6pgH1Bm6Spnw6EdN89W9yazO%2ByjrbA%2ByugRrSOWfbPgbgi3IwmDwxqIWKRyaB3PrSPLyIzvNBNu82K1ZZ%2BFIusC0u%2BOTSvcAcNx2JffkhbWJAy3AsViHJbJZkdKzlx6lC8UwnX3OuOm5kla4vSNwqw2uS04eUkfqXrIqYo%2BwkJuZRTcFwj82OK6Xbs4yl5VLS8Enp0MAMqlG2poqc7K7T3xKIOcukpMZs&X-Amz-Signature=600a80751f679161f26fdac69bcdc41e053269822f233f06b33420be91006319&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTN6NWVJ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHl53QJeHzyMQGQDsX%2F0xP1WHqqy11Bo3OAjDSDqFX3EAiEAx6QMOau%2FCo5EIXRYoCtBczUxN4VQOYQHu5w9rOL2wU0qiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF34IeOcrCx0FCNaqyrcA3dzRrfut9OvL4UHqOCy%2BftZThTcPPGkOy9%2Bz3ZQsKG4V60Fzc83Fln2s3kzeFzmh9Cg8Yy5dLZ5QKnWqeM9asUn7RbGz4oQ7Z%2FvEaOyNvmdzTlwbkaNT8G4NuDrZDspnZMpYd2RVeIQeKnq3a0gY4CiRPwZEW0QBRqJAAnlX6JsTVVYkvRqXGgKh9ctkC5vuxLV7dsvO6uZU%2BY7GKFN%2BGOOr3vfX7F04O1Ysk9Cnl2KCtTJId0h3jzsdPHsRzNrWoG5ngW2LzvMcjfu%2BE1pl2T1tHwNE8VURzol%2BEcU8j7hMLNmsRq0e%2Fil2wdspHGnnsQW8ZcznBdmC8hGt9QkXRRsGJE5xuBuZkAC25SJe7FOwOBzlOUL6TNQStmLNhFwuEeoyRnv5orTcIgybGaTuLJq9PN15xFvVe%2Bs4mAn8v8ufv%2FdyMGbJXwv1DoZR0mbUDRyKJD%2FwN%2F6RmGiPEDkBgESZm2x%2BK9g67nDEcYd3YGbHH1f7TXdtu7f4JXet3tUYVmbLhEEE2TqVBKOuL3pPlTIeI8%2BCyqd9Ok0Scd81FRA3u3x%2FgOEAgzqVrHwtDILdbIVAsqPYpDC6eGsNJiPn5XPf3H3dnUcfBbhXmLcM4%2Bsz1WYvFBq9qFg%2Bo2HMMeB0M0GOqUBA04mOdZMliFJed0jMsgWmh1i0o67cEOwUq6scpl3WmRji%2FYTbslLZJeR%2BqyetqMq%2BtbN9%2F%2BduaTTc0f6tuDgVWKwm0qKA8wahBuSw67%2F9iB96Wo6VzkLmcAmJfg6sw5s%2FILLHGwz9erKDZKlzZp2wRGffIjiJbXxCrSIwjY6%2BuFcIE1P8It3v2icx77NgjKBIm7jlfIx70yE1bwzVDvnAT8%2Bd8cG&X-Amz-Signature=b67d8288ea4c7e401e168d7a6b7053f137811ab09904ae3fe2991c66a58ea524&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KEZI67T%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE0pkkTL4w2SADe%2BY4bt%2Fxeomfi0DSqcuIAedkGhD0fXAiEA3dc13zxgQvRMU6mWyRJW%2B1n1UqhdFIfP8sCK2sAWrMMqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ0fZ1KO2WDdJh5MLircA1KgCP7ozZTUkWysuT8%2FAQ%2Fn3PxwJs7Ea16zepnybovOgfoq7e5j2FsBZHAYv%2B0uhLB6kLJGCNbo89k0%2FXHFehd7z8KmTvWl1kjhxOF39tVdsZVrwc%2Ftyd8WuIiWWieCKoJnA%2F0xJvqleFEVUGx6084hAgjEW7MdmZADAiWIN7%2F2YwvYFiIYCFETeVzdDSiUwtbh84B3tOZzNZcnPQY9YwiCG4uVpuwGvtxKkDEtyNqwjvPfi3qfolrD52uDnSJ3B7kH7%2BVyPlGhFbQebZimB83EP8lXxpfGL0WXZDd%2Bf6NMQWHkWZ2%2FCRBHsuQFlQlEBtum9CUdASSam6nb5NlrcpOIV1AI5bF1f3FI3YPfdnuqoKClEiWIekWQ%2BVeaM1TUjNPHPPE22KdrRZBW0InbUqgalKIrOR7PNj%2BiHxwz7ktWhTYcPy%2FbzXQOLCM0zTLtMtpADQ4e%2ByTCPcls2PRUR5TRiFH1qJ7X1NDxX2Qws14t40iyxiLXLDALKmTyvpqKrCpGBscKPMi44mapoiLGo5p%2FmcGurO4TE9J9QA61ZUPkXM6mArGdghsyWUQ1%2FxziRiGC5MrjW0QGkcXT%2F63%2Fy371x87xnpBIpbuiVHDFd6L60ggz3dyIGJrxdoQxMLeC0M0GOqUBj7AxANgEwMSahB8XskTPMS87i%2BG9OD2jV3vSpKchteCqNxlshDYcYqjrpbB%2Fnza5LeDN2ZTEPehVfGQxcdBCXDdEcAgZ8tXzBK%2BKt5eZEknbaMjvbWqPNLl%2FVp273rXzXlJEnGU0a%2Fh5UF1cRUNzeBNYNTT2XWLPXXpRn4StSbYX72ZGuwe1tdqK0EYi5BYfs6KV44KFIK87hXG593QjoiDf8WoZ&X-Amz-Signature=8b43918c81dacc2342180003c1da87947f9389102060ad6d030458cc2066a247&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KEZI67T%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE0pkkTL4w2SADe%2BY4bt%2Fxeomfi0DSqcuIAedkGhD0fXAiEA3dc13zxgQvRMU6mWyRJW%2B1n1UqhdFIfP8sCK2sAWrMMqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ0fZ1KO2WDdJh5MLircA1KgCP7ozZTUkWysuT8%2FAQ%2Fn3PxwJs7Ea16zepnybovOgfoq7e5j2FsBZHAYv%2B0uhLB6kLJGCNbo89k0%2FXHFehd7z8KmTvWl1kjhxOF39tVdsZVrwc%2Ftyd8WuIiWWieCKoJnA%2F0xJvqleFEVUGx6084hAgjEW7MdmZADAiWIN7%2F2YwvYFiIYCFETeVzdDSiUwtbh84B3tOZzNZcnPQY9YwiCG4uVpuwGvtxKkDEtyNqwjvPfi3qfolrD52uDnSJ3B7kH7%2BVyPlGhFbQebZimB83EP8lXxpfGL0WXZDd%2Bf6NMQWHkWZ2%2FCRBHsuQFlQlEBtum9CUdASSam6nb5NlrcpOIV1AI5bF1f3FI3YPfdnuqoKClEiWIekWQ%2BVeaM1TUjNPHPPE22KdrRZBW0InbUqgalKIrOR7PNj%2BiHxwz7ktWhTYcPy%2FbzXQOLCM0zTLtMtpADQ4e%2ByTCPcls2PRUR5TRiFH1qJ7X1NDxX2Qws14t40iyxiLXLDALKmTyvpqKrCpGBscKPMi44mapoiLGo5p%2FmcGurO4TE9J9QA61ZUPkXM6mArGdghsyWUQ1%2FxziRiGC5MrjW0QGkcXT%2F63%2Fy371x87xnpBIpbuiVHDFd6L60ggz3dyIGJrxdoQxMLeC0M0GOqUBj7AxANgEwMSahB8XskTPMS87i%2BG9OD2jV3vSpKchteCqNxlshDYcYqjrpbB%2Fnza5LeDN2ZTEPehVfGQxcdBCXDdEcAgZ8tXzBK%2BKt5eZEknbaMjvbWqPNLl%2FVp273rXzXlJEnGU0a%2Fh5UF1cRUNzeBNYNTT2XWLPXXpRn4StSbYX72ZGuwe1tdqK0EYi5BYfs6KV44KFIK87hXG593QjoiDf8WoZ&X-Amz-Signature=8b43918c81dacc2342180003c1da87947f9389102060ad6d030458cc2066a247&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNW4KLNF%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T134943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHMwiIU5GPS843Bg4bKXVRxIOvNh8GeK1uvT01alKPjSAiBB7lD7hDTLdkpsiM2bZYuwf%2F6hOJqXwVg2ceRikWQuyiqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSXeqYgc8MCp%2FNhGaKtwDrAXI8XWAaAaak%2BUbOgQYlhS91%2F0Z0ahpR9T%2B%2FTXo9tepjS28k6shCb7aw0%2BUpXeasP6BVTflgBM54nXmW9fFaq959RpMFwDEVVAKHrB42R3fphWggHB8pohWbOk5s%2Bz%2BY4iTzadjIF5S%2B3TD5cqJafU2ExsactVRp5knKAdoNlECg3gLfOSBV%2BXB9x4HUkmvVR6rK1iBSt1BNClj34QXTeViT%2FFMJ5qdJ1Y7AnD7Q5caEZu0bJrUr5tvAxqu8w1dckfgSYEo6A4m4s7U8FFbGHP%2FLMdT4H39B%2B3WZ9ExG%2BPcwQsJ0mLbiKXliKsnqdxmKRln2KMFFLuTeTt7xzYNcbzSdhC7VAwKIQ%2FtDOmNxCAW3tD4BtwMlZqdu58DtMlT58dmaPK%2BmCkj6HURlcBmOie6D1IGBbosfklD7QYLgo0a%2BMxpPwS7IcYUAkwhef0tfQDDeHV881H7NpHX5pk04XHZFHUEAj1CZ2%2FvUq10yOWHnQcsxqfQ%2BcM4yKodBxHzCLxT2%2FD%2BRDlsV9fvTZYUj8qjCmzInOlSoXDajA7BDUY7xD8FrXtzMkQrZ0eGyMFncSTVefis8itohyXxAjMe9eA5jVxUDRy43fE2q99euHqtyXE9%2B8e9uYIH4e8w8oHQzQY6pgGa2hxx9HgtNuCF91SBijQNEen81Niij0s84lUVSHhBkYwkhzDjZti%2FtyDOA3FBRkh1CwePGfoVLP31KSeoS%2BBMkoI1vKZmcKy%2FoYQowwZ7gXA%2B4VTIpLYbiZw7ekXiDk5bmChnUwPpV8%2FbgRRRfcoRXfyb6xsqhP32ehC8GWJo3C%2BiPJFLrOWJkX51a51Lvcl%2BO2SF8lZSUiCfC89%2FVFKZ6H9i6CSM&X-Amz-Signature=c378ad311532343ecc1bcbd95fd6fdbe33a466ac941d42e5e4107652e1781492&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTMJRHEP%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGMt7GrdqpxSCuvZnM9%2Fkfk8C%2FacWjR8iSiQCqZnsFW5AiB5pMob%2BmCQLRE869f%2FtR0Y%2FZz6byZEMNGvj7dACdTynSr%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMzQ1uai2%2B8%2BIObyuHKtwDk8n6WBVnGsoTER0RNvSBa93DUze%2BTf1Ud7%2FyHyBPouYBnZnO%2BEoUgzdmB%2FzWhV%2FeHAJJpLnxkIq7jUqbV80W2fVVHuHE23SAA2etLUstfEgSMOmvgnxBEXeh8lpQnepuw7ib1PDdcu%2FTs%2BRPVAbKn0Wk46%2BtuWbMciWZyl27Zw2IWWNf90ssJmnJefk0h0CwUejUAngNFlHqhBSMjIXX3aAMUpDdIBXlLsFtfV%2BpWMRN25xbQ%2BQg2HZKU8HkfI4ez5HCkeZvnR%2Fg%2F9Rlr8ey1tMcomZIfVVt779ik4BPE0llRJ%2FXZrDnI64OIDkimZY5L8fWOVuJbOe5iYed09%2BmjZrLoSbqfanXOji21OjZSzeo0ckjcWAKFTyya%2BIdNZ9Px5d3%2FE%2FK4%2FxztgfuXTrhmwowv4frW99NCg1P%2FzcY0tvxl7f0BP%2FyaZUdh6KbLaYxkwO9ms7%2BFHaCA5%2BKhfvCQxKLvPpQdRNJoikDae64MBnNYuAfvI9c1L%2FCqhyIeE3BqNzSFy3t89jhnwfD6oMe%2BtbO%2FFr2rLbLypxc1kEpY4hXx%2FY8dVk0unVVpAF1e%2Bd5tjrRawmN1dHdE64mO4DtlRegXDrgiJEoSlKlGlOoR2yTaFjfxJewmjyf7vwwvszIzQY6pgG7NcysLWcjp4gNqzyUz2%2FNyukbanV3aWjoeN6MNX4rg5gt%2BihtuXMe7PwKMJz8ikLh0PP3%2BSwNMiQOCpeYhk2NQZ0u869j%2FMpTmXsAWGfoRtQSsYkr1lpo6P38UZq03mU8Gz4aBH85b6y0bX6vu%2FxEa1HZBQyEGPaYbvr1bY3ROnTo5XZ%2B5nD1XhbGtbu1U%2BLZvJghlgVKwGYmglkdz%2B3cpmGPSaav&X-Amz-Signature=96141bdebc7367ea0868cfb16f4101c181804920618f9f82d5cdc856954f83c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTMJRHEP%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGMt7GrdqpxSCuvZnM9%2Fkfk8C%2FacWjR8iSiQCqZnsFW5AiB5pMob%2BmCQLRE869f%2FtR0Y%2FZz6byZEMNGvj7dACdTynSr%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMzQ1uai2%2B8%2BIObyuHKtwDk8n6WBVnGsoTER0RNvSBa93DUze%2BTf1Ud7%2FyHyBPouYBnZnO%2BEoUgzdmB%2FzWhV%2FeHAJJpLnxkIq7jUqbV80W2fVVHuHE23SAA2etLUstfEgSMOmvgnxBEXeh8lpQnepuw7ib1PDdcu%2FTs%2BRPVAbKn0Wk46%2BtuWbMciWZyl27Zw2IWWNf90ssJmnJefk0h0CwUejUAngNFlHqhBSMjIXX3aAMUpDdIBXlLsFtfV%2BpWMRN25xbQ%2BQg2HZKU8HkfI4ez5HCkeZvnR%2Fg%2F9Rlr8ey1tMcomZIfVVt779ik4BPE0llRJ%2FXZrDnI64OIDkimZY5L8fWOVuJbOe5iYed09%2BmjZrLoSbqfanXOji21OjZSzeo0ckjcWAKFTyya%2BIdNZ9Px5d3%2FE%2FK4%2FxztgfuXTrhmwowv4frW99NCg1P%2FzcY0tvxl7f0BP%2FyaZUdh6KbLaYxkwO9ms7%2BFHaCA5%2BKhfvCQxKLvPpQdRNJoikDae64MBnNYuAfvI9c1L%2FCqhyIeE3BqNzSFy3t89jhnwfD6oMe%2BtbO%2FFr2rLbLypxc1kEpY4hXx%2FY8dVk0unVVpAF1e%2Bd5tjrRawmN1dHdE64mO4DtlRegXDrgiJEoSlKlGlOoR2yTaFjfxJewmjyf7vwwvszIzQY6pgG7NcysLWcjp4gNqzyUz2%2FNyukbanV3aWjoeN6MNX4rg5gt%2BihtuXMe7PwKMJz8ikLh0PP3%2BSwNMiQOCpeYhk2NQZ0u869j%2FMpTmXsAWGfoRtQSsYkr1lpo6P38UZq03mU8Gz4aBH85b6y0bX6vu%2FxEa1HZBQyEGPaYbvr1bY3ROnTo5XZ%2B5nD1XhbGtbu1U%2BLZvJghlgVKwGYmglkdz%2B3cpmGPSaav&X-Amz-Signature=96141bdebc7367ea0868cfb16f4101c181804920618f9f82d5cdc856954f83c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YVSP5L3%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG3W0%2FQ9RLvkICDx953uBoZQgVoRR%2FUEBXP8TmOUFFNsAiEAl%2F2LP0kSDDTzRMQkilH2jaTUU0PWZgNWRrnrvk2RhmMq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDJHiEoDLWl5%2B9b0TnCrcA8P40mYGcMXNGQ4pOnFw2f3NPOfMsbnxwYOBZkD%2B17AgB%2Fkbme90JKPLZonqeN8U%2BInW8cwBAj4wva2Vwy70FI4EqM6LMj4CBSPC7uj2SKNKk8Ti703Hth2WMFqY%2FFeYwIc%2BX01lxJy7wz32uMwR%2FEGICpuG%2BGlVc8wr%2FkmGEfkRf647IQ6n%2BMqD1MvzTKu34H%2B26NNLe9h%2FjDkuZGSx4XvYUCi6ar34%2BpZJsiYLBxa36dYeAQJs3hoM%2Bzi%2FHd6QTAsrrHuuRlivO66u4zF7NayJYo8bwzRINAD%2F8PA8oT4uYOa3y2kZKSeCERWkhpy8yDdGLKqAyRc2dlZDZ8wzHxuhrVaKdmUMfJNfhaHY5%2FPFzootcUGGl%2FyUq7ntorYppwjAJt54jweLFd4iPu968e%2FUha%2BcRQObMeYRnV1scxylpFkCvEsNZ%2FWeHPyyzs1DtQXYONVz1ghACPGPsxXJzXEtA%2FHFlsxpxjg5Xaj6GdI0eGjNtluzBEpFrj%2FWOF70MI4S7u8%2BOYIUdo%2FEiD7ciu6nCwIxaBBRi2uhH%2BK1Q52A3W%2FwX57p%2FE2CBp9riMr5884b5goQWBTKb0dU%2FwMmv8px4j7Jq47WbsjB%2FbnufaHpU%2Bfxi8ds1%2BPoS8qYMIjMyM0GOqUBLuatOlIyOip4%2BynSSAO9Gj39QChDaBke5SLYQGd6OIjHqscRY3je5bFQhyCjZJ44nxNm1zHu27AT0MyOxAJAmH%2FaHC9ZYTTY5c4BH8mOS4dRl9mwKHEJwiU%2FVXlJVWqVomB0WEqkU1DyYeDNZG47%2BztH%2BLPqgCHKvRDn8%2FZyk%2BcqzEVD9vaOqGw8cqaG05UmgQH3rFS%2FAV61Ir7hmzDYKL62Xj7i&X-Amz-Signature=ba31e1592025ca978540f1d3ccdcfcd6924f45703e6a72861b7d8fc2d3474278&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMLSFE7Z%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEA3lchb6dGWHNsGUEpP0hheuHlef9m%2B1fjfnMId8Q9uAiAMBINn16VkQicdRtMTk%2F%2FJkf9e0nukD3pUW1S1uhttair%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMDQvBQ1DIiR4q7uRdKtwDIES%2BolIGh11K%2BgEaYbcf%2FrIhkVK4dySD%2BA1X%2F60RITNX9hiS3FKcDYU6VqiWDHrki4PkNoIFhwWkMYl%2FGnPCiwYQXO7nMQPhR4jFWqBmipkfJDqtmRg5ikG0F09A67FoninYulWKfCCWu8aGFTqk7ONgdxay1TWS6kwQaxZ81Bn0cgVLUbD9SHm9950iEfNcwPpSBhgn%2FpBdbXrQz2EXUIpb5GWPVNLJgV5yQ7rzQJEUbZzoqR8qEeveqapSh7VomtkhohIz%2Bts9co6kDVz0QI%2FuuLITLoFL0VcI9tAPPKAAWNAD%2F%2Fp%2B0%2FRO19greY0o4SYejLOpeLougRRZw0eFms6jzpiYAKUvBEkPJV8D8StlSV%2BrGDTazhFoEzNIiFNfuTjgGq4RgXok5I718UTMorYMDp35SV%2FwBE4%2FJjYE%2Bo7t3tkh9acRNxY%2FhPHqNdiBeS5Piu3HG15MUdnPJDOQ17NTQT8e7iN2H8OWapTZUoDIM7aQ%2FPnISp205MRBW%2FBwp9Nh130HnBgOYYWgKEZP4CfSA2bWl7XPueFIijFC13Q4vvSNiJjOIWOc%2FEo9kPhPgSFLMrnNULL3Voyq0QnAJGPM39KMGqvg9hmkaCIyy2ebWdMDueiSMowIQAIw%2FMvIzQY6pgFbPrXqrJI6YNkdhMpXYJhFjgvqSwy1YoX%2BOvQSJi6V%2FemUKVBRvMWiCOjCFdnRMx%2Fg4i3TYIz%2Fc6N4Ddq%2B2okS%2BXd6FqmhoC4R2vioyJ%2FWF4TXoCMjmrsO6RU6YKCmTzuo38l54fYEex8o10M1lYyUbnxcaFwEr%2FbTVisvA6BymyIdsogZQ%2Bp%2Bvy7ybMCVWf9UHTUN0VXHCmqOAVO9mX1jzKIwAxVy&X-Amz-Signature=d06f4d8283e64fa1c86789b48a418a3775a8d4ef8f6bacbffbd27832905079ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMLSFE7Z%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEA3lchb6dGWHNsGUEpP0hheuHlef9m%2B1fjfnMId8Q9uAiAMBINn16VkQicdRtMTk%2F%2FJkf9e0nukD3pUW1S1uhttair%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMDQvBQ1DIiR4q7uRdKtwDIES%2BolIGh11K%2BgEaYbcf%2FrIhkVK4dySD%2BA1X%2F60RITNX9hiS3FKcDYU6VqiWDHrki4PkNoIFhwWkMYl%2FGnPCiwYQXO7nMQPhR4jFWqBmipkfJDqtmRg5ikG0F09A67FoninYulWKfCCWu8aGFTqk7ONgdxay1TWS6kwQaxZ81Bn0cgVLUbD9SHm9950iEfNcwPpSBhgn%2FpBdbXrQz2EXUIpb5GWPVNLJgV5yQ7rzQJEUbZzoqR8qEeveqapSh7VomtkhohIz%2Bts9co6kDVz0QI%2FuuLITLoFL0VcI9tAPPKAAWNAD%2F%2Fp%2B0%2FRO19greY0o4SYejLOpeLougRRZw0eFms6jzpiYAKUvBEkPJV8D8StlSV%2BrGDTazhFoEzNIiFNfuTjgGq4RgXok5I718UTMorYMDp35SV%2FwBE4%2FJjYE%2Bo7t3tkh9acRNxY%2FhPHqNdiBeS5Piu3HG15MUdnPJDOQ17NTQT8e7iN2H8OWapTZUoDIM7aQ%2FPnISp205MRBW%2FBwp9Nh130HnBgOYYWgKEZP4CfSA2bWl7XPueFIijFC13Q4vvSNiJjOIWOc%2FEo9kPhPgSFLMrnNULL3Voyq0QnAJGPM39KMGqvg9hmkaCIyy2ebWdMDueiSMowIQAIw%2FMvIzQY6pgFbPrXqrJI6YNkdhMpXYJhFjgvqSwy1YoX%2BOvQSJi6V%2FemUKVBRvMWiCOjCFdnRMx%2Fg4i3TYIz%2Fc6N4Ddq%2B2okS%2BXd6FqmhoC4R2vioyJ%2FWF4TXoCMjmrsO6RU6YKCmTzuo38l54fYEex8o10M1lYyUbnxcaFwEr%2FbTVisvA6BymyIdsogZQ%2Bp%2Bvy7ybMCVWf9UHTUN0VXHCmqOAVO9mX1jzKIwAxVy&X-Amz-Signature=3782e6bf9cdb4d83720e8e5c7d5870d292bb0ae5c1b05ee26e1548b84469218c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GL6E3UG%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8VCI4B6LQHfJoNdYUEOZy4lzojaYxMRThM0zjqJwQBgIgRmm1nEHyxsmnpkHxdIlrPEjvSvwGqVF23JyM4oayzV4q%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDHtSwCFTs4BD5SMR8yrcA2y3x5MLZu%2BNjCvY7J7T4fN94YxPdboKRp64xCd7xcDprGTsKjexH5Ml%2BHPEdLsqRLzj2NvTBsjNncp1kMWYGvIVsaTlJQQGfLLlouY07g9ehoBgjiLoHtx9NOFlkpV8mXTEGI9LQWzVZKx0%2Bdw2Hi44gqb2NZ3Tl92AgikL2pEqr73H2CkJ0xpKlaleAicqJrsh%2F%2FR3qTwRmHOyBEvV5d0drZaqxAidVVtZv6XmtZYsMHIjIzPdq3lbAP0Nwh55VUY1ZKqRkGpQ9YHtQZAWp5I0PJASjk1blJcW2mDjRBA6BQNmlG%2FZ1LYyC4WVjR%2FF44GtGXLIi2%2BgJWnlsUdj0PNLtWH6IK%2F8MMQoLkqAaVo2sLBhj6FED8Xfp8Zoj4wzd6jDi2c5YYsXBVwY3Pf7Rj1jITQ%2FDPzR74DxG4SLNu1t9uIaDtp10AMAe0z7dc9L%2B9pmU%2F4IjbJS2kbfAEfKFGCF61p%2BH%2Ft7trN%2FenG02uDFLKGgAVhVe1%2F6V5ekcB7u6s4GhQuGzhnm6e1e347DXLmuT0vpdpquqzyunLmmg2O4LB0GLgprK446wrqL2HEgkNlZMEnvsC2kz5VdqD7vIDx3Z7a1YuOgnEETVkpLgM0L7132typjSQMoMEWfMPbMyM0GOqUBtuoJF7Gl%2BqvL9gO9yfSYldO87uJyMBz4ouP4cIyo4MvQ0TvzAQQx48IU%2FfIGAC0f2%2F8inoZucke8Adszuam9nKDZVXnGLMr0BjZxlT6AHLanVmN7EB7htcwtx6Sgjte83t4lpTP5DDjBhiycxS2RQ%2FS7oVX%2FlVmoUF2o2mZYTFYh6Yu7xJy6tLD11gbkCE1CeLOMhhN7eIm9jX02FRvEVOwjG8HU&X-Amz-Signature=a64b3fb240048ae98adb598195aee8117d18b3f293ba04278ac0cd750e7e8372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4RE3DNS%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4UeoczxdO3%2FtO2VjoK86l9%2B%2BThNe9h2iwe03S3OL8bwIgHadtIpF5uCiiWdHNDMw%2BEtPOTk%2BeEBfkIWcw98NakvQq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDJJdCLshS9V9S7j0pCrcA9ug3c5ZRE%2FzQHyag1t6ZkdJ9I9jvKehfNvY3uTRdbKxI%2FrwcMb3N9rOAmZ%2BU8%2FcBfPdKL9iFeGKjvidBaEBtXd%2F5kQoGP%2BD%2BLP3CwD7msC4b3fnSO8pNRUSbxw9r0yFUexx5eOAScoHuZapdpYVhSymmFiA8GW2wHEDOtjaN4Got%2F8xvckRDhJnlu4N4gvpI%2FroZgJomdJx1VM7ZEgFPDH21CWnEw358ZWBdJMHmAls1W4WXIYDr1aRVlpYHCZBjDbQr3HVOKSpKwtoz4TPUCm3Tle0K29gnrc0SPh68dhnVitIuhnuY%2FDMDur9EA75TSOjm1rmocKmXAlWopzMMYcOztE6m0yB2%2BaLlTGFQcDMSNvvUUubA7Ct42Dnp4G9cKpmgzJOLyLEy4gv83yj8uVHwomK3q%2FAkC0TYuxFDaAtiEq8McHTHLg3%2BlixR6VW2UPE%2FEOEr0QtPb0A69i84H1Z2d8ad%2FcJY7LCSX11Uu%2BzEypzSaxbixjch2AkJxP5hnRX39GdSNzFpdcEi0BoU9I8yU4TsNnqQNM4%2B96DIJxFqfCm%2F6k2s5QedlQ8Z77LhRMABcxirvNccrI8lzbnpBwRlseLk2AHUgriPK90BzkG%2B%2B5WjDndAdwPTceaMMLMyM0GOqUBuWgsdDasoTXfOuJfOWXN36MAdc69jPkHud3j%2FiuMV2gbTM9m1vNTBVLAf3waSYF0WuGZYtnBx5Q2jb4FxxNjNmOnzs2SjEhx1YUgxN%2Fg%2FNK84NjBfPYd0jyANWX0elLum97i7iEUM3hgGZ8JiOPhlb%2FEgDB0vfXYX%2F1tpttJzFhGQ9AbCXlqAchqs03SXRSiDXj2AWkl1b2cNqioLc6FSDiRGIYo&X-Amz-Signature=6bdc111a62003ef84bfa029358002f872a092b0d143bfab80a47af18e58bc3f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SOWLRHW%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAZF7X%2B4AjtcLxRM5EgMc8IScDZMR5mfz1H2YeCCtccrAiA3u6lyaADJIRflMDW26GVReLkxtqp3ngb6O7dVAgc9air%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMY%2FIJZ%2BqBhtZJLdT3KtwDmjLTC62eZWqIz%2FMXIMKbDIHF3F0zWwqiVyR%2FXbUHc8UY84SRJTGKwr1EAV5GSAucKXhqrlc6GFAltGi%2FsU0qF9Mfi8t9UMP5hbsYx6eMkhMEFT1p2t8s5yFSLtvMp9gYNcmYduSsiEKoyy6m15qW8oguLtQbe1ThwVdwOxI0feSJ5Fo7bNAxT2HOB7BtB6eIDxYmzAidjOcRno4RZ4HnWjGGHu47c2dudOQgKEpy8Fk9l4bTsMg%2BlMVt49qjmwdXz2LL2t9eP0qtdQm5Uk94Lq%2ByLzCK68OJBdGSAlnioSZkFs6oCWnE6w87VVViYR3WvxWOzNNKWr04OQKedw7DVx6K29dMziefLmShp1dVbKLslBU%2BMlsPQ1Tg%2BfDEhNbOFmxfpLyqLlvU1cwoukod7zM6Bs8Fb%2Be%2FkWvpnxv8SKOq6A3w%2BTZTrinMJg7WzqRFcmp7S4zq%2Fe7R4a6oyslAAPrlXLa8eMRTE3Hr%2FR32RNvQajcIg6YDV2V7DkSZdDUriUtSUc1w6atsiAftEkQOjJuAJDpIcfPbmPwKAH3u%2F2fFiCkAdh4sW2z%2BQFlaiiIcz0QaxZzghhtv4NvMcHxfeHm7K9v7tBD6mFRUE3AnkZWhAWBLPxP9ynvG6mkwvMzIzQY6pgEidozptXUqkGmiKIJEudi9pZcxWo9MxnhNDgJnXJNkQfg0pHjhRxZiGTATLF7WOatB6hHuW6I0OHKujX%2B8uTQDTz9tDgXnA5vk6noGp1%2FoUJztw3ckYZFQDqo%2F%2FdYqXWeOFIopBYBaRvt%2BVMR%2BS4VlGSyNaq%2BMBeLwadkSXh00jbMHajuwIQvrp5ztaRL8E%2FCB2mdTd13QVDNWc3%2FT2H05%2BL%2BF1qnw&X-Amz-Signature=6d5c8e9bfd95595915ea6c6f5669665185b33768c3811a3b99199edbb3b91670&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PUZ5FKW%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCKY0c8UW8R1M0QLFNxTbx5VEuNocjj%2FFOZ%2B4BtsO2mDAIgVOBLEzNko%2B9WJ%2BLLuRVjrD5LwIa5hMJAX616vPTwmOYq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDBEbhBRaAvn1tiMk%2BSrcA4UQZ3IvV%2FmE6hwFNWovkNlRxsn6V7eTx09GSCoM%2BI3ldMh%2BpY5vESWcPn41%2BXbHCcQZ7QIhKLkZ9q%2B6dgqqAcetCSfAy7vcaHKw32JoamVgKTNVh7Dnmh4iRqpqekEvW7ZKQUtmbULlz0pHYUzDmz5aF4AHXMOp6f%2BUiG7HXwZaNJfZVMssp%2F3Lviwk35CctZK%2Fv2ddbNYTs6EI0MYGzQ4oDMBJY%2BFtVQY7mt7YPozDXolRSP2OqDyEODaFrKdlCnHPKycV7UudVx9tQFaFvOaJDm6vc%2FjDNoKs5G%2F3LvMtjKQLjY%2F7yp8%2F5hSdOtOB%2BUw7cv7%2B2dRKcdmkHBRvvsIlDlh1XlRBsg75twKSrs2Vf0p3VYYde3NhdCFq38MXHam7NKeNvDLlnATsixoq4ugQ3imdECymIj1J47HAHXYjnRCA%2FjvUuFFV18eYHLcQK6efeqBy7N%2BBbx%2FDAzIf6roRzNdiSuau3xRszHxwVnDx7gKBp6bX18CINkEges9Hgnp0MTPEwfvRXFB5xP3u9pYDt7UwbsVVV4HrRFOhGOTxEL%2Fo4eFlNE5BavWbBsaKt9T9DtPUlNwa1D7%2F7J6e2rhufDJ8kKpIDOEVq3cMi9A2L%2BXm9DwTDXg5bx5oMJ3NyM0GOqUBFOTpQzLXmRAzCh2ng3gEtAajJcpZ7QfLZwexPsh3d6TCWPXJAP07pe42S85SzhLeW%2BfHuhNle%2BTDuBmgcXgSv0p5g2oRThnwyjCwVdBliMx69M3BrZbUBDWXmprOGg9jgDVd7uJBDqkTgXkVyuXZHCJtr5F1tKPa0%2F%2Fz52I1Ks%2BOk6kb2jgoqgsdWFeb8VPixK8BngEPNNkZXP2nfatS1gTvTxri&X-Amz-Signature=cd70d4c83307ce9d8d13693b0fe1f5fb1ec3047b3bd3ef90e6da07a95d80b9bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PUZ5FKW%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCKY0c8UW8R1M0QLFNxTbx5VEuNocjj%2FFOZ%2B4BtsO2mDAIgVOBLEzNko%2B9WJ%2BLLuRVjrD5LwIa5hMJAX616vPTwmOYq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDBEbhBRaAvn1tiMk%2BSrcA4UQZ3IvV%2FmE6hwFNWovkNlRxsn6V7eTx09GSCoM%2BI3ldMh%2BpY5vESWcPn41%2BXbHCcQZ7QIhKLkZ9q%2B6dgqqAcetCSfAy7vcaHKw32JoamVgKTNVh7Dnmh4iRqpqekEvW7ZKQUtmbULlz0pHYUzDmz5aF4AHXMOp6f%2BUiG7HXwZaNJfZVMssp%2F3Lviwk35CctZK%2Fv2ddbNYTs6EI0MYGzQ4oDMBJY%2BFtVQY7mt7YPozDXolRSP2OqDyEODaFrKdlCnHPKycV7UudVx9tQFaFvOaJDm6vc%2FjDNoKs5G%2F3LvMtjKQLjY%2F7yp8%2F5hSdOtOB%2BUw7cv7%2B2dRKcdmkHBRvvsIlDlh1XlRBsg75twKSrs2Vf0p3VYYde3NhdCFq38MXHam7NKeNvDLlnATsixoq4ugQ3imdECymIj1J47HAHXYjnRCA%2FjvUuFFV18eYHLcQK6efeqBy7N%2BBbx%2FDAzIf6roRzNdiSuau3xRszHxwVnDx7gKBp6bX18CINkEges9Hgnp0MTPEwfvRXFB5xP3u9pYDt7UwbsVVV4HrRFOhGOTxEL%2Fo4eFlNE5BavWbBsaKt9T9DtPUlNwa1D7%2F7J6e2rhufDJ8kKpIDOEVq3cMi9A2L%2BXm9DwTDXg5bx5oMJ3NyM0GOqUBFOTpQzLXmRAzCh2ng3gEtAajJcpZ7QfLZwexPsh3d6TCWPXJAP07pe42S85SzhLeW%2BfHuhNle%2BTDuBmgcXgSv0p5g2oRThnwyjCwVdBliMx69M3BrZbUBDWXmprOGg9jgDVd7uJBDqkTgXkVyuXZHCJtr5F1tKPa0%2F%2Fz52I1Ks%2BOk6kb2jgoqgsdWFeb8VPixK8BngEPNNkZXP2nfatS1gTvTxri&X-Amz-Signature=1fbbe6ebe84482a360df7b9052e4fd77a6fc8cfbeb989456b016c577c0ed03b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTJ4XWJ6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCny4R8CKnDpZTCDczHCT4%2B6Yr8bVRzmnGS90MbTUwoXQIgElmH30K0ObvMIRfJ%2BsHQLpYPrzdgwWt%2Bu1%2FsjVWGaxAq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDEKSXfaFb4J%2B%2FB1QICrcAy1vCCQZCehLExffPAc3zdbEEW2xPmYomXhzZ%2FuYzE3bIweHlI1fuwyoWbKteW6M%2FABS8MT%2Bo%2BkqKYUjamu6CsxbYGU27f0BPCmQ87ZR08NA5GDtb4SiEQBUw5E%2BVORcIGf7muq48N2eo1pR34HyLnyNxLdiQqdq0hWkwPptu%2F%2FCW40sz%2BIwuEztWT2zEN1OTFjLbLEGr7Tq%2B5vb%2BzOrAGH%2F%2BsZuW7XHyt%2F%2FQVIBDtKOZnVltTBe0ImMVeKclnfyyAK7R4D15Wk9qaRmOQQxMIr8O6WLX4vIvS4UkenYO%2FEUf7%2Bc%2BCpuCArByC9gRV7wBUKk9d9tMNhcVCi8bwqEAiJIhqba9g7DS5pNA4l3bNZK2Dld5z4hLhjLOedahRyktvNlIGt6JrlafLNZxjXgttwQGXPbeZNxd21qBXDfrw2XLDi1M6NA8DgWGQInSa%2Fkk92XH%2BoIaTIDFs15qrg8tgwkHH1k7PvGtaxIbC6w%2B0CW2JnPTAnqbwSZG6w5ILNIsJrzG%2F2wkEuR4vfffuAg3lyN4SOMqnjC5DRkBg33U9zpd1K9vKomIApwyhD3A%2FWg9xH8xXuY2IY%2BfGaSFRfTvSsAR3mkcTMRTTKzcnJcYimcdpD4njy1ZpDWK3gYMNfLyM0GOqUBVj5jIIHgzhL6Vr5HJsbz3fp8UW4W7YG9d15Oo3CkoNH1td%2B%2BFGxLx1%2FKO6%2FbBU%2FVkRak1FkiNlA9h7k7MmcMGJZ%2BYl9t82l88hxPtjzwhGo7%2BIoxxq3Nl6TtihkxiliDHx%2FXqWOxmZC%2Fd1TdZJmOQ5nmhFR%2BC2cDkad%2FCAUgmo4adAmrIwvAnLptcmtAYxlVtvn%2FR3RxheDAlzfB9%2FdgXVYxp%2BOY&X-Amz-Signature=6c98934be8a8ffd74c9095b9f843f681b62f0168e68bcdb13f76e246263ec331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VICM5UV%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAfpm7U0mEdCNVzifYFVBSXwFRhrxSQvAkj07XG4R9J1AiEA%2B76lwq7JM2Brq3yR76qYLKDbw7xr3Uk9u9J36jevk4Qq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDH2kaaWw9FQZEa39yCrcAw3guRLU15A41bXjtgAj1m9hRg9LD2O9y6XDEMU8arboFs4z2bnaKg9XkODULPq%2FG1dplLrJrbCFWomeT%2FWyASC%2F561GVuN9ZOzzk6pyhKgwNxZRnIfQfGLs132HjyX5W%2BA2cPnvVAzy6bQaEzZMn6WKFrxY%2BAuwucQ%2F1fGU%2FGVpp2BWdWEhKsU6nv9TTZ0Tf8UcYr9q7DC%2BJsBoXERuVDw28DNtSQuFoQxsYAsyEElrFUHFdMrDCjevTa41vIvzNh%2BxqNAkxA6ng%2FqyNwYpolzNS%2FUhEOlsGuwAhnl%2BBc7lxFkgPZhcMf1q%2Fr4ZNSuw4yQt5nLvC23ugsWtSzdFdkVISrsAMysWPZA5%2BOU600146sXKsm1H2QhUVLI3pzI8kFTU91gkkUKNN7zbpCEyA3i%2By8diu49PbFQQb2XIUgKTrXGIw9yeguvM3Toi3L%2FASgCZcNcgV4KNWcx3OGlXy49olw4FOLpBSFteJ5SA%2BxB1SfA%2F7Lc9pDbSUpOEQP%2FSNp%2FQ%2F%2FgnqW1We28WEBpTbfjqLRqBxlsm99BWAsA6Vbvqp2Zh9K7WKYGCxSTfAB4XuZZdmQfP%2F2GtF3u4Htl93qyhm8zir3jSO0vF1BIcioysN3UMqlQIfClWbYX8MIbNyM0GOqUBvX9I9fl9qMRzfGVBQhk2ZAyYRh5dUYd5cTAVORSIVzf%2BYrnWgQjAfVsFOAkkDnBsvrZ1Dfwi9CbCBVTeqteAfODkX3CMljt%2FJI7q4lEpHYeqqs4Nv6BEbWBeX3yBpCReUf0hZVUWhAvTGYpyY2ouLF7nH4pz1PNUe067uLZ%2B62Twj5OnYryymjC83lHUY63KmTosRlRYKzQHtuSQx5Lp4yIxOXV1&X-Amz-Signature=feb04db207124d4b4acf8b313d8b856c87dff79681114d0bb6258e9d1af40708&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VICM5UV%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAfpm7U0mEdCNVzifYFVBSXwFRhrxSQvAkj07XG4R9J1AiEA%2B76lwq7JM2Brq3yR76qYLKDbw7xr3Uk9u9J36jevk4Qq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDH2kaaWw9FQZEa39yCrcAw3guRLU15A41bXjtgAj1m9hRg9LD2O9y6XDEMU8arboFs4z2bnaKg9XkODULPq%2FG1dplLrJrbCFWomeT%2FWyASC%2F561GVuN9ZOzzk6pyhKgwNxZRnIfQfGLs132HjyX5W%2BA2cPnvVAzy6bQaEzZMn6WKFrxY%2BAuwucQ%2F1fGU%2FGVpp2BWdWEhKsU6nv9TTZ0Tf8UcYr9q7DC%2BJsBoXERuVDw28DNtSQuFoQxsYAsyEElrFUHFdMrDCjevTa41vIvzNh%2BxqNAkxA6ng%2FqyNwYpolzNS%2FUhEOlsGuwAhnl%2BBc7lxFkgPZhcMf1q%2Fr4ZNSuw4yQt5nLvC23ugsWtSzdFdkVISrsAMysWPZA5%2BOU600146sXKsm1H2QhUVLI3pzI8kFTU91gkkUKNN7zbpCEyA3i%2By8diu49PbFQQb2XIUgKTrXGIw9yeguvM3Toi3L%2FASgCZcNcgV4KNWcx3OGlXy49olw4FOLpBSFteJ5SA%2BxB1SfA%2F7Lc9pDbSUpOEQP%2FSNp%2FQ%2F%2FgnqW1We28WEBpTbfjqLRqBxlsm99BWAsA6Vbvqp2Zh9K7WKYGCxSTfAB4XuZZdmQfP%2F2GtF3u4Htl93qyhm8zir3jSO0vF1BIcioysN3UMqlQIfClWbYX8MIbNyM0GOqUBvX9I9fl9qMRzfGVBQhk2ZAyYRh5dUYd5cTAVORSIVzf%2BYrnWgQjAfVsFOAkkDnBsvrZ1Dfwi9CbCBVTeqteAfODkX3CMljt%2FJI7q4lEpHYeqqs4Nv6BEbWBeX3yBpCReUf0hZVUWhAvTGYpyY2ouLF7nH4pz1PNUe067uLZ%2B62Twj5OnYryymjC83lHUY63KmTosRlRYKzQHtuSQx5Lp4yIxOXV1&X-Amz-Signature=feb04db207124d4b4acf8b313d8b856c87dff79681114d0bb6258e9d1af40708&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4IOOR4X%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T032546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID8UieoyUe3QO61z5JYq%2F1p8w2lH9VVQjdeEXiyiXl6eAiEAs9uY4w3ljnTCZn0pVP6JWV5JumLmygF%2BJ7sMAX69Eukq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDBL3SJK53lvMNE99RSrcA414ngAvg%2FB6tvw7cqG73Sws8sc9WoNCIvdsXj3cKFi31%2FlkUzcGpNk2c1uz2GWzIStAom006yY8QqsqEonhfiqPXkv3vMMAphUlbRSGxMqrCin8NyyYcGt9fKqhKHLro3IkQmbC88iKmPU296k21lQRomNmQTPjcdw%2B0usyjqIRH7mfsANBN1%2FugyH2qh4RaBbiK6A0ZFfjo84%2FewrG0FYudPovycxoLSRVPqVy6FEyMRr9ni31svI7YolmAuZsIaCQ3M4utXQpKQvcX4nzvZRY9S%2Fa3t0W3DD00c3FJDLobk6IwVYluvAE2qWhRx9ny7saJQ%2ByepBBGeYcDRjbSsKflofhW8gz2AIVBFJNbD1rGJuhbJEAJ1CcwhyQoShHI2YD0ZxwSNqXmqML6OiOMgrmQBzQFYSyii0in5Qq2UF%2BqsNsQYhARIas2y40QGwqp9swq9v8y%2F3veVsIlafjVzF0ONxBrP36CqtwuIVzLzFxu6wnWQYYnUk6G%2FA9v9K4txgpyK9Sw%2FfrbDobgX1v17QhydSpO5DUhV6J0CQYargZeYXnpjbeHpcR5RiZSLc%2BtCzVrns5Kg2xC1DMU%2B%2F%2FKqB2MgMAYVjRUVdtkWbLfAK7rDhZz5Sd1Yqj0a5wMNHNyM0GOqUBcvlJXfb1P0NnCcVRQl3K8khNmlWHTSVgkWYREhQbfBoyNNA%2FR6XIJJ77Ifp2PEcB6JYRDPdchOOavAqjFbotSelC9L3ejMdvvHcfLJz5DibPKtPhHCIIvmkRTl5X8fy8Rdn9j4TnUANRoqUioJ%2B6J88HvZ%2Bj76txCohbvh0b9a3R8YE9CPdMM2BlHav%2Ftyy8JYOhHxqIzd5V9yQAw2oZAJsT3wl8&X-Amz-Signature=bbc8f5796bbf034716f1711bdde395b7d49b4999724e4d91fe6ec41ff8685f07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


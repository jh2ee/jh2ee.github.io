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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663E2IZEIX%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQD6VoHsvSo5Nm%2Fr2lJU78VNJrLDVNsox5oqDw2nfaUZsAIgPJHV1DHBPwT8O9YCwMcNl9k1wvTypESfUYrwBVK3LXoq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDHN5HCWkfSSLsFgEoSrcAwb5%2B8GH6JOc7jR%2FiroHxD71yPD5KpsB6HMDATHWC31GFQRtimCStRErasHsmKslu64EMEfoOzwFgI2BUphFlVZefnMwwomq1gy0d%2BUeMjfyxsMKVt875F0JxIEGeznVQ23KMe75Ge6pDHayQKgZAN9HO3LD%2BDlWmdy11I5WcV%2BzBBJlumwGP6ooSRAmP%2BKZmXQWjhFbs6mhylkrHhCd4AAOYdmATZSvW1x5QIKouQDoFf%2BsbAxzuGrN5Sqlgp6w5zKjHFTj%2FDsvs2VbdhjMkSppdB7ZejMn1DYCjnA6vpMJriKb3Y%2BwEs%2Flna7P24hhnxNynoFzSRDcmNCLL89DdDsn%2B0Fd8I%2F%2BcrYI7VicHrhzxWwn5jztmoUDag6nNINA5ebnADP1e%2FqndRiQyDfd0A1I2C4zyF%2B0DyJGQ7De1gPVYnxyuALkyYE5HTa%2F8Pk3Mrv2uNpz9DCTH%2FcM7qYOp080CTezpjNPBtF1wGJ4%2B6a%2Bp%2Fxg%2FIwWiSsa2dXre%2FCvQawf7pvBSs5Z5UMnmqu0f6FLsXMkhfqENJ7aWIM4%2BkPfzLaq7sK5MCSqYHpHVnFVrW8HhGomPawB3AF75bkvrzwKJWLoyxDA%2FGXHKMb%2FS8uH8xiW0qo1jfD%2F3a1%2BMIeg38sGOqUBPwu%2FK%2Fm4yw5ioHDGkMG04vzNV9pScKiEd93g5thGS2yMW57k1veeGTaFr9FzlSCbZv03pX%2BWaadayKyf6zH1GFKW4XBWU%2BjLtspvVj9jRk9O7Y%2FWlr%2BtYolnr%2BuDcOXR1qYxqD9Tv%2FvgYnL03YHIfsa7nmp6JoH4Phg3a7jbIl%2B%2Be%2B0xBAw%2F6C9BulHToZNRRkQqGsH1FLECb%2F6VrAD3VkBL%2Fjub&X-Amz-Signature=3fa34b67040187f3dfd2406b01a04e2904c2763d172fe304616111c4cce975c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663E2IZEIX%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQD6VoHsvSo5Nm%2Fr2lJU78VNJrLDVNsox5oqDw2nfaUZsAIgPJHV1DHBPwT8O9YCwMcNl9k1wvTypESfUYrwBVK3LXoq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDHN5HCWkfSSLsFgEoSrcAwb5%2B8GH6JOc7jR%2FiroHxD71yPD5KpsB6HMDATHWC31GFQRtimCStRErasHsmKslu64EMEfoOzwFgI2BUphFlVZefnMwwomq1gy0d%2BUeMjfyxsMKVt875F0JxIEGeznVQ23KMe75Ge6pDHayQKgZAN9HO3LD%2BDlWmdy11I5WcV%2BzBBJlumwGP6ooSRAmP%2BKZmXQWjhFbs6mhylkrHhCd4AAOYdmATZSvW1x5QIKouQDoFf%2BsbAxzuGrN5Sqlgp6w5zKjHFTj%2FDsvs2VbdhjMkSppdB7ZejMn1DYCjnA6vpMJriKb3Y%2BwEs%2Flna7P24hhnxNynoFzSRDcmNCLL89DdDsn%2B0Fd8I%2F%2BcrYI7VicHrhzxWwn5jztmoUDag6nNINA5ebnADP1e%2FqndRiQyDfd0A1I2C4zyF%2B0DyJGQ7De1gPVYnxyuALkyYE5HTa%2F8Pk3Mrv2uNpz9DCTH%2FcM7qYOp080CTezpjNPBtF1wGJ4%2B6a%2Bp%2Fxg%2FIwWiSsa2dXre%2FCvQawf7pvBSs5Z5UMnmqu0f6FLsXMkhfqENJ7aWIM4%2BkPfzLaq7sK5MCSqYHpHVnFVrW8HhGomPawB3AF75bkvrzwKJWLoyxDA%2FGXHKMb%2FS8uH8xiW0qo1jfD%2F3a1%2BMIeg38sGOqUBPwu%2FK%2Fm4yw5ioHDGkMG04vzNV9pScKiEd93g5thGS2yMW57k1veeGTaFr9FzlSCbZv03pX%2BWaadayKyf6zH1GFKW4XBWU%2BjLtspvVj9jRk9O7Y%2FWlr%2BtYolnr%2BuDcOXR1qYxqD9Tv%2FvgYnL03YHIfsa7nmp6JoH4Phg3a7jbIl%2B%2Be%2B0xBAw%2F6C9BulHToZNRRkQqGsH1FLECb%2F6VrAD3VkBL%2Fjub&X-Amz-Signature=3fa34b67040187f3dfd2406b01a04e2904c2763d172fe304616111c4cce975c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4JXNEKN%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCvw%2BXd6wEdi89uB%2BR%2F28bS47IJjt9q5aGXx62XNhMX5wIhAP14WkIt%2BQRw0Sg4fW5kcdCxXoVKCwUtlp5UC8XIwH%2BNKv8DCEYQABoMNjM3NDIzMTgzODA1Igwm83XIoqY6j%2BLh9pYq3AM2Dg0bFkoCnLOO%2Blm0idEUVSFihAbd6pZGtNOhHVJQCYDdODWpztIHorUKD5yJ8gPKuCrW4KHL6niV7NhUgriGe5b7Zz%2FhmTPCSa0pId0sQGyu7pvcT3IrvIqAdr%2FDWHtMuZCeq5YkOTr4l2YiiypOHI4rq35KT3220M7N0UNkgpnQTe0guY8qLM%2FchV7pLh4KphRSxutPSzWi8DGMRg7yJ5dExVHFKtuieEnpzZ5FxqAK%2FsA3UTWt%2BGNDBZHTESEjE5l4rtTKxoIAPZpxsHt%2B18S%2FvqYE0G%2BKGn5U9lMi8JjdTDSxkHtJZOVhP%2FeSEnZAh9q2z7tCCpbrIEhzw89C8%2Fqh2Cv8Q3FnP4dfeuvK3m%2BaEP%2BkadWfA8oU%2BfFR%2B9%2B1wWl4oko5U8u4dux1w1FHOaUrr9J849w6qkmv6u71RDFz96mjtvOCsJ88ES7YwWGDcTsuxrxq09RkNjQWC3ir8B2GSlSfi9rYM%2BHo1Z8dB6bOBtH3K5nVRFBiignV7qVamI5DCVRN9J9LsBIU%2FaJvAfCUXcMiQMgCMTdAWcNg4M8fJ7Op01QFfEKRejV2G%2B4oMXjPaGEWFBhUC5mftI0p3lvhEcdvyiuC6qN0bMHel%2B5WuktEJ04P454CdzCtoN%2FLBjqkAV1CebYhW%2B%2BQWLZeys6TUCy60q47sFALsLzIqjJ%2B6A88ARpI2NRTAH355g9Wqt0dbrRYqGnY6UzBEnmozRvPjXEUVHsrhxONOGYCQxcgmn5HnCql5izgddi3m5C9vDCqsZ2%2FqDJ%2FnN2HXN4Dt9Q53NCI9sYfQ7fYfSTxdly5nddvOCTRtpz7bf2Mxb4Nb1eAVEbCjmGNpWrWBpWX7S5Eb6yWgdug&X-Amz-Signature=614c0621f3a775ac78e169e17256603eb59d08782617ebbaa23c47e79264ffb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPIUKDF6%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDw6IbZXDbMLinPI9GKqgUZoUOONz9lAybsFkq4DYB8nAIgZuhnaq1jiqw8HcFoQbUiPQjPCxQ3jwE0sbaDe7ZKWzsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDDhSLnX7ywxa424ZeircA0enw%2FD6N5i%2FIwMbV0mniPp%2BQowHIEyxcrbqolRtB8oNRPdLn0PcEFbEuTGVRFuYQ9RxUjbHXKoJGXHekGO%2BXiGQirqbxVAGXXVoaB7DWhCo99mriaeYtmjq7pCmGB9F4rfhb2qiSwChL7V%2B%2Fo%2BT%2FTxuhLuxe4kQgB%2FWASeKpkZ%2BDCwZPWi5sHygw5k3OYT7pkb1Q5P8DK4s0Z8QZ0GOuJFK%2F%2B4ZKe7xW5fXygYnzdK1AgJ1CrM3sLD7IOGqfTeNybSgO%2BfSoPkIDdZxUBtWZ2z6v0%2B5%2FKxLfmkADGKUwXtEw4x7nH5B5pth7y5PTGTg6B8cBVYjnYKjlwm4DCnihI8ha6ayg0OO5uLIfUR7%2BDejqT1P2k7pewKvZ7BfzfQka1Vv6NfN718KSM%2FcwHc7J2WBtLS0%2BrPN%2Flawz4O2N9j2ulg06RpWlSKQUbkDlOoJjP4H3b5dpr42XWYr5d3uA4qm61O4xA1x5pM22Ec9bWQ5nvo1gtGIBHYpdrWZWsitCgjtbvSHnHwUgDySuravP6OIEif2zIL6Nl21xnZW70JyDDh5rR4yPy9XPu7BUQF%2FfX3VVSBX%2BVWax5UdnyF1dO5yHyW1umidZ7suuVKF8irP4sktkA4rJz%2BBYL9oMLag38sGOqUBEZ8oB9%2BLttwxzNFRon%2FkKLJ8LjbqryPnwR3vUcWlf%2BAb8n3B5X1O8RjNWNENz3wssH9sqpc8bHnBOvGerucFup3%2BhQ6%2BRbkzh06PdPz7oUWOGZWIpk2%2FzSZnSfoDkA0txKqQg6Xqx9w66jSkjxerunFFZv7P4EHANd%2BwwHLOBEvNGoYYnm2rdEbvPlyI41oYr7NxsGF6vVmY0lGQhkQG2YrMJnOO&X-Amz-Signature=be633b42f063a9aa567f7590f24aef7d9ffb3387463dad2ac072b05b76630130&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPIUKDF6%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDw6IbZXDbMLinPI9GKqgUZoUOONz9lAybsFkq4DYB8nAIgZuhnaq1jiqw8HcFoQbUiPQjPCxQ3jwE0sbaDe7ZKWzsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDDhSLnX7ywxa424ZeircA0enw%2FD6N5i%2FIwMbV0mniPp%2BQowHIEyxcrbqolRtB8oNRPdLn0PcEFbEuTGVRFuYQ9RxUjbHXKoJGXHekGO%2BXiGQirqbxVAGXXVoaB7DWhCo99mriaeYtmjq7pCmGB9F4rfhb2qiSwChL7V%2B%2Fo%2BT%2FTxuhLuxe4kQgB%2FWASeKpkZ%2BDCwZPWi5sHygw5k3OYT7pkb1Q5P8DK4s0Z8QZ0GOuJFK%2F%2B4ZKe7xW5fXygYnzdK1AgJ1CrM3sLD7IOGqfTeNybSgO%2BfSoPkIDdZxUBtWZ2z6v0%2B5%2FKxLfmkADGKUwXtEw4x7nH5B5pth7y5PTGTg6B8cBVYjnYKjlwm4DCnihI8ha6ayg0OO5uLIfUR7%2BDejqT1P2k7pewKvZ7BfzfQka1Vv6NfN718KSM%2FcwHc7J2WBtLS0%2BrPN%2Flawz4O2N9j2ulg06RpWlSKQUbkDlOoJjP4H3b5dpr42XWYr5d3uA4qm61O4xA1x5pM22Ec9bWQ5nvo1gtGIBHYpdrWZWsitCgjtbvSHnHwUgDySuravP6OIEif2zIL6Nl21xnZW70JyDDh5rR4yPy9XPu7BUQF%2FfX3VVSBX%2BVWax5UdnyF1dO5yHyW1umidZ7suuVKF8irP4sktkA4rJz%2BBYL9oMLag38sGOqUBEZ8oB9%2BLttwxzNFRon%2FkKLJ8LjbqryPnwR3vUcWlf%2BAb8n3B5X1O8RjNWNENz3wssH9sqpc8bHnBOvGerucFup3%2BhQ6%2BRbkzh06PdPz7oUWOGZWIpk2%2FzSZnSfoDkA0txKqQg6Xqx9w66jSkjxerunFFZv7P4EHANd%2BwwHLOBEvNGoYYnm2rdEbvPlyI41oYr7NxsGF6vVmY0lGQhkQG2YrMJnOO&X-Amz-Signature=e14dfc25d2b76fb5ce22f6f15a977d29d4119641c595c8cb4a2d3854b64b7e49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAK2E6VX%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIGz45rquOT7y7aP44gptEFhtqMpujOefSdNL3szZBlbfAiEAp0r%2Bj7kz%2BcG9BieEqHso%2Fe8lJHRc%2FmBto2wym4IIcZ4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDFD7qqEAzMZt52zXPircA%2BOLDoGGCyA8FDT45shOyyM8iVbcRN4bEkm%2BbcSfCLCOIwutszAt2MJb3T38%2Fj0aheYkml2AlK0%2FMhjfC91WE%2B9FRxAhUIfEldfKCFWa%2Fbn%2FV7GFksNBADysA%2BIhpsLgyI8%2BfOM5CjK1h4aRMMKR2RfaLq2yXg%2FACfqPEAw%2Bei9zmsZSB5co9FLBF7Mp%2FNosztv4yGsBJgmikroeQHT3Eh0gtl46cVNhQ0IDXyG0rJxBQtViXNBm7A6RuEds%2FZ5%2F5nSjvY0A9eXcRFrn%2BoPXN1xRJiWDRLBvqssVE2bNvi7%2BhuE1Sg87bNJGJ%2BeCK%2BQ%2FMVbpDYF2zbMqPTkcpIviJzKNQlsKPMpaGx%2Bhmox116wyUT5JhmIZADW8FhOzwHNLpVvKy4VSRmcOJYBGZPxILow9J946N1ePtcrE7e2o4vcCxP6Ztrs6oY7JFM5F7jlqWkU6M%2Bk%2BOJgf9uvWQOcmSg5FY9Jatb4s5OrlAEaxNbCG4U9iFmW3kJS5j5qqYiq4NQFMxcedKN7DbXtqlda%2FNVBGJRdCRD9RBBX6S%2BwCT6CMMS3JfCGoHhiNxI2f29RdexoWLN5l1hEHYxWeCOWIK2gMmzQisDbCC2NSacDQLghw8C3SQPMqka%2F4RessMLSg38sGOqUBOi9KSq0nTGrU%2FUQzDueAkakjjrAspH%2F6CdDLlEqlykgYl1fUZuJj2Y6Xjx84ATCqAbM7ZME5tKzOM6ecqM27bx%2BDbMEsOj3KUEIlfR4fDcwmd7OPdxO8eGhLS8Kl625NxqVemr%2B%2Bu%2FyOH7g%2B921s3i9lUkAPMEU50FVtj3ImXGbnio5M%2BKMhuDwa%2FjQzDRHCROJszq9MoK8OgEVKYiUKKX%2BWDc%2FJ&X-Amz-Signature=1a96c97fddefdc5aa35addf4515b309da1619834a78434300d575e61d8850997&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WCR2MWO%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCj1yD1l7NLA7OkiO8FvsH5DJu3VJJ7%2FO5BqOMRqCXE1wIgCULzxzR%2F9L%2FE9l3nhGbBTg4x4NAnrcU37UMx9GaikuEq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDPqfrCUcBLQ11yHkwircA7YKUfdlx64gwKbAc27mib8UjmTmYdhLMTCfM0Nh%2FIT%2B9waLm2JYPm%2BRjc32wdhDUMgaHhC1eJKb8ZATwc3C8OkFeutX38%2BwlGgtarqZY868w3wzNKicxyttzziLk7fE95atSqklZqJCwABGdQQd%2FZOBbFi9gJTwIuYCWIca%2FdSa5GIjTsvhPecCGK7%2F26AYevdB%2Fw5sH9yo3xVYzUx5xqlr2mFIv0Llc2doqGpyqTX4eWLT%2B%2FsaldEsD6k910OF%2BrM3X8FTSQoaR8f9hPTkDfv3EyXmWsCJuiNhTHU58nWBzyKbyfgqdA7WlNyWvR5y6OpFFTge99sefvWRrlYpMnB0Ce1S%2FoDGLOJin0UyV%2B3aI38vjrBRK7IvY2WmQjYFbPYoDaXAg0bQmsFNeties1f%2Fgz4Rydpr6IsFn2FN9%2B%2B%2BeP%2B25gRtUoryXv1htotQE1FJmMd%2F6RNaUQUW0Pb%2FVuJ09rp4ZOsFjTYMglSjcWK9sSVNYxu0cI3kLpJWysB2WDJnpzuEd%2FbUKmZyuZN%2FbBcre9AhsqKQK1APyXSigxHMSHv5Asxj6tqBby%2BxZ1opRehV0x6Cbbb5qu2q9SwdEz0v7D8nUpKCROUQ8hPi%2Bw6d6hZ7d8zDQs2pfuDUMNmg38sGOqUByKTIi%2BrNPR%2Bt6nWDNLO2CRrO16ebh5A5mJGufdtS1UxZKyVFcjcKw1kf3pq%2Bnq3XeznoKlPHD9T6mCnawuwUd%2F0pX3f4zVz2iVzbg6xog6i3RPyWL%2F1wOLIan4%2FKuk2Fr%2BBNUwhdxWjx1IOe%2BmJeQeaUktuwhwTqOFTu2YWsuiyCY%2F9EJRdS6ZMz14QcdWtjxNouC8OtuiBBdD%2FZinZV%2BaGuwNax&X-Amz-Signature=d292bcb47bd59deb7ebf70badf412e62af9495a4b8f6aacc012e553beb44827e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622LAYSGD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDobQYAq%2FeFa1xbqar0IJb12tsoRJ8jSQ5Z%2FXzVJFoLfwIgd%2BMUs40R50kFCBq7GPCe%2BuLULVtM1NVFKbYNdI7z1Zoq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDG%2FGlY8166%2FwAVCNrSrcA7sMy%2FvpOQhz4Hs1x%2BSJe2KOi%2FhWKPyWks6AR7iBy%2F1xMF%2B%2F7yOpHF%2BzEwBITuVJ%2BzasqRFeiWKEAoMln0HyOPpztjMp0v3ebVEWkcXDwk6gj0wVja0%2F7LrVXhs0oM0bu8Me9dls%2BgaRWZvPtP%2Fi7zL2x1RoXEQ8hXn6xbI9lyjBzZuWSnCF8vIBoWn2vU7LKjXvX3R4dLJsqzDQg2ueXX7shJu6upV5AKoKOKNZGMAXDQXAiHuOIrR9r3yr%2BPbjoyqWS4qKGxMCrDDIxkNS4ih9VE1t0V%2ByHnsJjhtlVV0NO3gHI2CWd49IHAQIHGqS3CktY71ZhC2iofmlCQUSbmL1vkT4TUmXL31m6KUb7f%2FLdx%2FgeQzVhz1Ox1gbHG90cN60cYFQ5PxMCps%2FMc6ouUJS1FMSzdswc6oxQ01odpxl7RXp5W7mn3CZv%2F0imVoz7%2BuZHw9cUhwyy8hQ%2BE6fAKfw4Ta5ebQYRz3FPWikqx6htZVRBXj7BY6QRuQQWRFimB%2FPXuJ2AaUfZY6SQ6NYW6o4zA9BhKadNk0RVpkROiQ0Wb5DNe0fwCY889ZXGdLJN8KU8dB9vSRcYlg4XoSztO%2BWpC5p9x2StNwz19At5ko6YFUbxOaclzrYGfWjMK6g38sGOqUBDTkL%2F6F5jsJOX5XIceEpCxOCQPJ1SZKv2p%2BhLLDsv7FAuyu2CFxWXYJCK4HpqiuQDzuPDYqgnoDffMoshQV17lijhWLR3nF2UW0cHuIPD1BktZlrniqFb1fnMzWnzYvqZelHVxV%2BLjVtw8D4cCtzF1PYE5d%2BozqM1mu8uz%2Bqk5GiMttmJ8NlXWkJU0O%2Bw6tsHi9pQt0%2BhLDZ8L8Wry8JemuyFKlf&X-Amz-Signature=9a107bb4c0efa66b1123a86349006623d0793d8c6aaf9797c33f54723e0aca6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPMYJBVY%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCJnuXEt3xlY8%2Ff1RTTHzRjXR7HhReh2d66Wd8eOM%2BIBwIhAOnRjrcpcS1wVNxf3NINuK6oi6MzaGGA9MzPHwKMbNPOKv8DCEYQABoMNjM3NDIzMTgzODA1IgwUXsYte%2BwuLDCHUMMq3AOuVupt3NqrSzt%2BmKomqcrgJq7y28Olx%2FlsPrC%2BXMgAyQ%2BrTqvB%2F80PlmUxMJT1x6Pz3Pg2UEc1nKM2mvqG7UgxflI%2B6AaC0QXmXVyqetD6Rd%2FzuMozwuEnPstpoFQFQJXzaWUMxU0R6S5p6PF4%2BezD3Gg7y%2FvqJ1Z0csfo3e6BlOAAkHGCCppU%2FpFq%2F7pyrcRD5WmOBsaCmI84bsw0bzvsUIWpFIuSZv4AundTa4T8wcpPrjqMSIZ7O1EljRFIj2TVjA5UnPQLhjvHE28qP%2FeMFrit2RBqezDLPajQ0vktfYyB%2BV5HsDq4ZcQeZ6QZc5LZNV%2B%2FRb5wnJeTew50uVL1vQYqKZs2hmv%2BM%2F4yw4hnkh%2FgSxpdKWTtpKi7trft6R%2Fs0bQro8gcf4fFhA%2B%2BRZbF12I8crczvOWFhXLgl1vdU4hIBKCjAoAcuglx8M4RSY1OXD1gm9sC5o2dSej%2FVVaOSKJdVpZSvjmD%2B0cpcrOqDQKIAFmXcu0IK3Nqc0r4amh6KPv3NTORizRalzST9WDc7XJiT83gCRGJSiSGsPFjG24StOxF5%2FuJO8MTX%2BfSTUKcTy39vigA3Nd5NAT%2BeMFr1X9pOsX30kcqlg2DT7lI5C00%2BRONji2pCq3qvzCQoN%2FLBjqkAU38Rhn3XrUdzMUA41%2F1gnX9agJ1cjvdGsZwqDs1XUNW4LgTuqaH%2Fl9zvoi9G2JchrSzDfx%2FG0DVVuDLv%2F4CLsdgqHSVs%2B%2FbXulpRQ3%2Frw7gLlqoYSw8xzQOebD60xw7w1y1cYylbX8d6z0pusW94koR5V%2B3xNOuaD4%2FP2FAf1dK%2F3RnENwVZ7Q55aXzK6NTlyitCrzlNg%2BuqpDBNUQrrVlo5d6h&X-Amz-Signature=f88aacad265d4231ae9157d19b4a49e60e649918dc1f1ab9db7eea4634124a5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPMYJBVY%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCJnuXEt3xlY8%2Ff1RTTHzRjXR7HhReh2d66Wd8eOM%2BIBwIhAOnRjrcpcS1wVNxf3NINuK6oi6MzaGGA9MzPHwKMbNPOKv8DCEYQABoMNjM3NDIzMTgzODA1IgwUXsYte%2BwuLDCHUMMq3AOuVupt3NqrSzt%2BmKomqcrgJq7y28Olx%2FlsPrC%2BXMgAyQ%2BrTqvB%2F80PlmUxMJT1x6Pz3Pg2UEc1nKM2mvqG7UgxflI%2B6AaC0QXmXVyqetD6Rd%2FzuMozwuEnPstpoFQFQJXzaWUMxU0R6S5p6PF4%2BezD3Gg7y%2FvqJ1Z0csfo3e6BlOAAkHGCCppU%2FpFq%2F7pyrcRD5WmOBsaCmI84bsw0bzvsUIWpFIuSZv4AundTa4T8wcpPrjqMSIZ7O1EljRFIj2TVjA5UnPQLhjvHE28qP%2FeMFrit2RBqezDLPajQ0vktfYyB%2BV5HsDq4ZcQeZ6QZc5LZNV%2B%2FRb5wnJeTew50uVL1vQYqKZs2hmv%2BM%2F4yw4hnkh%2FgSxpdKWTtpKi7trft6R%2Fs0bQro8gcf4fFhA%2B%2BRZbF12I8crczvOWFhXLgl1vdU4hIBKCjAoAcuglx8M4RSY1OXD1gm9sC5o2dSej%2FVVaOSKJdVpZSvjmD%2B0cpcrOqDQKIAFmXcu0IK3Nqc0r4amh6KPv3NTORizRalzST9WDc7XJiT83gCRGJSiSGsPFjG24StOxF5%2FuJO8MTX%2BfSTUKcTy39vigA3Nd5NAT%2BeMFr1X9pOsX30kcqlg2DT7lI5C00%2BRONji2pCq3qvzCQoN%2FLBjqkAU38Rhn3XrUdzMUA41%2F1gnX9agJ1cjvdGsZwqDs1XUNW4LgTuqaH%2Fl9zvoi9G2JchrSzDfx%2FG0DVVuDLv%2F4CLsdgqHSVs%2B%2FbXulpRQ3%2Frw7gLlqoYSw8xzQOebD60xw7w1y1cYylbX8d6z0pusW94koR5V%2B3xNOuaD4%2FP2FAf1dK%2F3RnENwVZ7Q55aXzK6NTlyitCrzlNg%2BuqpDBNUQrrVlo5d6h&X-Amz-Signature=db597bbb3fc03ed6251c9187e189c1cc3761a32ce3f5cf9943e4fe903ba9a876&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLXP3GBA%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDjxtY8TVzfxNzo1NF03INR9x5c73zSl4%2BMBQMt4Yyq2QIgJp4PXhYYpade%2FMDn7QgMh%2FKzQxZ%2BMnFAySM0hALDPeYq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDAlOy4jCUO5Ze6MKaircA9gJYuXuDbxvp3XaOHL0JHpOsib2ixfalTanATH0%2BqOd2tCsmrjAd9w0o2SnJNdcZEYILdbp2qp44USTvHWDJTdh8ZfrCGQ7dfUm9kneRGH8uqbaiIWaiKcvVC1U0dycgiH0iUZ6O3OXHFJgZB2iJ8eb0g0OIU%2FaiLCC%2BDbRe%2FOqRUZ62CQRxOQVjUvMT8ozddBKOnPSjNL9q1Vl%2FrJsb8DRk3Tirp0sbynhgK9meoOrI9GtZseWtkTDPF7W0d4DE9j9PaD2p456b%2BYwj8VCskjmhau2JhjOWHWFpsDti%2BlORYn781zSGeZ0iUSS7wq3RnYU9alIreRua5WLgYaUTWRXkdOijOEWnAFN%2FcW9gzHaYuNiFwh4C8eXwH5gOvqbmlJSoQ%2FP4KmfyiNIAJ2OmCh2LDcD5fYGMASzB4hlz8mOixNsAewL7236%2BH7R8Mvt2gAUUTjhLAca9VLMIbFaxMlrAbCYISZWazZHjZd6LjkdV%2BXEDLnitgzIYU8qB8aX4lNFaD6x2QDModXIXVWHMvp0JRVV%2FAHFfDsktGgTVCwZ4XaeYM1wc3DTG5SgNX%2BkJQjUh%2BanHtff%2BODvG%2BKVJAOIkc2mtyhcB5xFcp8pK%2FLSzJZe3yVWlOpFLvyDMJig38sGOqUBzK1nj8yzKIMGBUNaWtfvwuTewnwbA97Yx8JuXLDlVMjagB%2FjCa2crjzNCU4l6qh7a8pRpvQEK1cHFhCY%2FBbT71srVCZpHmTgk71g07hLWw6ufcheW9tUqAq%2BYPygnFq1Kw5STzKRVWz3Po8qY3dAwN4hxJk3WVuHSkUgj62g4GngwkpHN96pouMCWxL0bodzFQ0lShHrHNapcDZKYXiQlxCj5ubN&X-Amz-Signature=b49f2fb1ab5878fb36c44781acdbef504b8ed46df88aaebf24fd921f3aba0267&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXAQLW6Z%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIDKkLdUuvBHWk%2FR9AoN4fq3f8fpCMVwtm%2Fym0wtbruXNAiAmdiGa0J1W16mbJPdB9reGjET%2FzLzc2mo49%2Fa4d76%2F%2Bir%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMKC9aglaS5fCJ2xPAKtwDDlv39jBMKaE2Fy7oYg8Qh4saL93oBbrsLA5i5XV0vFZAr8gI6vojRVUDDyz80jVCj2dplqiAoPWKcdIgomdi0JQIzJ%2F8lRFQSWZBx2e8j%2FSlGZztDsoVvXZEGv8OlJ%2Bos5Q%2B%2F%2B%2BMKCSb1pEyHinTe1h%2FDSB3LiG4qFdPKqKEx%2BHYFWPC6C5RPiyeSWCfBILPV3CuCx7vg4mEQ6bY%2B%2F2tYqvbjem0peDcapi%2BWkhwbmY2Ia6F1YtideOcR2yTMcx3tWkSjFToUDByK369hYUx9f0ZgFsQYQFK%2FdtPRJ32GWQFZjqiopr78u7DEVXLC1UU0ZKkSgZpWvTg2Hs%2FEWA9rnqIcvFXyd3nDKvLzxFZSMHo9lIZpxB2HVq9XQKsM%2Fj5jlyc4Swo3ccH2K8%2BWWsUA33%2FDNdAwGwR9Z7aPrB5HtRXSzKKNUAfvsGiKjChzS4rydTjLpsYC906gLWw14klsX4g5uYPa0U60tZvvc64kW2cO8SaPaYvc0prE9%2FUcjuGWL1TKH3bGciHPQEEqsaW4%2B%2F3%2BmlPwo%2FGtuU%2ByT4%2FO2QU%2FOj4f4OpQkn6UZ9N9oXW4WAdLr90uQtFDSb5UEk6%2Brf9pkuE3520Uv%2FOqadqJnCJmQupXsvRpZpQzMgwyZ%2FfywY6pgGV9P%2BLOluXB0l8Ag40racOovoNJefDCAiNYSn%2BM3pUwm%2FkCVmhMdH%2BuQcq1W9glSJHrQlJLXFdKRqxZbwLtI8qOk%2F5x3d%2FDXKm4%2FXUw8QLfyHNprcBlreBy931owfZedHWzqU10SuBW%2FPdLuUqFfTjsxrLMFUW6CaKgEFTsmNrl%2Fbyzj61plsw0VPvNBOLzGRoeNkdTqUf8TXt%2F2vqftyB1i6hrX1X&X-Amz-Signature=412ff3f6f53b3b9e0c18db2ce04b25ccd3b9227445c35f44e749211c417bad98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXAQLW6Z%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIDKkLdUuvBHWk%2FR9AoN4fq3f8fpCMVwtm%2Fym0wtbruXNAiAmdiGa0J1W16mbJPdB9reGjET%2FzLzc2mo49%2Fa4d76%2F%2Bir%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMKC9aglaS5fCJ2xPAKtwDDlv39jBMKaE2Fy7oYg8Qh4saL93oBbrsLA5i5XV0vFZAr8gI6vojRVUDDyz80jVCj2dplqiAoPWKcdIgomdi0JQIzJ%2F8lRFQSWZBx2e8j%2FSlGZztDsoVvXZEGv8OlJ%2Bos5Q%2B%2F%2B%2BMKCSb1pEyHinTe1h%2FDSB3LiG4qFdPKqKEx%2BHYFWPC6C5RPiyeSWCfBILPV3CuCx7vg4mEQ6bY%2B%2F2tYqvbjem0peDcapi%2BWkhwbmY2Ia6F1YtideOcR2yTMcx3tWkSjFToUDByK369hYUx9f0ZgFsQYQFK%2FdtPRJ32GWQFZjqiopr78u7DEVXLC1UU0ZKkSgZpWvTg2Hs%2FEWA9rnqIcvFXyd3nDKvLzxFZSMHo9lIZpxB2HVq9XQKsM%2Fj5jlyc4Swo3ccH2K8%2BWWsUA33%2FDNdAwGwR9Z7aPrB5HtRXSzKKNUAfvsGiKjChzS4rydTjLpsYC906gLWw14klsX4g5uYPa0U60tZvvc64kW2cO8SaPaYvc0prE9%2FUcjuGWL1TKH3bGciHPQEEqsaW4%2B%2F3%2BmlPwo%2FGtuU%2ByT4%2FO2QU%2FOj4f4OpQkn6UZ9N9oXW4WAdLr90uQtFDSb5UEk6%2Brf9pkuE3520Uv%2FOqadqJnCJmQupXsvRpZpQzMgwyZ%2FfywY6pgGV9P%2BLOluXB0l8Ag40racOovoNJefDCAiNYSn%2BM3pUwm%2FkCVmhMdH%2BuQcq1W9glSJHrQlJLXFdKRqxZbwLtI8qOk%2F5x3d%2FDXKm4%2FXUw8QLfyHNprcBlreBy931owfZedHWzqU10SuBW%2FPdLuUqFfTjsxrLMFUW6CaKgEFTsmNrl%2Fbyzj61plsw0VPvNBOLzGRoeNkdTqUf8TXt%2F2vqftyB1i6hrX1X&X-Amz-Signature=412ff3f6f53b3b9e0c18db2ce04b25ccd3b9227445c35f44e749211c417bad98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVDIZU4Z%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T211220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIFFEm%2FUAxLX82SmbB19rnmqzWQj5tRwAwYJHim6ebrL6AiA9KpEz7OZDz2%2Fk%2BbgTpjfEaehQrHw5Iq0b7pZlvbDHLSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMM0Kc887Pdt6hToYwKtwDbNv1A%2BobkfjtrUPQoFxfEoKn720fzcKKOSsiBxSWx5GzSBEIO8Qf6PkFA8RbGILthXw3EjPPH%2Bhu%2B4c72e0uRgth44gtbxc%2BjfKYQbR5kxGIc7RjVrtwQ8Ya3t1ejfkFB6LX0gTrjmBrasHouSOrisrX3FXde5G36UvBh4gxCcJ1nIz1ltiQCFCtlu8sUyelhk9IQO5Xcwgy7RcE2CG7cNSwh4Pfo8asOJuYSkVM77AoM54mPRkCclRxVW2b0ZiXgWdLOiNUyUQGC%2BIcdCHoMdhsTeGcLnK2ErnRy2LnrbjayffUMSlwdA97Q4CnEbofCDf6dg0JSreFp%2BTdUy%2FPqvKrfMxSotvBzS%2F57LXlXCzYFYBMA8fZK8JxPUi%2FjphpDylXBPq7LDXt6UqiaRp8xhIAChqki2JhY%2FtS6cj%2BHOK5getGLH8QiOfg1VOPEfqct1SERfBHDUlqfWjoLfT85HlETWTVcT1rPKzBrxJyOqG%2F82G2hxlNAtdKv%2Bu1UUpARMIkypElioYy9u1Cz3Oio0WPKlBO6I5%2BQhLP27JlVWkYRqrD%2F5GdTCAf%2B%2FyESJsgfKFkdJ5siibIal9HNTemDUCgUuxJ1JomwfbXVUOclgTMDped2jytehfU0bowpKDfywY6pgFx%2F18rNn9%2FUhcwsA1FwywGg2FtXdF4Ls621sY%2FS%2FkKI71l554Eoc3VSuO6b6r7DOt1asSb54nVdRVfoVl59k%2FGNihRMfA%2BZj8vw0k1eblEsQVKlTyqqv7pZL1pkbxkdhTLE%2BGA1pm5zDyCL0q7uH11YIMYHj2est%2FtXw3%2BuxtDQUN1hV%2FgAbvVnoTIxCkih8hMp04N7PdOCN%2Fs0hMcBV7hYzz8HqHP&X-Amz-Signature=5be8b1fc462c3333f85dadf800c628e490ddc67b5da5bdb2babd2486991d23ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


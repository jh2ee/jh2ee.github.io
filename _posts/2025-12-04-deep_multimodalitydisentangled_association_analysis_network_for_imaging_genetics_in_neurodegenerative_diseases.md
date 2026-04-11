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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y673IFYF%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIHdb7lB9L6ZG6lbCJieWAuSSqhd270trsUpbq8%2F5SpRuAiACMVFqITycVdxT7EQtHC2uVAeim9kZCL1%2B0TBvvnLgCSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMN0niUEAoL5pMPmXJKtwD910BlHRzCapVyZ6Qmz9JyOmCJ1%2FRYVF5ECV53o8nuVylVUuZ0N1rFyRLOMxgi8hv9OtwAg1h7hnP8i0Vsn1NXxzPfOFTWRlf%2F01Wze3OR%2ByEGFRihCwdieDhQXtM8TL6YY1%2B03RBtGdj4AN%2FcOm3JBX3C9%2BG%2B8iSR6yXQQ%2BmxH5HfVXzhAKX4OVQ9WMBN8VuESbpiVc0Ixz6hszCgVUEhPhLXz35mjF3DONVDkK1%2FbyZp1cvDkXDHUelO%2FBm69U1%2BDm7NiD%2FajjJf0s6Jb5fA9nGK2Qzrvkkr6ZTmkCPl%2BPk3zFN51Fv93z0QIS5N2upZnYASCWKetqW%2Bfxdl6iazZQG20QNk1KM%2FeZHNav3fEeO7AAPzWhfhlQwvW4P9%2FwXbHESqtgsJvAoBKYnHLa%2Bx1Aix5tfv9WWK1S7EXrhpVnXZAW2Ib3%2BQ4j4CuILcQhlyE8kkr%2FZW6vF%2F4d7nnD%2FDx0gMfkRBmiVh9zihZWREO41gAnRVj%2FmRaW0c8G9%2FtkxFWaKXfuXwHQb0%2BhdwpSejC5LPs%2BhcBLQaaCQwFaesyB%2BpUwkCqE3BuAYnh%2BfUOmg%2Fqk86H1yYIrQI%2FMnwcGJvkBXlM3K7Sz0xVrwxo204Kyyu%2BY4EKqWIpUHvoIwsvjnzgY6pgHxIpmOHZq1l%2B7mvymp1W4TGQ0fX7JXxT01pwalIg297NA8Mf4Ye88L6xtPXm15eSGAcN0Dst19WMICHTEnyepa9aXJSZ7u1ob0p23oUq7Zz3lvywA1LFhy0NCfqmodZ53CcDmIBClGGmKICe8bjq3ciJjuuADJofvnPFF4nJGIN3e5E%2B3cfULe8N2U15%2BiWi98gyUCd4tY8iirw2mMtF4jjhzd%2BcOR&X-Amz-Signature=4e2b3e81256ead57e54369a7b5ad9dc4b5647171ce7fcf59bbb9107de8de76e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y673IFYF%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIHdb7lB9L6ZG6lbCJieWAuSSqhd270trsUpbq8%2F5SpRuAiACMVFqITycVdxT7EQtHC2uVAeim9kZCL1%2B0TBvvnLgCSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMN0niUEAoL5pMPmXJKtwD910BlHRzCapVyZ6Qmz9JyOmCJ1%2FRYVF5ECV53o8nuVylVUuZ0N1rFyRLOMxgi8hv9OtwAg1h7hnP8i0Vsn1NXxzPfOFTWRlf%2F01Wze3OR%2ByEGFRihCwdieDhQXtM8TL6YY1%2B03RBtGdj4AN%2FcOm3JBX3C9%2BG%2B8iSR6yXQQ%2BmxH5HfVXzhAKX4OVQ9WMBN8VuESbpiVc0Ixz6hszCgVUEhPhLXz35mjF3DONVDkK1%2FbyZp1cvDkXDHUelO%2FBm69U1%2BDm7NiD%2FajjJf0s6Jb5fA9nGK2Qzrvkkr6ZTmkCPl%2BPk3zFN51Fv93z0QIS5N2upZnYASCWKetqW%2Bfxdl6iazZQG20QNk1KM%2FeZHNav3fEeO7AAPzWhfhlQwvW4P9%2FwXbHESqtgsJvAoBKYnHLa%2Bx1Aix5tfv9WWK1S7EXrhpVnXZAW2Ib3%2BQ4j4CuILcQhlyE8kkr%2FZW6vF%2F4d7nnD%2FDx0gMfkRBmiVh9zihZWREO41gAnRVj%2FmRaW0c8G9%2FtkxFWaKXfuXwHQb0%2BhdwpSejC5LPs%2BhcBLQaaCQwFaesyB%2BpUwkCqE3BuAYnh%2BfUOmg%2Fqk86H1yYIrQI%2FMnwcGJvkBXlM3K7Sz0xVrwxo204Kyyu%2BY4EKqWIpUHvoIwsvjnzgY6pgHxIpmOHZq1l%2B7mvymp1W4TGQ0fX7JXxT01pwalIg297NA8Mf4Ye88L6xtPXm15eSGAcN0Dst19WMICHTEnyepa9aXJSZ7u1ob0p23oUq7Zz3lvywA1LFhy0NCfqmodZ53CcDmIBClGGmKICe8bjq3ciJjuuADJofvnPFF4nJGIN3e5E%2B3cfULe8N2U15%2BiWi98gyUCd4tY8iirw2mMtF4jjhzd%2BcOR&X-Amz-Signature=4e2b3e81256ead57e54369a7b5ad9dc4b5647171ce7fcf59bbb9107de8de76e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGLJIWZV%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIAT7t4aNbAZLD3AlRnvJrM7PejwgxGxeQbUDT8E9gqVKAiEAxVZpnCgn7LaE3i3Zw288KE9KFzGgFcZfnmRvAT71QOIq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDAZRcHKN8aX2C2KuYCrcA%2FVNyJQ3h0FIWzj8WHuIwRUC12SdHPj4EV%2FKvW4V%2BoHyd2vEtDddi54Df56HKLX4m0ADoMkGWYK460ahcuh3vK7QGhMdkFdH84IyvJKeN3NKfm72iITJdMFyx4yKF1Q5PnYWjmiNJ3EjMgyYGDr88b446IQ9GkjM834nk6E0aS4VBUTDn%2BODZRpKel305H1ETCCrV%2B%2FrYdiW2VBjYvev5%2B4pld6waDzwVYw%2B1L9NFdwAnJ5nDgDXccctQgyZhAv6cz823473%2FoRei60i87VhONCSvVQlFgS0T%2FzCJ5iiZW%2BrvTODiT20Wt2zuopr2xuiU2KEF%2FvH3n7t348WgZhRToOw6NcbSA58COR0nLO2mNXoqkaYQgqW1ylunWV29HMoYylb8zd7RfLjh0rH3QqM7Yzj3NsRnuB2xORYac45XfFy50DJrDnXpWKZOUI6d1K%2FPJwNEaK0RjL7be%2FM%2FGpViUDagRSKPMM0b6NLv3W4JSqI0Oc8obTbtKVUHDTitUzFWzHwBaOI0tCAlL9BLha7WN%2FJSKEJgvz%2F67aaWX1NOWXb9f8eQSHILccJSz70W%2FOcyiuaHN7ECED%2BxAJOBMKrO8Z62bsEPOJu8ygwbjrXZj%2BLE9itBD5MkQ8gsLPRMNf5584GOqUBrWoF5y%2BbUTftxk%2BC2XayClKI0W6tmAA%2FTnMmmvyMaMrJNqn82itBQXiJeTIZ84iCrZKme9yDeQLb2Ktatxn0kBVk72lUKDbVwmxwsnq9cnqr%2BIhg%2BtUhN1m6vLkd4eXWSR%2BB1bJGQHlKCgsJKvstURg4zTzfQiQ9JmJ1mcnsF1XBBqf1lse5olmGiCW9PmnmXJX%2FgC6JBDobsUI2ztUBj7OFG%2BC1&X-Amz-Signature=3c147643dc8362cb98d3aabfaa7104c342d27809c5cce51a0570bbcb7bae96c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6HGEIRY%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCvtyJUu4FDCiaFnaxdzUoXmBMnSi%2BKbGge3Uk7nstjIwIgbz5CTpi6Kuf%2BjuyBibeNx5l5stphM3sAAT76qixUKZgq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDAk048AF14BYjhV3pircA4QUNRymd221odh4tdWP5tXRbBtbJODaQTykHK3iUa2vQxA2c%2FT0BH%2FEQDw2UxDmQBqKeLBZuKtvgy%2Fym%2F59lkd1wEVyTTkWQxzi0IWt1ebdbK0D38niA0FH7PVwX3q3UhpHGC87pg%2BPMkpTFiGuXEH3x7n3L6TEPhcIfe2%2FpFDt%2BuP9MuEeCFesxps95wt%2FN%2BtE%2BpupfBJOmvBiNStNBNxMPLVxz7s6yFUGO9kEqx9LFJUvDP8pvCYoMSdEuYZlYYPbGBQDY5mAcDqkT8X4Ide4DNpxoIyrezevpJ1yAe6oqBK9jTyW9cTgJ2d9HSJvn7hXGzQu6isXlkPg%2Bdtmu%2BproNgZ%2FVTU9MToRKoRwBSdL9PDzc86GeUQYRWTrcMOSyV%2BFnZYmxrysCenE4%2BcfxCTCeoJCUVVDutQfzikH91Xa%2FyXGA1QdpjF8AOX0xebwfQg1IEB7zCHnvi9pvUIZYGPDXwj2R3TP%2BhzwDx6trh%2BFQrOgqi8qBSW4FUoq2TkUsZuTVrL3XOfcH%2BDMqlLVxowx9GNBYcQNZGyr0taLD2z9G0LffjMF2OOKCFi0uyUeBsZUd3qSH6CAskqc0TRltKHJIoGoFrQ%2BIKLT9OoC2AdU%2Fg8yKDqKZxNyKFhMMv4584GOqUBQxhg4N81qP%2F3%2FffT0mmG2K2SlMCFhSFndrsdwZz2RAROntyCG5X9GqHti1ItoWM65LnSo7gSj2NZce3u%2FoKWTq6xEfIwcXqNieOwW9sh7AuZREw2nLnPUO8VhIHKExVB%2FL18g53QU0aw4YvEWjunXPG80AdbFOVhwB0g2116nebDwj9DNCe%2BSLn4hgEgTxamVFhXUfqCXtqad72tk4Nzt6S3IKlm&X-Amz-Signature=d69b6229269bcab1a32b0e961f0d0c05ebf91ce57b1aa2cd075aa8d1042a3f17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6HGEIRY%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCvtyJUu4FDCiaFnaxdzUoXmBMnSi%2BKbGge3Uk7nstjIwIgbz5CTpi6Kuf%2BjuyBibeNx5l5stphM3sAAT76qixUKZgq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDAk048AF14BYjhV3pircA4QUNRymd221odh4tdWP5tXRbBtbJODaQTykHK3iUa2vQxA2c%2FT0BH%2FEQDw2UxDmQBqKeLBZuKtvgy%2Fym%2F59lkd1wEVyTTkWQxzi0IWt1ebdbK0D38niA0FH7PVwX3q3UhpHGC87pg%2BPMkpTFiGuXEH3x7n3L6TEPhcIfe2%2FpFDt%2BuP9MuEeCFesxps95wt%2FN%2BtE%2BpupfBJOmvBiNStNBNxMPLVxz7s6yFUGO9kEqx9LFJUvDP8pvCYoMSdEuYZlYYPbGBQDY5mAcDqkT8X4Ide4DNpxoIyrezevpJ1yAe6oqBK9jTyW9cTgJ2d9HSJvn7hXGzQu6isXlkPg%2Bdtmu%2BproNgZ%2FVTU9MToRKoRwBSdL9PDzc86GeUQYRWTrcMOSyV%2BFnZYmxrysCenE4%2BcfxCTCeoJCUVVDutQfzikH91Xa%2FyXGA1QdpjF8AOX0xebwfQg1IEB7zCHnvi9pvUIZYGPDXwj2R3TP%2BhzwDx6trh%2BFQrOgqi8qBSW4FUoq2TkUsZuTVrL3XOfcH%2BDMqlLVxowx9GNBYcQNZGyr0taLD2z9G0LffjMF2OOKCFi0uyUeBsZUd3qSH6CAskqc0TRltKHJIoGoFrQ%2BIKLT9OoC2AdU%2Fg8yKDqKZxNyKFhMMv4584GOqUBQxhg4N81qP%2F3%2FffT0mmG2K2SlMCFhSFndrsdwZz2RAROntyCG5X9GqHti1ItoWM65LnSo7gSj2NZce3u%2FoKWTq6xEfIwcXqNieOwW9sh7AuZREw2nLnPUO8VhIHKExVB%2FL18g53QU0aw4YvEWjunXPG80AdbFOVhwB0g2116nebDwj9DNCe%2BSLn4hgEgTxamVFhXUfqCXtqad72tk4Nzt6S3IKlm&X-Amz-Signature=9a1706352594989a98d45bdcb60322c52a985b231b3a9282303eb5c018457856&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CKZK5YJ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDr86M6yZcnMcNBuWb2H6W37HMq%2BoZmjM6JCqRMzgdWfQIgFZfW2sDyLdwmdlM4svEtIrK5ZiNfNCSiVMNm7YvoO94q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDA%2BIIK5jgVazzJnF5ircAzgIibNkRRWfWuC9sVdDjPmeOEVZPtV7GHmLyEdfY2IuzhxNrK9U%2BS%2FjC4fRsjNCkeMgkJCEwvdi44AMQJbGZj8vV6QWhBKiOyDlphd7DY63RxzbJtgk6BQLHEDEOFuYKm7OFI0uWQ%2BX3VuJih%2BY2ogy4%2FfM1kIxEAlX4gSJdbBf02JmalYOvVxaIfvfgTX2DgCbpjhVn%2B8unPjWJbzhQPjmhoBgjJPOI5wdaKe%2FWPgXwpnGwU6C6NPy07QO9ZLI4IcLsNvWRaQ%2BZiOtfXPtXgdW4vPEpQI%2B8K%2BCpeMYRkTgCYem2a6i%2FeMuSJ7WVdg1Z6tu%2B%2BFTjZ7089YfAkW1iBTtPIskj%2Bp2ADDn2FHJBD96LBrsQr8XWZXyNIBFiDC2YmEoa10w%2FyZPZwQcvgTjKt3kLNMx3MIN3ZBUNkNN0z2Pj2ZJdV%2BAI2g8Hw%2Bzdk8g%2Bg2xSgUhGoojw92xxK%2FBgwinPdbtWdAv4I1vNGw5MFO7bmqUWbKJN0IYzrXip0w%2BO6CHTvZ27fTG3f%2B%2F1MsVlKF0NDKL%2Bqu5ATsdn3nk6DeOCcMOpKBbYQZh5E6lNj4GpMHfXoyqqszs4DtGJlldRj6jHlIW6a72mMSA9GzhdUhdsejW5HvgXJ7SM3YDMN%2F4584GOqUBR4sM8LMMILiGEtcctppepk41G8Ecg1L%2FhU1fD8gmnG24jZyVsgHgM%2BU7Mq4yQaZmi1zuNJ7fOFJzONXPnApPXb7k9ZPH6negV5Y4%2BMqXs5l%2BsrxXxoI7S5kBM4HF%2Fa%2FcOcRDZ1KEuN226Z6vpGPNgquOu%2Bvr9EGEYaa9fk2ZNpURwRiC1pZtqTCj3LG2T1ugHcA7FqL9L9xqqG5s9GbsROfzyCs4&X-Amz-Signature=a61132380597e244fcfded62b3b88455569c60d75af245edf404e409c427b185&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBBDHVLU%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQCUs4iJrIJ%2F7otuYz4PZt2CLBsRGI3%2Fa04OReycVdkkxQIhAJybrGDbXjxzyC7UamOTGB4Tey98VmlMu6TYD8Vo79poKv8DCEEQABoMNjM3NDIzMTgzODA1IgzAXJMdXzqk66Sy00Mq3APBEP%2FRsVLweQV5xgsCnvfhyo98eNl7%2FzQRXrtdUK9nPIRtfJbMk6E4RQMgHL9yqJexEhn9Jg8w8V8tRFuZvi4ZwCYZ3sTF88SkCSMrwei3BIVJ5IpZcWhNsSU3CkN%2FhjzxY70QYIPgdg960SnusQ6a80bhNESh6pEo87PTDokDFXCJ5Yd5J%2BeDgcJzi2SSg%2BBoOUJd95PMROmMNb3qy2b9l987N9ncpvWy3RSVb%2Bs%2FiqAq7AyONrt%2F42eg8PlxmyAkYceb3bbAQ4cl8Zp6LaUMsx%2FMMjMtJKcshQyJsvVlseDsaUOtYKnnS3lxmvbz6c1aZCRNv2nkkUBSVfSwzor0xDv0XGFjRgdTq6GbGE1yOBm%2F7EL5MKHkYdNqbfRYXUXdPaTX0YSz2X%2B2g9EmUNrRJISP9yjtRbZipSAMimtchdUB2tr5zSudRv4xAtuwq%2BgAn2UrrZn%2FsdID9DIee2Pej7tSmD8MilK0fcRojlgITUdeQJDY25v%2F6QCm1szh7EbjXGc2IjWWTpqDxJuJWYb%2Fmwch3mhTmuJi0KvKAHBDYGnKfThk5S%2BtNfX2gycSCSMKRGlLShuQ8I%2FSbSH2YzzDHQjHSQfF1GJ0cKix6gLZYMFdw6a8qKZ4C9UtLjCo%2BefOBjqkASL5JSNGoaa9hGo9fVSXDVrmC4FzpW8HBGK9VKyDdSFE%2BGMZqXTEuTz%2BVuEr%2BPQ9Q73O3RgXUH71pjXyozLLS0qSQyeALPMwXt9BZ3Jhirl4CHK7T4plcQIpuXpvoOuytQGQ7NKmeHHG5bKbAx7dbRt%2BcP%2FY8kxvfGs6k14cF1RdibizdYb8TEkK%2FtgWmNZn5XCvz0K03ubpIrOITvuTPxjt1M9J&X-Amz-Signature=90648da7defb6c6615a098e28660456b68e06b7fb9b802bca1092d7969f402fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HUMIIS3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQD2hc3D0n9I41Qc7zn%2BjKJr%2B%2BbGzacEWMypVBK%2FSE7LpgIhAP4LvvfWD1l%2Fm39qw%2BLdOK3vKgNeyfqutmCGkHmJmseLKv8DCEEQABoMNjM3NDIzMTgzODA1Igxo84u%2FZgB3iXYjnx4q3AOOWJYCfmbKZIJfNSk6ciHZfkAFaAuI3SjzQoBr1dtIxhnuCKdQTP%2FFj0SAcyD43s7Dri5Nk%2FCx98V1Tu6imdIPNB5GX90P6xPABJBkni4x%2B0VGQMFZUUtx0qR8xFaWaHCS8X8PN9%2B7yFR9AzUxOINRKeB3CSbF604uO6XxrHmO3HeeS%2F0HRH24N8YUz6nJPEpCkkev65NgTlPxNE37MOTTizbzNEsRMVDvuZosMp%2BoqXBgik9znBlFMuvh%2BbTAFK6QKzdGxkr%2Bab4QgizGvDB5M3T8PQC2b3AMAO8vlvDjESdOZWveetj%2BhXZhR4FODDe85zDoZTlxpojGx%2FYLwQpJxLNsFpFJpag%2BTG04%2FdDaXNDAbBcse4O0g5euujDmIFTz6RQcMTTI3fU00smnD8cheVfFEpJYgQKJ29EHP5Zhy8CcvjmMuavo%2FDLZe2GRGp18P058L96XZdDvKO%2BBkjlOW%2FjlgXRUpaLJ7uo8HfCU9hsu5iMgHgyHQ%2FWEY6B2u79SRFZqPA%2Fi9V7s%2FAtawSEZ%2BrzFE4rBJyKbFMMUetkRiZubb0IgkSUfjq%2FZpmw2EwgY28M560A%2BGGsWKjIczRUOs9nW4ZN7dSSpn8w8L3J5NTfE5vtz1%2B2Z9RvdtzCo%2BefOBjqkAT1ARs7jH9uExdu09zFzYX9%2FW%2BOnSa8F0t6EpZD8xUg5MJ3oN0YuDdnp0PN73X5NsuXOl8vfIiSY520X%2BaOX8pN8yj5Npv2%2By9qUN%2Bb%2BKij330N6Q1fzIdkZsVUTcNNPP38cF6yV6zbUNjDzJqk49SJnyjHv4Jo1HnF%2FllsQG5FUFViibomC0AFBzt4wfeSjPFvSbvaGS2VvvwsFTkai%2F1mbQElZ&X-Amz-Signature=090e2794a928667e4b2d601624479ed4917adaf6418bbf99cda787935452faab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NAPEXUG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCID8jxMX2KRuaYitDZ4CsbDEKCx19MbBrKU3G01%2FDyLh7AiEA%2FelZbx0unqFQUOvcCvpXDp4TG697Y2RIobFKHIzLm3wq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDIKJLP8vwiBJKPAKJSrcA%2BRn3Mwie0x6htiMtSMVzqoCb82lIvF74M7xeJsjxLjuQkFjSyA79rp2P1ZopklX%2FpO3J2nOnSALzntTFpuu4FogvNRhvk9BUmyBktFK0s3UffEvBgN0b6mBM013Z8eraEhLUpK1sXyp6d4jc3bGgzRVmShe6ELKuyVrxbIc%2BMBrKWbnAqVyaAB6F8ZNEI%2BXZbGaAyVkWDXiKjXKGUMxuWYOYJLZuEE7Xi4wPhjca6Thb2gq%2FuAQhMZGXuO7FyCyx6jIaU%2BN%2BdhvDFmAwWt3NDjzTKVoRz5bkVtYwzDoOqc2%2BbYT9co9f%2BYzXGW%2BxbtTGM90oha0m9pUTcVYT4pu%2FfvSNQqnSArwL%2B5HR2FzHjG6UFEL9F4t%2BtjWYwP2xmkJU8q0Gi%2FZMLlgTZfQboq%2BVYpREg9C5Q3Mp8Ib4FB4a43Hz7JdKoyNYEqu2U4uJmiAuTk0fNZIPCPzt38LcIeSGoYItIuFjoP68qZphDbEE0oc1VqvlnOJwuwjLgDSSaPA5Yavy7R7dWrgBS7txGYgH0jpmaERLmitP8Alhe42pXZ827FMtPrFnqHUs6kvFajqg9UMFoPZsccSGT54Ee%2F2D1%2BVEKtlTRmUjlV%2FNEi6P3Nf%2BIiIQrLXnIBNMaVTMNL5584GOqUBLiwPqQEhA5JZHs8LiqgHiYXfwzxbpZAH2FmUiHkNeLZFtWUgCT%2FKfwTCLeMWvfWSF7W8bucdxVPwMjk3SYy7hALPOuT3XWtSg4NIBBP2iB6EJ7wPGlio1Edad7gmbCqWF%2FJQzFvRDNXdLlC4MpFSmGekvP0vqJkO5QcePFC7HAy8%2BVdCmLXbk0dA7XWBCjV%2FaVRHhFOOzhYUkM%2FsWHMcitTpjOyB&X-Amz-Signature=27ec3365ad387c210da5dbf1c3802b82963c7355ff3b01c0a5e5590a0e41c076&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NAPEXUG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCID8jxMX2KRuaYitDZ4CsbDEKCx19MbBrKU3G01%2FDyLh7AiEA%2FelZbx0unqFQUOvcCvpXDp4TG697Y2RIobFKHIzLm3wq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDIKJLP8vwiBJKPAKJSrcA%2BRn3Mwie0x6htiMtSMVzqoCb82lIvF74M7xeJsjxLjuQkFjSyA79rp2P1ZopklX%2FpO3J2nOnSALzntTFpuu4FogvNRhvk9BUmyBktFK0s3UffEvBgN0b6mBM013Z8eraEhLUpK1sXyp6d4jc3bGgzRVmShe6ELKuyVrxbIc%2BMBrKWbnAqVyaAB6F8ZNEI%2BXZbGaAyVkWDXiKjXKGUMxuWYOYJLZuEE7Xi4wPhjca6Thb2gq%2FuAQhMZGXuO7FyCyx6jIaU%2BN%2BdhvDFmAwWt3NDjzTKVoRz5bkVtYwzDoOqc2%2BbYT9co9f%2BYzXGW%2BxbtTGM90oha0m9pUTcVYT4pu%2FfvSNQqnSArwL%2B5HR2FzHjG6UFEL9F4t%2BtjWYwP2xmkJU8q0Gi%2FZMLlgTZfQboq%2BVYpREg9C5Q3Mp8Ib4FB4a43Hz7JdKoyNYEqu2U4uJmiAuTk0fNZIPCPzt38LcIeSGoYItIuFjoP68qZphDbEE0oc1VqvlnOJwuwjLgDSSaPA5Yavy7R7dWrgBS7txGYgH0jpmaERLmitP8Alhe42pXZ827FMtPrFnqHUs6kvFajqg9UMFoPZsccSGT54Ee%2F2D1%2BVEKtlTRmUjlV%2FNEi6P3Nf%2BIiIQrLXnIBNMaVTMNL5584GOqUBLiwPqQEhA5JZHs8LiqgHiYXfwzxbpZAH2FmUiHkNeLZFtWUgCT%2FKfwTCLeMWvfWSF7W8bucdxVPwMjk3SYy7hALPOuT3XWtSg4NIBBP2iB6EJ7wPGlio1Edad7gmbCqWF%2FJQzFvRDNXdLlC4MpFSmGekvP0vqJkO5QcePFC7HAy8%2BVdCmLXbk0dA7XWBCjV%2FaVRHhFOOzhYUkM%2FsWHMcitTpjOyB&X-Amz-Signature=07d0881eecdaeb8ae5cb6971edca90d9d39b25e26a4d17f31c808c1acf1a7067&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCQT6ZY4%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCICSW%2FEIBwn5SmErPYPvOSm%2BvaR8ngpGF%2F6GoZx%2FIeiV5AiEAowvllYkL%2BZJlPM0RSFtf1lphi%2BWpYV%2BoqtEnBmD5bCwq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDJ4Li6fHlnWGT3qmWCrcAyut7WjPZX0LDw1i%2BLwKzDxXQQ%2FKoWvayafgG%2FYK%2F%2FMu55x469SCEUrmfFsFSHYjx8ZCwm7%2FFVxuAl%2FDhpm9XEzAb3y3tgTbvfbGxiItAVfYEs%2FMMZV1holmnLah2k0YB7%2BUVAnTXABuluWpfzyorb92HTQoeAiXQvpkOE5LoVxwuTy8YsRnHd8oMuqa6BT6LM%2FYnYNgP2O7R833oaHdEIze0wDbo%2F%2BNpuNcvgTT7o7tosLx%2Fm%2BgizwHnjTWc1lJyQdHMst9eIE%2F%2BFGxu9P4cvB7tu1jCdIxKpOjLD2xDOqcZRwc8s%2BiJmRLGBGHFRhfQglVmGhZdlu5zxTOoEt9FP3HIPgCdzkdsQoCXtHjKfVM2oAVir7OetT0xGZI%2BJQcyMfbesKLMcsG6L9wbWniIv14uBuaqJyX4Mo44lJtSMytvG1jsDbGPUnd7pawdgH7qDV9%2BynvohURpZ5VN6hWxoKEPiOW7q%2Bc0nqWtzOdveD4DgOE5RI1uasuoXrQlSNzztQQCu%2BliDQJO%2B6yU%2F2Pi8WrFb0rrZvNqPbT5OR38jzSkKoTIHAomv8wmhWk2jxeQFkuH4BrR1NxR9uVe7%2BuKYXLXTiSW36IpwaHewgUa1G8IkDTA2tUUYGVMfTrMJP5584GOqUB1rL3%2F75ZziZejH%2Bdk95sxU1FW6ZLFgc3pVImzHV3du1RXXd5jtAlhlr6CjXQxPDVrs3DMyM2XcTrWFZLRgGG9qWVXcHyqu8gjZUPmHESlrh2lzCTM4wSoEJrSQv6jNl2QC1xg8uRC51VW1h%2FyZa9slwM%2BLHFII5pkMftDxLLfowxt0gpxAv17xpBGDtdKG%2FJ4LEvT1WOqBqG7oZ1d1Wxn7FEjgEO&X-Amz-Signature=634f491804c4cd7ea97395f9b8cd45a3ccfd4bc4f6c5eecbe5a86d56890f6cb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JRDUGZL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQCC5Cp8%2BsMvBWMTc9ZAVGcr%2FFGRNRDGI7d1NPSbL7TdMwIhAPOEZeO1NpwEUSTHaaV7fzRSYpv0qiVcKNW3cBVMWzr0Kv8DCEEQABoMNjM3NDIzMTgzODA1Igz8QKVJmZlOjNGbufwq3APQ04pt7cNAE%2B7Xg77iJmW0GHjPYulYDhE48pJCGZ5ACeUyHlZcC8InE%2FR6hg5yxMo1iebv4G3%2B%2FJu9UZUtAOTASU5h78usQZES0sTpHWsTvfG8zqUNE78sP%2FCIPNLjIKBraeXZpjnqNChu8aV7Ti71%2BssQ9azswf25WUSknFvPjJCjVchL0doTf3K2ByknUTlIQSofYA946RUJUbBhvWC270uoX537tK5%2FtR1h5ClVKOkAEjZxrGipHKW0wQ%2F15UD3e5FygqBkSPOs2KV9JCouEBDyKmVfjKKVA7aG3VWmxtiFUfqWznN6LARCDP08hrZjOmyTNo7WBPSRjYoNxbgs%2Ffbga2c2VcjJoqCj0J6J5DRqR2X2fFf9mcc8k%2FLA91kshwRZcOZ%2BkIjG5zWUm3ogP9Jx%2FC0%2B7PiRdd6ZHKQYf6D6Dxfitqc44b9tYPPZy2%2FYs6tbYH%2B%2F06ryjdGQG4iMsBxkvNL80mo3BWd9jtHRVP%2BMPVVdMnKtMsFi3f6rll8OdSXq2eLf7BP1cfBlLw49E%2BmI3Tn2RdxI4Uuzgl7w3IbAQsy255oPUZTbUX94Zt3oZQQoctRQlSE2Qn52jQBowNH1%2FhOJ8mja86Di%2BCyFwrN9jvSjtMgSk7W3SDCp%2BefOBjqkAfBlfxjzxETPzrfqoTwbJbuN2LwddmdV8Q57Y%2FolX0GsI6CU38MYSqZFiCtm88x319v8pnocw3%2BNUGv7RFGfQaCQJ%2F1Orw%2Fprng2mCL47MfaTzKYXqzHDlJrdHZaS82kVv070U2s7GBTUUAcNbK2GOrh8d3C4cV8S4y89jFNNlkRCsASys3%2FZhWHxYaYR0n%2FP3N6%2FARPa9%2B5tNu3nVuytV4Sxe5%2B&X-Amz-Signature=be013da65b7cfb36790b7e07e4fffff16f28211f47a62ba6a5463f26c0796a71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JRDUGZL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQCC5Cp8%2BsMvBWMTc9ZAVGcr%2FFGRNRDGI7d1NPSbL7TdMwIhAPOEZeO1NpwEUSTHaaV7fzRSYpv0qiVcKNW3cBVMWzr0Kv8DCEEQABoMNjM3NDIzMTgzODA1Igz8QKVJmZlOjNGbufwq3APQ04pt7cNAE%2B7Xg77iJmW0GHjPYulYDhE48pJCGZ5ACeUyHlZcC8InE%2FR6hg5yxMo1iebv4G3%2B%2FJu9UZUtAOTASU5h78usQZES0sTpHWsTvfG8zqUNE78sP%2FCIPNLjIKBraeXZpjnqNChu8aV7Ti71%2BssQ9azswf25WUSknFvPjJCjVchL0doTf3K2ByknUTlIQSofYA946RUJUbBhvWC270uoX537tK5%2FtR1h5ClVKOkAEjZxrGipHKW0wQ%2F15UD3e5FygqBkSPOs2KV9JCouEBDyKmVfjKKVA7aG3VWmxtiFUfqWznN6LARCDP08hrZjOmyTNo7WBPSRjYoNxbgs%2Ffbga2c2VcjJoqCj0J6J5DRqR2X2fFf9mcc8k%2FLA91kshwRZcOZ%2BkIjG5zWUm3ogP9Jx%2FC0%2B7PiRdd6ZHKQYf6D6Dxfitqc44b9tYPPZy2%2FYs6tbYH%2B%2F06ryjdGQG4iMsBxkvNL80mo3BWd9jtHRVP%2BMPVVdMnKtMsFi3f6rll8OdSXq2eLf7BP1cfBlLw49E%2BmI3Tn2RdxI4Uuzgl7w3IbAQsy255oPUZTbUX94Zt3oZQQoctRQlSE2Qn52jQBowNH1%2FhOJ8mja86Di%2BCyFwrN9jvSjtMgSk7W3SDCp%2BefOBjqkAfBlfxjzxETPzrfqoTwbJbuN2LwddmdV8Q57Y%2FolX0GsI6CU38MYSqZFiCtm88x319v8pnocw3%2BNUGv7RFGfQaCQJ%2F1Orw%2Fprng2mCL47MfaTzKYXqzHDlJrdHZaS82kVv070U2s7GBTUUAcNbK2GOrh8d3C4cV8S4y89jFNNlkRCsASys3%2FZhWHxYaYR0n%2FP3N6%2FARPa9%2B5tNu3nVuytV4Sxe5%2B&X-Amz-Signature=be013da65b7cfb36790b7e07e4fffff16f28211f47a62ba6a5463f26c0796a71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UD44HRZ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T082753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDWSd6RsL4SsE1T8AdBJUeE8Sw79tdgbZlYbmAN0CbPWgIhAKBErHHchNc08MTTuoPlA1XV8l4MwHcKBoa56PhBJ1khKv8DCEEQABoMNjM3NDIzMTgzODA1IgwKGfqcSrUgu1Me6lMq3APXcn%2BWQo7H39SJr7G3ZdOwXULiygG3yLdzOIQM3%2FWb8UJOjQx6dV5YLP5TAeBjYXDNSMrCYHvtoVU%2B09Ef9NPd0mLPX01FZWo6rVe8GbLyiRrIAQ4r7AvZFo9pvwLqbqyF8J1LTvhtCEWKcfAdkREBnYxAKFM2YzDM12FRmYLRBqnC8zfe3LxHCZnzj53s%2B1J%2BIfTskefKzOLtSOMZHKxRlao0RYhsui9oTNTnymISBvqZgXfKe8LTbbaTpD%2BvwNOs2RNYGZC22KBaQqdwlzznpqC4dSqxCVOXKtWRT3R6gRuOwMG%2FHYxFNxn9iTKpYGQQvr%2FxKFu5NuxAGQ5A2C5iibqvtlM1r2t1KfgKlVJuuM%2FFZTmdY%2FXmv%2B4yZufbg9%2BHCmQt6qNChb997TI2nKnSxSttjlpXMYS7Z6QuXVhZ%2Bt9Gq7lf6mE7hkwLJ6rvP5SxMfTdGoGRCPxOwbZaL0EQM5wPKbhgOWGT5m23nS%2Borx8MCTs1Bpofab9h8O6lMZ%2Bgvx0m43rtQHmD1L7f3gV%2Fd2CjM3CPoG6bvL3OLLe5GmYpowewJQt6iRTkxLS9%2FHYubeUQ5A%2Busb6OhNQb%2F2WanniucjnFUPczW%2F2vaXGVNyKEXZHhglIMKryyCjCW9%2BfOBjqkAZzpmGgfG%2BmXBacSLbe9nZIXmWXwoy6X17jBQboQBNPjxofHZfsAuQAWztPR9NuJUrfpJI55m7vukxyvOHJFzKGDnEOEFhWP9zdZQskH0DKiaVp3sKDjULaHr1P3n%2BX1XcWuZGR6jp4nlTDA61rb6CyO7MR%2Bwj3c7pE9fOfFjEilWLkg9QIVBCOw6TN2MSPgxJhyjb4UCE51a9TXIFkO%2FkhfrEg9&X-Amz-Signature=04ee99aa3b1a4f8fdc12c063daa474c6f65f004f1f8549bb3f18b7f0b3d08129&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


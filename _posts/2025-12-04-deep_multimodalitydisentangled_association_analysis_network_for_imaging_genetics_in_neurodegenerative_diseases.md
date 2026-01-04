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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ML3RDBA%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDJyQXwtKHvvLyzNWk2ha0c7gMy0tmPY97taWZpiJBJQAIgGoK%2BqPsl2WcQioe1GZauPA9RRVQaIyb7SlbBizU4c9kq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDNhTtjVflvAeyW9DoyrcA0NyzGsXFYB8pqKXPaCMyV%2FV5%2F%2BjoFsd6X1Ro%2FENJo4Q4YSynuU5bqEMjS13Vj%2BlWgJHQGHweemYTxBf8IbkRZMqZKKvlRVALWNs1U3TAcuUgbpvuUE6MO1h4tXaIzCGt%2FKtX7brgmjhjzfkZ8%2BIzI3twTnK%2BJcM3d3bTAgWMuaJdXIQaXoisfGqWsQGVZvy3DKVGzM61r1QCbck%2B6P4VzGInM6fyQV3WUzMoVNJpW8FmIEbUifXgnIMSOvxBZoBi1McB5Cq85GB5YryOzjrvsbkKtlXCqhPvlIC021%2FL4uu5NNwZNz1hjDAaEGx1CPp5Uj3Can2dwg2wZrmyGx3Tuuy1uHqO%2BQI6xYHg6UnY8sIeq3vXi7BG6GlEJqcYXNF8eU2%2FlADOVGsDjqfnARaCUbpPiJ39zgq1JFGdGFSY%2BSpn6xWBy8%2BXdvkWeG4JXvL5sv2FS6V1HxS57FsDwHtZ3F8%2FOh8iUj1CCNn4%2BLoQ8NtlZSWlBK8Be8SRgqNxRTei67yiLZU3T8G72fqv4v%2FWXPQbNtcFA%2B5wkt9OKCXMwnNaTkpinAHO0R1S7CQ%2BkOp6uwsohXN4dB8Nbf6fu4GCr%2FC16YsbiTx8iZHhxwaI2AVZLJhpJirYVctF2loMNLU6MoGOqUBXQNGv9kPe5rzYI50Ai%2FFzk8VvyAuDLd5qKjkLhY53SkDoZjVCeYvF6o%2FXgCRhxKhEqXaFff7y6dk6hceqBeCs0cEgOLqEdZBxYTWmqWWXmfW39PAcQvHuf00mLpIAV%2FZxy1F0tXCw0Q%2BuWYuo2GERPZ42pS1cBtvkIUUVKZcjLivM4Zz29I7OAHsYdWmhEcLPaiddkBgSBq5OQR74HMlCSaqiCu4&X-Amz-Signature=f219380d12c6d73550d658a0378e37a3555ecec9243c9c04de01ac3b7e3512c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ML3RDBA%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDJyQXwtKHvvLyzNWk2ha0c7gMy0tmPY97taWZpiJBJQAIgGoK%2BqPsl2WcQioe1GZauPA9RRVQaIyb7SlbBizU4c9kq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDNhTtjVflvAeyW9DoyrcA0NyzGsXFYB8pqKXPaCMyV%2FV5%2F%2BjoFsd6X1Ro%2FENJo4Q4YSynuU5bqEMjS13Vj%2BlWgJHQGHweemYTxBf8IbkRZMqZKKvlRVALWNs1U3TAcuUgbpvuUE6MO1h4tXaIzCGt%2FKtX7brgmjhjzfkZ8%2BIzI3twTnK%2BJcM3d3bTAgWMuaJdXIQaXoisfGqWsQGVZvy3DKVGzM61r1QCbck%2B6P4VzGInM6fyQV3WUzMoVNJpW8FmIEbUifXgnIMSOvxBZoBi1McB5Cq85GB5YryOzjrvsbkKtlXCqhPvlIC021%2FL4uu5NNwZNz1hjDAaEGx1CPp5Uj3Can2dwg2wZrmyGx3Tuuy1uHqO%2BQI6xYHg6UnY8sIeq3vXi7BG6GlEJqcYXNF8eU2%2FlADOVGsDjqfnARaCUbpPiJ39zgq1JFGdGFSY%2BSpn6xWBy8%2BXdvkWeG4JXvL5sv2FS6V1HxS57FsDwHtZ3F8%2FOh8iUj1CCNn4%2BLoQ8NtlZSWlBK8Be8SRgqNxRTei67yiLZU3T8G72fqv4v%2FWXPQbNtcFA%2B5wkt9OKCXMwnNaTkpinAHO0R1S7CQ%2BkOp6uwsohXN4dB8Nbf6fu4GCr%2FC16YsbiTx8iZHhxwaI2AVZLJhpJirYVctF2loMNLU6MoGOqUBXQNGv9kPe5rzYI50Ai%2FFzk8VvyAuDLd5qKjkLhY53SkDoZjVCeYvF6o%2FXgCRhxKhEqXaFff7y6dk6hceqBeCs0cEgOLqEdZBxYTWmqWWXmfW39PAcQvHuf00mLpIAV%2FZxy1F0tXCw0Q%2BuWYuo2GERPZ42pS1cBtvkIUUVKZcjLivM4Zz29I7OAHsYdWmhEcLPaiddkBgSBq5OQR74HMlCSaqiCu4&X-Amz-Signature=f219380d12c6d73550d658a0378e37a3555ecec9243c9c04de01ac3b7e3512c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKZVL756%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCSxIt%2FGc7nawIAj6LpAz7Awc7gvR%2Fv9ifoKyFnsk0udAIgR%2FJkfATAvUw5ld%2FgIjAH6mazupU5spszFQz2Myysx6cq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDNAGIYKjr%2BWPz1o%2FLyrcA91KCoYofMOBSIgcWOI9J9ZzyATcUMlrd2Ne%2Fh5STtunI0GRjwkfYOTJhl1hYUNlrPr%2FlKEEEwk6lp9tp%2BYVbO%2BQE1fZTeX1MnXDOT9ja2GZNbSJkrZ01%2Bu%2FhqNLWZgOjFx7%2Bfx31cmGMWGm4BzzOezhENb29MWEonatB5XXb2zuEdVGp5D%2FK0YvzRqRaFxFuBvMDXSUGGu%2FZOcfe5Vr5vOSOxyAejb3khpgTjW%2BsFb2XL248oZmKctN7E6mXybDBgXYNgx5CdgG6jzqn8h4sYtlMfG7JSQFuCu22CZPKhw0cREA%2F3XfO0ZuDd8JCi4Rs1a5heW63aWZZ8MmFhlQQ%2BgRblrEEgtW42Sa4DAsUM3d7zD59zwtC%2FN%2F5Oc8auGCVKak%2FeRZ9VybjMACcdqaBBhdL%2FJ1SWfP5EDBEsU3DfIKo2HeSma5e6bS2SYmaXTwJ6%2FkeReKEzDS3Va5k0FvY9CIQM9ENMggvsCYO20pD9J9tB0WI1vO%2F8RV4bhfWKaqMoqGSxV%2BCT923oj4Q490HQgXN5Xku7AqbCA%2FDfMcDTzOO4zREhWNHeVfHe3KdKumnvdrkcCKQpCZEC4iJUeGAdAl6W7cQC8mN8kZJChdMC0mXq2XQTjrO23FTTmPMJnA6MoGOqUB%2F0zVXN4FXHCPdRfldki4QDVJG%2F1VhlMx1yQVMBey%2BS0JVraMdJ%2Fk7MHEXa12laZ%2BFvgxIYTL4Aaa9nqp0CwyCwJ5z%2FBwlKZ5M02%2BuAwKlJm3sbI3Q00PLERY7iAw0t0wnwuzFrRSX8KcT0XhXvvMpLHdNhT0p%2FCiROg%2Bu3nEs8kHMw6BmgO6Z3HKc7BnuRR8NV9Gyyvl%2BhcfB5V91M1aanu%2B7jFP&X-Amz-Signature=70314b37a14a8a96cbb1be5ad8046b1b1f7281697c73d207faded00c4bf92c96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GXYU2XD%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCAWQ%2BtB8s0eOAD72QJvZm4PiO2XE8n1tq5wkyBc9sXuwIgGFa8xL9TtgSuV99S0N6IRibdNT06%2FlaAsKzjUWADwhkq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDEsI4SSTdpCiOr%2B0iSrcA%2BC7u5om4GTRpo1GWqo6VW5IfD9%2BCzv6YChoV7yO9nvUZ5yzD9BTSv3iFNmQ%2BamkkSsQMFc0aY80hazNMNB8apS3nyLzE60tNspgQXPNvh%2BiLvWwJX%2BUsW8gHzbc7Vzwtr10E%2FWKZWDGkQE2WCh%2ByD8Vzj59JoZg8%2FeqdVZ4DX7KNyVVyWZ%2BV9nM61wmFIPWuT3Y%2BeYHF02tOW5V0S7yXuSAECrNiCwhg0UEI%2FpvdBMbgVXm33NqEgUPiicAbll0n98HHNEbGTmoOIjd4PrptK5DlYIrdPeSVEqpK74xXIgtAR0RlHbWoLdU6MvfmduCKFd%2BZ0h0T4j0Y0VkSW3LbaLcLRC06TtukRpufv18vmakRATrrGoyHo0O6%2FlUUQ7IVZUgyD7%2F%2BNTczh%2FBArtRZaRY7HPdGbUNOh%2BoDl3H5ieyqXUgOm1U3Jcbusab3l%2FW07DuwU8FJys7Sjn0zUvOPdw%2FE7MNUi7tjNHkvhWAVkXr7RqW5Pgvt5yUJYejooehneQIFO827xOTOLzjYmK8LR45sr7dBGS9m0uMSXA9z1aA3x818KbHbMRuD05S%2FlKIKxV2glk4jmbWFF2gwu9DmnosX2s%2BC9dcKNNkTl4Zr4PGAF8dyiCCzhIdh2H1MIvW6MoGOqUBwUcilpdR5dVbpVQfAgXy%2BMfsqGEPrwRXeCExiANluSazTZf98bXrl7ZoNPiNwIDX9mEbfPSG04Z%2BIjyA8orMpwEaOi%2B%2BzqZwk8dWDcuYArLYjSBi9DF%2FzCR8XS0j1suIT0VowzWgpwuMpnJjkgSmDvqDusUl9Hq6xyfY5XbTxF2H8XCyeuswZtWkZiKUuOL9%2BsR0bhZoVt4WrHjfWLNnY7TF1SY%2F&X-Amz-Signature=2163a8725076c1c8d8d20177177f2cbe8113b6ad789ed9660e5161b31b455db4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GXYU2XD%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCAWQ%2BtB8s0eOAD72QJvZm4PiO2XE8n1tq5wkyBc9sXuwIgGFa8xL9TtgSuV99S0N6IRibdNT06%2FlaAsKzjUWADwhkq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDEsI4SSTdpCiOr%2B0iSrcA%2BC7u5om4GTRpo1GWqo6VW5IfD9%2BCzv6YChoV7yO9nvUZ5yzD9BTSv3iFNmQ%2BamkkSsQMFc0aY80hazNMNB8apS3nyLzE60tNspgQXPNvh%2BiLvWwJX%2BUsW8gHzbc7Vzwtr10E%2FWKZWDGkQE2WCh%2ByD8Vzj59JoZg8%2FeqdVZ4DX7KNyVVyWZ%2BV9nM61wmFIPWuT3Y%2BeYHF02tOW5V0S7yXuSAECrNiCwhg0UEI%2FpvdBMbgVXm33NqEgUPiicAbll0n98HHNEbGTmoOIjd4PrptK5DlYIrdPeSVEqpK74xXIgtAR0RlHbWoLdU6MvfmduCKFd%2BZ0h0T4j0Y0VkSW3LbaLcLRC06TtukRpufv18vmakRATrrGoyHo0O6%2FlUUQ7IVZUgyD7%2F%2BNTczh%2FBArtRZaRY7HPdGbUNOh%2BoDl3H5ieyqXUgOm1U3Jcbusab3l%2FW07DuwU8FJys7Sjn0zUvOPdw%2FE7MNUi7tjNHkvhWAVkXr7RqW5Pgvt5yUJYejooehneQIFO827xOTOLzjYmK8LR45sr7dBGS9m0uMSXA9z1aA3x818KbHbMRuD05S%2FlKIKxV2glk4jmbWFF2gwu9DmnosX2s%2BC9dcKNNkTl4Zr4PGAF8dyiCCzhIdh2H1MIvW6MoGOqUBwUcilpdR5dVbpVQfAgXy%2BMfsqGEPrwRXeCExiANluSazTZf98bXrl7ZoNPiNwIDX9mEbfPSG04Z%2BIjyA8orMpwEaOi%2B%2BzqZwk8dWDcuYArLYjSBi9DF%2FzCR8XS0j1suIT0VowzWgpwuMpnJjkgSmDvqDusUl9Hq6xyfY5XbTxF2H8XCyeuswZtWkZiKUuOL9%2BsR0bhZoVt4WrHjfWLNnY7TF1SY%2F&X-Amz-Signature=e4d79da9ad48592ab15d832b2d124dde9e165467c0e745b4df4001a609dd0384&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C2IFOWK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIBfUnaZyPXpDt4BkSOI2TKJB9AK%2BdlGmHmUHUeCVrWWoAiEA%2FlKBDmz%2B3KK%2B8o7YeSJJDg%2BfaALGp4xUxapSKD%2FYlyoq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDAqJj4JSp6NCA9QIkSrcA%2FIl6vhgivmLN0%2FuOxd8PUjiwjYU0qz4ZVRRc5FX70h%2B%2B%2BuQFeqxV9f7I92cXOQh9FG3WzKMtLH5G1bfqxodmivXi1Lu%2Fmb8THmL7RNEi3LvbADK3bP9sUeQneihXBetvtItv7l6Z5d7m7X7Z59lLZTDhND3rTfxTquK9%2BcyJStBIe8duNzlF96hKTbA7FcMt7r1zP57M%2F8N5JBHh%2BuFhsiLI%2FIW5zdcaQgMmXfwrBP9Qb5eonac5F8ZSyjeyvoTsU9ySWyZ2Nssf%2FAX%2FhFI0x3%2Foy3UV%2BL%2BSifeUJOSlPh5ZEompYnC67vFus6lC9BgKF8xwWI%2F7%2FUoimRuu6rjovklcjbN0noxswH2%2FIgHND8gktlh5ycTbde%2B%2Bk9%2Fr%2FAq4fo1bW1dKR2sNctMquflMM3747Jo5pEuP%2Ferce%2FTd%2F0hGH4dJCSbYFiwo6qpLJiKL1abPFnv4qu%2FP5Lys4BrxHjHFAVXwP9nUUK%2BxMeQJImQbDtNdgBM2XuruEKoz2y2aesEV5Hb%2Bnf5WTULV6J2sc5nLOf6nDPHmCgccG4ZyhKWeI1TFrAmRi630pQ35daT3%2Fy6eWfMTKhULBn7J25VYu0G%2Bj6BOzYEmPchpQYF2Cd0XgJO0RLsMeSIDE8kMIPN6MoGOqUBFMfKuK309oy1CD%2F5SpdCRd%2BKe9viEMpJs3r1Hie1aF0ef%2BwJwio6zdq78KL6TMVTQlNlFLAeCHQ1v%2BXoFUpRtX%2Fs9HZLDZcKR4Bm7Fb4DI0VSooYRIN72SBOT%2FRRDeRhFPxWK3CPJkSOcyUdX24aE4RvVLcJBQBujY7KCoYz%2BHP25GzSMiO%2B3NgJksoUw3uosBEELBDHMNNW1P0W4dkUye34fIQK&X-Amz-Signature=f718101a9c88d95ff7f8dde61d1e0a554fbadf564a6beb54cacc04ccf9d02b11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EX4HL2M%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCZ7g5e5gp07I5Z%2BFKSJPOCulSL338Etq1bxzmiyww6%2FwIgPO8PLnxq6W4UcTpJ%2Fr1CNxHZG1B8b0SEbD5M66718lcq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDIPNsw%2BemcgZ3jlRXircA%2Fmq6IhpLaIjOEM9H3QMmalqo6ht0Z57kBQUXRk69oSBIiKNerJeLMVd4Ovj8v3l%2Bk2C5pqd8XM%2BvHmGv1xMzkdiHuv9rMcXO8FFRh5x3MkcfRz7Q2%2BDl8amux%2FVO8%2Fha%2FqjO3tLzlqAxYA1UoST2Z9CQImFY0uoo9kpBIyvdZmwpOtc53WQ%2BfN6eHoj3%2BF%2B%2B9%2B2Tk%2Bd0YCrpR8d%2B3pijd9UejQ%2BbXQsf0GUMMrEaOYaVTXYCoN%2FphYCWuhZm2%2BZyyDhJtSPntAxMCgTApJ8B12zZatk%2BGWLNeRFaIS5S7LpcvuxhIeVuuxgDhvWqmMAr5vx699oa2tNklYLR4O4BTYlL7C8QIjPAGt2qTB8PXLG%2BAX%2FyBJKxRfuLfQW46vJSsxJSqJTVROX3JQyfRVp%2FeM%2BZyOkmduneq5%2F8cgepOLkOE0zYyOKkDBGsEVz2T38tZdWDbKK%2BXend1T9NRFU6MrGmZWAJk1i7%2FAN9js%2BPS5fSlmOEIlJl%2F0yDMeDFLVrlvbAJbvEXhyEcDu9S4YNNu%2FlDM35IzgeHyqJexoriE3UIMT4DVCrrmSETGA2OpcITo9eCF6m5%2FTlmlrCE7LRkSSZ6z3CMx6ECP652yN8HTxZ%2BcDiWBm7mCwm3PSaMNvE6MoGOqUBLR03N%2BtlwJx2f0LZs8XjLsGnim7SLG9mup9IPK29ZauQpvsvOtS0ezJBJKjcu2aNpqyt8dYYzisPoy4ms787j7Q8Oc6xs57QgEqKkGDd7qK6YO2G0GHqUVqQQWS3u5cJYdR3NQ5CQkHAmD32e5QuRGwguPqLcL5L4vfldkOBwYcJlsL%2BpIc3aYqWuyPTE2nN0WUJvgWuXDqlmlOLWwwSvOe17hNY&X-Amz-Signature=6defa5e380cdf49a0e81787f4df92b8b754d0611bbfb976965e6555c5b0f2c00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4JNWY5L%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIBpCbs2KXmb5mxSa4GJtz1uZuckPghorA6Ps7zR2PqDAAiAsvXGs0iS%2Bf5eai67r9ga%2Bcm0PP7h8zZFSbMbQ3LQ7Dir%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM8he6vZxZ97MWrpRXKtwDaIiUXjCxkdSz11JE65Jrn0gpufu44dDBbAuH3i4pbDrDdhL8sziok%2FNXlMLoPNiAeKBxizjftcM6Xiivawg6kIiKUb%2FMRfHnmW9NHE8%2BKMjAvHVh3XBC8vT92nDCvQuGV5IR98qVYKIZH1zNw9YbQvYA2itNe3DMU0FROIGeoxK3vYFYR6a5gg3MkBN%2FICXnUrVQzzgzeyfViMQULCRV9jWCeUAw%2BY5yIq3P6ZLGGSx3nnzxGpjkdD%2FLm9fhJOhOuXiZ%2F30QSa1EvUhd%2FSKuxhvHwC3FrfxwVSxHZFxPAevQD9NWReDw0c9ejoZmNtVuGGYruyZoIedaBJMna%2FEm5ti8UFj5PYromqqMdj0N%2FpzFYXy9hfTaloyUOYtwfYzgu%2Bfe4fRCzjIg2szKf%2FUJUwI98kG3FDMI16Qa3podkJmYgbNiWggmf5YADd1zL7NbK7nbHpRi5zF40tjxyTKfOyMNYMUx6NmQTd7iZZiqTQKLxcHJypAdTl4b95O79Fp7eBLvBMmiD6%2B02MoBJhICwSrAfeofsRSsgA9d10nmETkjDhcORbhlbz4JVGS4kDcQrm2uGZ7ejKMx%2BugoOBa%2BelqlKNctZK5saz88T2ZBS4XAG9uuI91OFW8a0IIw9MHoygY6pgHYmRxxlHBW5dEi6lB%2FQdqRact6tyQ94P70XnkKCa4EUb0Nhvo2fHzzdeDjUMwpQ0RPj7bkczjgrX%2B0xTXJdlRiwDlnxWb4pASFFYumSXuFlywdvKI0kSgrFgfK3qlT6jBjXHszCgFHM4E3fT0g0HJ8Ptokamr6Npf5eWOw9J%2FcVj3IHWXk3%2B03SgzjaS6ZDYher6wqdSt7f0TV4CgUHugXwScte4c%2F&X-Amz-Signature=bb257f083f50d026baa58ed151112f4d3d81ea03b8a44abea77465008d88d1eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHL2PGFW%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDNXijlsd7%2Bssk%2BeGXQHJ66EYaYDfPWbFMuT%2Fi3XeiFuQIgLMyAK%2Bczhc1xSvTAu%2FytjlNcfQrGYfjPQrnaPyWGpx4q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDL6ilgz9%2B2ldub2OJyrcAypG3vXImmetenMZR4xsfA1epGPILmGC4BUptlh6hlSG0JAa6JWTj7lO7xxNqyXPcmOnCWJka1uUOjH3hIoE02PjHAALiD5RMRAGmeB%2BiF3o%2FbS%2BtVUCyRx3Gpr43qumv9QjiqqeYxDoxQbKcfH43lyT4a5ND4%2BkeyEjjnctXPm5LbDp%2FHNBGXXC1R43lyVyNcTVLV%2BBfIgLKSlfKYEGe4jqBLlMmz6MuiEbL5a68mRzFnMtqXBi5lJkjfC3zGrCEI19l4%2FU%2FsQ0%2F%2F%2FcVxqrZ82ZDWnFKqW8SPW9jrMbwhWM6SBKSiOdH226HoM1SRKELns7ELLeIZsuzKAHuQBaLUdahP3D%2FcxQ5vStk6AhqiZ8ltK%2FAirUB8eROi19ZklyziZlEhxgIND9ia5MLqgMPPPguCNYeHHzzevX3ulMj2yr5t04k%2BIqvgcmE8%2BhVN6978KP8nT6WVkzJXyTX%2FxuEMVzSpvAd%2BV2vOlenvG8JFBqcNcELfDknBZ5mEnJSMMxpA3CeIlE%2Ff44q9tVvMGrPu1a4mf6zgb1v%2B9zWtIFIyblbAQmFD2I7FX5ZwHRypjmMJIlI5ub8lwUqmAl%2BLLr5vGL5WdTa9GLGXSQtCfJ5Ih9MxVBzJjzM7jB7C9AMOnM6MoGOqUB179EFZO4C%2FwhqnpyV9z40GaF%2BeCZkboPWh1B2kbBZQo%2B%2Bk0Nr8pfIgDpaBGXHFflml64yz86ZsL%2BtZ%2BqW%2FC9UT8ws2H0h3FYyjceFVIaD9oL16PW%2Be4j8lyMYelbief%2BgKNF%2FaUONuJzaMrxNx82SXoyxEuqmk8FBreYg1wso7hwRaZdbv8FB1zt1XPZCa3HI7fD8BkTiLK%2FO%2B7x7Cmc%2BQiKjFzK&X-Amz-Signature=39e2c708a54ec73de5fa2b98dd622aeaba85b032acd2f687195bb6c2cb185b97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHL2PGFW%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDNXijlsd7%2Bssk%2BeGXQHJ66EYaYDfPWbFMuT%2Fi3XeiFuQIgLMyAK%2Bczhc1xSvTAu%2FytjlNcfQrGYfjPQrnaPyWGpx4q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDL6ilgz9%2B2ldub2OJyrcAypG3vXImmetenMZR4xsfA1epGPILmGC4BUptlh6hlSG0JAa6JWTj7lO7xxNqyXPcmOnCWJka1uUOjH3hIoE02PjHAALiD5RMRAGmeB%2BiF3o%2FbS%2BtVUCyRx3Gpr43qumv9QjiqqeYxDoxQbKcfH43lyT4a5ND4%2BkeyEjjnctXPm5LbDp%2FHNBGXXC1R43lyVyNcTVLV%2BBfIgLKSlfKYEGe4jqBLlMmz6MuiEbL5a68mRzFnMtqXBi5lJkjfC3zGrCEI19l4%2FU%2FsQ0%2F%2F%2FcVxqrZ82ZDWnFKqW8SPW9jrMbwhWM6SBKSiOdH226HoM1SRKELns7ELLeIZsuzKAHuQBaLUdahP3D%2FcxQ5vStk6AhqiZ8ltK%2FAirUB8eROi19ZklyziZlEhxgIND9ia5MLqgMPPPguCNYeHHzzevX3ulMj2yr5t04k%2BIqvgcmE8%2BhVN6978KP8nT6WVkzJXyTX%2FxuEMVzSpvAd%2BV2vOlenvG8JFBqcNcELfDknBZ5mEnJSMMxpA3CeIlE%2Ff44q9tVvMGrPu1a4mf6zgb1v%2B9zWtIFIyblbAQmFD2I7FX5ZwHRypjmMJIlI5ub8lwUqmAl%2BLLr5vGL5WdTa9GLGXSQtCfJ5Ih9MxVBzJjzM7jB7C9AMOnM6MoGOqUB179EFZO4C%2FwhqnpyV9z40GaF%2BeCZkboPWh1B2kbBZQo%2B%2Bk0Nr8pfIgDpaBGXHFflml64yz86ZsL%2BtZ%2BqW%2FC9UT8ws2H0h3FYyjceFVIaD9oL16PW%2Be4j8lyMYelbief%2BgKNF%2FaUONuJzaMrxNx82SXoyxEuqmk8FBreYg1wso7hwRaZdbv8FB1zt1XPZCa3HI7fD8BkTiLK%2FO%2B7x7Cmc%2BQiKjFzK&X-Amz-Signature=37b208b8a0c8f763a5511f08abd019fdf37b075e2dd15f36cb6234a12cfad10e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YD4ZWN3L%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDCo6E6TABzWKJKi1uhOdPPi9ALLpy7jqSgA2zQ5QUVeAIgYKJ3uBDF5Saeeud4EI4nyE6hyXmx1PqU1A%2BIjmhdCuUq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDEpN%2BGj8kesK6WgFFyrcA8HuodJs9Xp%2FSTEZyMp08FXIvJPKqLTlHhQ4O9V0pC1vQuQLmcdw%2FT8fP%2F7NxPbdTMVzZk8h11SuZorDXJsv%2Bv1xTLkrWod4pFCzG1eAzZWl8dS8%2Fz3NxW3MPkcV%2BLCcvqu5jc4jGWjxw23ZmcM%2FYBT7sj%2FEZQj6fuH1gtviETVn5pZHyWQFyI5f9F5SLdFodJSDVOGqXRlTJwvooM%2B06QC56UejgqQqLYz8%2FBt5GwGrjmcfjbEMS2p4CRoNZvAKKs4tjhJrq9VjfH9Cp1k8tAT3aIc5TB1XHWzZSMMtW5SMbX9f3KnHk6gwcmngukVPFasS%2BizrT27SVTjwhg5XVDVpyEPVGLrb7W7ZVkYb26VAkNBnF4MHcYS%2FNpCFIeDtqvtLtWGp8aJs6D1bxY6DQArn6A87oZAbA4bYIFw4%2Fxi2fRyuZJin48%2FIHnBAZA4pRLwaPwFrVkpcck5dkdLEyOnYsQ9yiCAKn%2FkoSYMq%2FevhAAG0OX9%2BQRgUefnTLe2O7VDvduOFDYZ3e0jSFgFvsVCuLUCfD6ansGc6yQhSmhQJeyvcdXL69R1umbldGVdJxFWsOa7NkgtOpfOmgLdDCuzlScYC%2FB6%2F4JEaI%2BGIxgoq2yAWCfylrfutTAORMILH6MoGOqUB%2BrUQ67lf4KWUpqewKBXI5B%2B5XIUBpZ6gGC4qDZcdRp4517Qd6yKMeFOGlOFVErpvJKrivk%2BujKIcThgcqAQ3GRj7qkXeBfWYNYqVAkMneC1SSBdlkR7u3N7KEbqKovorIQnNl8Yx3oc6vcKBRNC%2FMhjF8YSUQat3NCReBxWbsNKBE2tC6hpY%2B5vQxFhHgsQQ2DZggiMPRWMeE2LP6HbQT7zD8rjP&X-Amz-Signature=8f75411675b4e2564ec6249068ff1ca518ee4227347efe4fe835108656e8ab46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAIVKUMG%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCcc8Fr%2BYy2ndeUP7FKAoDlMWYghsvTMRgWModFBZqtkgIgENimdcwh1Jt1dYZ2fZKJjRjYWTTMJY5AXxhSRGmGKqoq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDKjln%2BcrNDinQFSpuyrcA17wGFsmQdvct%2BpIzJ8Sxf94wF8vjzChFKFjVy25cItF4JXBdFH8UQCjm0eiL8L4o6XuE%2FOy5PeKgwYm1mUm6SIfPYUwCrEqA27EIcX%2Fv5ID08ZDefRs%2Fl%2BoR1wrpxfMdPUSdUG75vs7V5jMv8Hp47zRLiyUFVZ%2BYfQiSXrL2uF3A%2FthI48Ld4Sw%2FEhaCc9us%2Bq84NuApYSuFQpbibOlk%2FH30DYQxCL7RIM7mTWfMdYhrgQEGUC2IndzaR%2BT4kbold2ktjJt%2BmwS8M5RuI%2BFzi8vX31Tt2Af33Sswwa00172v%2FOHn4LieL78tByJ27rpQUs6RhEjrgLRshOa4zZ2Pn4UYTnaKa44dkfIB1DJUEtIO7bThknRHkmoLBHfGe1uGAvQRVvte1P%2FAZETb5fF25Zjkc34nT3o93TTptJxJRhGo9LwozDMJx7eoq%2B2NZ5SuRFQGAQVOhKGr%2FPa%2BUsjV57rsSCVhlbHIaxNEFJ8cId%2Fz9vKmLqCx0Ff28D%2Be31C5eNInnjIkvHZ%2B8p1QiRQ53UH%2FACXEjLYfKuLfxNPQrrvQDcVHGaVcmwFXiKj47iRIJ9gpmvDeiSjVhNJULSLor0%2Fvi7LUk8tVwzukyNYcoHH9XP%2BBrbyRXEXh2A1MNfH6MoGOqUBBg9QOez1kgOVu66MVbsNVYlCLWnceejd%2FBDbjf%2FOnITvjFpsg8fPVoKvwkAQBNCa2SkUmoCUpqKrdJKvoOjcKF5DY0kCTQ597S06Nvlw28us8A0kHTL0eBsTsLwlWPLN08ptGsXO2fP7G8Hh2j%2BAw6MNlgAu6hv9VTLBs4mfuYmbn3q8Gr3BdLdCEaiOi6bauRRbtaqonQQW%2BKKfVGMJx0tlzeV4&X-Amz-Signature=0336c26d18296cd118c6e1efe6c01626b20bbf9e5801dace156c79e31f48ff38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAIVKUMG%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCcc8Fr%2BYy2ndeUP7FKAoDlMWYghsvTMRgWModFBZqtkgIgENimdcwh1Jt1dYZ2fZKJjRjYWTTMJY5AXxhSRGmGKqoq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDKjln%2BcrNDinQFSpuyrcA17wGFsmQdvct%2BpIzJ8Sxf94wF8vjzChFKFjVy25cItF4JXBdFH8UQCjm0eiL8L4o6XuE%2FOy5PeKgwYm1mUm6SIfPYUwCrEqA27EIcX%2Fv5ID08ZDefRs%2Fl%2BoR1wrpxfMdPUSdUG75vs7V5jMv8Hp47zRLiyUFVZ%2BYfQiSXrL2uF3A%2FthI48Ld4Sw%2FEhaCc9us%2Bq84NuApYSuFQpbibOlk%2FH30DYQxCL7RIM7mTWfMdYhrgQEGUC2IndzaR%2BT4kbold2ktjJt%2BmwS8M5RuI%2BFzi8vX31Tt2Af33Sswwa00172v%2FOHn4LieL78tByJ27rpQUs6RhEjrgLRshOa4zZ2Pn4UYTnaKa44dkfIB1DJUEtIO7bThknRHkmoLBHfGe1uGAvQRVvte1P%2FAZETb5fF25Zjkc34nT3o93TTptJxJRhGo9LwozDMJx7eoq%2B2NZ5SuRFQGAQVOhKGr%2FPa%2BUsjV57rsSCVhlbHIaxNEFJ8cId%2Fz9vKmLqCx0Ff28D%2Be31C5eNInnjIkvHZ%2B8p1QiRQ53UH%2FACXEjLYfKuLfxNPQrrvQDcVHGaVcmwFXiKj47iRIJ9gpmvDeiSjVhNJULSLor0%2Fvi7LUk8tVwzukyNYcoHH9XP%2BBrbyRXEXh2A1MNfH6MoGOqUBBg9QOez1kgOVu66MVbsNVYlCLWnceejd%2FBDbjf%2FOnITvjFpsg8fPVoKvwkAQBNCa2SkUmoCUpqKrdJKvoOjcKF5DY0kCTQ597S06Nvlw28us8A0kHTL0eBsTsLwlWPLN08ptGsXO2fP7G8Hh2j%2BAw6MNlgAu6hv9VTLBs4mfuYmbn3q8Gr3BdLdCEaiOi6bauRRbtaqonQQW%2BKKfVGMJx0tlzeV4&X-Amz-Signature=0336c26d18296cd118c6e1efe6c01626b20bbf9e5801dace156c79e31f48ff38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FFLYR5I%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T121545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQD2AYHtr16e7jEVq0VXl4kkvky%2BQFB2tG54ATl1hEDCDgIgfH5NPJBaboUbzn9rDRECXHDkYThF33AzLvHqWbgNl8gq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDKxzn8KYILoveYR7NSrcAxgN9iwL2IjiR%2Bd0azf%2Bb7VB8TzjBCZO9UlR9AdcFHcCLn%2BX04nVtycsPLviqRIcwuyUzC2MBtbsTWs%2FrSV0v4pP2162UYISPGE7qlneQPdY4X2Yys2YXnUvCu0%2BY0TgMNvq69c6tfKt7f3vtgIuMaKAfD0rDZ21DvCLd%2BHhSsy8f5A5j7Skuf%2BbWfCTokQ5drTM%2FWSjmyThPwa%2Fgm11WQW6pIynt3YMu8z3Nbjp68gXhJOp5RaC3GKYUg4q%2F7KaKC1hbhNUKLdNvtVRgrRnC66K%2BA78f6WZECfxkJtNApUBaP5a5OwUKEKnLX78ZfhwlostcFK4iJ%2Byp8G3qigwy8kcS%2FRL40sW3JvqvCAxLwZgDsUCfzPwKvTV7xVLcoEWY8rn09b4j%2BCaHkkgL5HXjzTY6q3OEoaiuB28C81Ss2c9yLOW8Q1cRMsceSOiQPltPTHp7BtkkOL12fpWmDegak37eEjxNGT%2FkMB6bHnuJsQqie2Os7BZWjSQNXPybmx6Wb4rUKZCE9xxUZCxmsGY2XUcbmXT6F7anJqkhE8m4Z63ahQfWLCHIuEqevLG8Hb3buJ8BR3fiBZRVAwZ2pjDBfLKfxN80W1GVpTnu4d7UTe34SJUZRUN%2BeU1W17aMNrP6MoGOqUBpkv6QgYXa8J%2FrA99nmSj2kjP5wKcpUlG0rkQtZMPHLctLMfQInpVbW%2BNq%2BF1fBo45vtpRhs3ISnOwPvY%2BkSRfadIC3PtNUJsksR1wKD5%2Bpp4uDfNE84kKoc22LIB1E2QkPkyJchqOUmCPprJrl%2BurucU5x5W8aIIzYLPFGS6UEOeeK15ogUJYnOyHTfUJvXLlVcX%2Fo8mAMn3vDwIT5iX%2BZ9EmW6n&X-Amz-Signature=80a5232bcfff9d0d291482d78415ba32a12ce12403bcd294ce9fb7fa1248701e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


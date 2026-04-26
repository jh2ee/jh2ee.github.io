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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IE5MUUN%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB2N8BDy5oIspTQelLldvdQtfpY%2FUEjQG9KYur6j2Rn0AiEAzrYctYAjPhfyEN8LhhE6vR5vKQ9kbdkVDUJIgeGqlpwqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIS7x8zPk%2BX3I3GwDCrcA1W6s7Bcefbb9Ij8muT87VIYgvnvBG8NSlhHuwrn6rFitmJOwIRob9bJST6HIItpYde%2FUelc7Uy4kzpG2AyjWOaN7LBXBHjlYbJwmVEcNaXCUKXIzcikJEvHnXEsLtOGWF%2BuE6O2ghxikkAV%2BpPRygjOuwiGfMmSEvV74Zn19X0Mc2Do7FYYOmP7OH4sXmYNCYIvbxnTLqAtfwC%2FXRDUYtfXxtrrqSDk8PM5c5mat%2F9JZSuroX0JBypJ7lCVQxKvCwv49Fus%2BDXcLafhArGU4aA%2BLAdnxP0OrGTFwwhxK9dtN6oqdBaV7lcn88Ktl3jPhEmkbNE2kP6WWSCLUHnut48R2jIPlf5qFgCalDFPNNG8iZiB%2BtUj41pVtae4EDo4cTq9b3VVaiRcWBCDJv%2FAPWxrjMKAE6iyB7HcuSPoRJDgyfwXnxd7Tq4llfyGSMFyDx81eHRzRs3lrg5QDLw6LIDS8EtXyVQ7aSaWDtinO0QVqEtyCqshtltVS%2FbZ%2BsXjSO6PNnXDM4v0XMMoKtZJiRsoeSW9l5bIqj8oG2bALXnN8AMbFqfpLEJnGcXAfbz5g772tIakT5mQSiQwgJ%2BoBfuQKPgKkHM1x74Q1A8I7Z7%2BcsqP50tVilseWtSUMIC8us8GOqUB69kLgmGQczYyb3dF%2FpZbVVuon8LX9LemXC8%2BbCDFKobJWUczyXZ7OQ292vhjOYU2%2BZjK15bySkxZT6NTr3urHtODXNqvUbIRMrbILAG2RwbOzbGCEgETneXcc7f5sSZxYB9BwCA9PxpgVMUxs75iUyUuZxwR3LzFrgcle8QYLr%2F541rj9kS0ji0cLrTk7hY6S8s2r3OQAAFegK9mtELP2KCumhmV&X-Amz-Signature=42ce5074b00ac1790c6417454bbadd78e0015b7a5da1dea1e97433f80bc39537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IE5MUUN%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB2N8BDy5oIspTQelLldvdQtfpY%2FUEjQG9KYur6j2Rn0AiEAzrYctYAjPhfyEN8LhhE6vR5vKQ9kbdkVDUJIgeGqlpwqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIS7x8zPk%2BX3I3GwDCrcA1W6s7Bcefbb9Ij8muT87VIYgvnvBG8NSlhHuwrn6rFitmJOwIRob9bJST6HIItpYde%2FUelc7Uy4kzpG2AyjWOaN7LBXBHjlYbJwmVEcNaXCUKXIzcikJEvHnXEsLtOGWF%2BuE6O2ghxikkAV%2BpPRygjOuwiGfMmSEvV74Zn19X0Mc2Do7FYYOmP7OH4sXmYNCYIvbxnTLqAtfwC%2FXRDUYtfXxtrrqSDk8PM5c5mat%2F9JZSuroX0JBypJ7lCVQxKvCwv49Fus%2BDXcLafhArGU4aA%2BLAdnxP0OrGTFwwhxK9dtN6oqdBaV7lcn88Ktl3jPhEmkbNE2kP6WWSCLUHnut48R2jIPlf5qFgCalDFPNNG8iZiB%2BtUj41pVtae4EDo4cTq9b3VVaiRcWBCDJv%2FAPWxrjMKAE6iyB7HcuSPoRJDgyfwXnxd7Tq4llfyGSMFyDx81eHRzRs3lrg5QDLw6LIDS8EtXyVQ7aSaWDtinO0QVqEtyCqshtltVS%2FbZ%2BsXjSO6PNnXDM4v0XMMoKtZJiRsoeSW9l5bIqj8oG2bALXnN8AMbFqfpLEJnGcXAfbz5g772tIakT5mQSiQwgJ%2BoBfuQKPgKkHM1x74Q1A8I7Z7%2BcsqP50tVilseWtSUMIC8us8GOqUB69kLgmGQczYyb3dF%2FpZbVVuon8LX9LemXC8%2BbCDFKobJWUczyXZ7OQ292vhjOYU2%2BZjK15bySkxZT6NTr3urHtODXNqvUbIRMrbILAG2RwbOzbGCEgETneXcc7f5sSZxYB9BwCA9PxpgVMUxs75iUyUuZxwR3LzFrgcle8QYLr%2F541rj9kS0ji0cLrTk7hY6S8s2r3OQAAFegK9mtELP2KCumhmV&X-Amz-Signature=42ce5074b00ac1790c6417454bbadd78e0015b7a5da1dea1e97433f80bc39537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZRJZ5RN%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCdBgWGcdgnKx%2F3W4AaWiMJV18qIvVxoq3Omhy0iFKBhgIhAJDRVuxlCpOEvHuvqPvuJ1SAv7zJlVBahGe7wl2%2BARunKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxm2HuAQ8kJJu0HaZ8q3APYNhgxvSPYt46AXO8ZoDmxExul9ilE72r0xdDT3pm%2FKgPZkjd0sTyzgF%2BoGVJPqLbU%2B7cbE7onE0rVvAU0%2BhT8p4G%2BzgnNvzCVk%2BXP8xoB9tu%2Fyqt4GgvrstYCs7D4krUkD0X7alPpcSqtOFiuHtFZamiNofgAkdp3okY%2FoDMFVprkf9X3fPjMq%2Bdi3WIH30AojO0fhIafilz5oqe4BCzvacuVeCLfX1jkX6TGz7GCsVBkSc0RwSONopkZhigg0LAxXRSauuqAyHptHNSnB16by%2B6kej5i%2F%2Ffl9OTkiROFxYUDa1yPPdihXI8wF4gT2OwRlBubKij%2FYnFGPW0%2Blak1B0BdTguuGWaw%2Bd23%2B12Ifd%2BcC276Ir0c9FmeyPoL6eyKfKgbXT4IxcGRkOuV4QnCeWjay%2F2wCc1bfifT0vC8136Ky0jlRaNBE9%2Fcd17%2FWT%2F3%2FvrdPFElsLq4WmYPlmiQGDguORT%2BH7yi7oE7noQ0S9%2F%2FLYCAuSUlhGc9b2Ggptt5QqyFM%2FdqQGuYYwShS4x9LN0NjjOkAas0m0gp2iMuUv0liEA5Yo3UcDYCsnSKeXr8%2BZDNOKDsVHf6hnf%2B2dNX3z0wwcmq9o8ZitqwPfadMUKKzeCKWDFTnXnLyjDgurrPBjqkAVVwCBRiQCN8VwM39yCKpKB71Q3FoNQTKOFOoM47ZNlEhr8a%2FmQlCDtfLx9wkaA%2FHTyppwOfkfNXnfEACyIURKEXzb%2BreaZIsKmeGxmmx1%2BK6A7kA0WyDS07deA6gv8prHZM%2BYEP5Thtxcde7obUyWYiMpmZA8b85SoM9aoD6DU3I1r6%2FsDbNqjKc0TkX5CripuZhfL3x6U%2BqJZU5yw5WZFoYboA&X-Amz-Signature=d806bb5518898512d93f1014b0f2e3ab7951fdfd51a2ed12fc767fd51c708d56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBWZ3V4M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTCTENNsANDpHQYV1LRXhOL7qyYxA9O37W1flrLweDtAIgKXY5w3PlfHYR7p6ucuIKGd1gZA%2FO9RFCh6r9y281H6IqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBbAMWFveHlYF1GquSrcA8Q0Q%2FLaZfGxPXiDAGalbzB0JYJxvKodFcpPdsWwrB0L7pXgk2gFI6mUTZQcZqCxOW9nvmGVZC9wlkkvAqy5hiSL5HM07LXKsDRCtL2ud2q%2FMCCn1m%2BCbMxPFILJQ3%2BEG6xapkrX0a2dl7pBDBBwMnujNVPljRBurBmHEmS%2BZK1ERgBcHWYKk08ka3iLScxdAkXZuVs5yjh1Jzuvi%2BIlE0Li0P4Z2oYN0dO2iOsxT0emsM%2FzdkD3K1kc3M5Hvi3PliVlBmK9eeTbXRnIDKyV5TN5IMhYKMbmILq%2B5XxU%2BsBiQmX3DybSdlKqnYL0nveIepsm80Yw%2BCOy4N2qEc1h8yDmCX0PKqKLxg9WXShHonFcNW%2FqYSbdPXct10fhUB1eqDg46WkDQLr7iRjjbkncQ%2F1gCVTgJki6LpVxndRK5m7BfJMpHvZj0UtB9%2FFWq%2BX1Ivaw4BINocPS2P75ef9BQcKjEX%2BbVwniFXtu2mBFHxm0IUbDyDjTE6BEEQmcPws9tYV6ZxpsxPfxfjixNjRVhmvyDG0TS29jBu0u1QlqIMG8BWklHLg9TqI8JZN9K%2Fw%2FTdg7YTCsMeS5WRc%2BynyECjJYBCjITcxdSgmSN%2FDDq%2FjB3LwKyj51R2eReJ8IMK%2B6us8GOqUBeDGgvLoqD79nCnaSGciKyYhX8E1M%2BDaG9sKc9y51DoBqdA512hVenc5fzOQUG8RdKYQ0%2FDrPLTZ9dOCGCe2%2FM87Jz%2BMOKtCrg8Ade4JVL37%2F2Azca8oyt87HUwUcTHofhV3DEj1g5Y%2BDwzbnI1DUIIf4W4Cfh%2FmsljmoZwr5S754t4v8j9Wmqha%2FZPYbQCN%2FYlYydrUxjuJ7n8uJOfq475D%2Bb81q&X-Amz-Signature=cbb4b9d795efddabf942e84d9edbee412361e9bd0add6f747f75eec6b1eef927&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBWZ3V4M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTCTENNsANDpHQYV1LRXhOL7qyYxA9O37W1flrLweDtAIgKXY5w3PlfHYR7p6ucuIKGd1gZA%2FO9RFCh6r9y281H6IqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBbAMWFveHlYF1GquSrcA8Q0Q%2FLaZfGxPXiDAGalbzB0JYJxvKodFcpPdsWwrB0L7pXgk2gFI6mUTZQcZqCxOW9nvmGVZC9wlkkvAqy5hiSL5HM07LXKsDRCtL2ud2q%2FMCCn1m%2BCbMxPFILJQ3%2BEG6xapkrX0a2dl7pBDBBwMnujNVPljRBurBmHEmS%2BZK1ERgBcHWYKk08ka3iLScxdAkXZuVs5yjh1Jzuvi%2BIlE0Li0P4Z2oYN0dO2iOsxT0emsM%2FzdkD3K1kc3M5Hvi3PliVlBmK9eeTbXRnIDKyV5TN5IMhYKMbmILq%2B5XxU%2BsBiQmX3DybSdlKqnYL0nveIepsm80Yw%2BCOy4N2qEc1h8yDmCX0PKqKLxg9WXShHonFcNW%2FqYSbdPXct10fhUB1eqDg46WkDQLr7iRjjbkncQ%2F1gCVTgJki6LpVxndRK5m7BfJMpHvZj0UtB9%2FFWq%2BX1Ivaw4BINocPS2P75ef9BQcKjEX%2BbVwniFXtu2mBFHxm0IUbDyDjTE6BEEQmcPws9tYV6ZxpsxPfxfjixNjRVhmvyDG0TS29jBu0u1QlqIMG8BWklHLg9TqI8JZN9K%2Fw%2FTdg7YTCsMeS5WRc%2BynyECjJYBCjITcxdSgmSN%2FDDq%2FjB3LwKyj51R2eReJ8IMK%2B6us8GOqUBeDGgvLoqD79nCnaSGciKyYhX8E1M%2BDaG9sKc9y51DoBqdA512hVenc5fzOQUG8RdKYQ0%2FDrPLTZ9dOCGCe2%2FM87Jz%2BMOKtCrg8Ade4JVL37%2F2Azca8oyt87HUwUcTHofhV3DEj1g5Y%2BDwzbnI1DUIIf4W4Cfh%2FmsljmoZwr5S754t4v8j9Wmqha%2FZPYbQCN%2FYlYydrUxjuJ7n8uJOfq475D%2Bb81q&X-Amz-Signature=9981c7a343f4bbeac1930b0ae2888fbbb95ace4287b58565c0ceef015e4ec037&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7YQMUCE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaAATyah3S%2FFcKkTesL67HvVekN%2BNfeWVatSZGXRwaVQIhAOcIW9MK2%2FNi7FvYYTg1p9yTzqoqR0zX%2FgpTC5LTlS9aKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzVxe8p41%2B5c0HH7DMq3AOr4%2BSaTpEYUtsVecJ7KAl0YmDnDJGY%2Fb0B3mTFqP97ItkV78MHSvq3bFONakl4fbHRoLZnzF5tpSVQgjhlyORACTZe%2BPlkjQVtFYZrQ%2BQ%2BBXpFMCScuQbgwO2aqcW7r5HuyFjkhmxIkq91C0tXL2A2QlX6TWDtSVwrV2ziuphVgE28LfOj1%2BGYJbBApZTaDztpnN35yWKmmGeS%2FbDIcD99ByimLGG8qSYSJkbjcZmkWVrDm2wjD6xQNxz2Lz%2BNYJcBybQGkC5uchijSrklGR%2B7BEqxfeH35946SI9SaqEVkgzx6QkjkIurFBtIx1lHRhKL%2Be435BqlJ%2FqZyv%2FcdIuuPSEQseFJsHKha5ph%2FJtg0DAN7Dt3OSUZBOEOivwOP5Glf6Kdh2u7W1jtZdS1f4nGB343HvnK8DJBlkxfDFCFcRjSjZiXp1tXxCGBSgwReg9tA9AelbjTnnucOG%2BK3qGddP811QI%2B%2BIylxeLtw%2F0DkixuLIiKk9kn83SWC0M3RdUkuq%2BboQmFk92YHLqgaYjLLGyD4W%2BZhkzHu6seH4uPvbn7QnnCUsXjWSruy17nFT%2FZIY6N%2FIljNOnDibEE1IzwF%2Fac2jPTlCTXOhOT%2BWCiQjYFOrP9NQPLB3%2F8rTCnu7rPBjqkAYHrucZ2bKv93GgOOQrQwMTrM7lWZ0MJs1sehbAmlOwRdgeOyfSvX9oBJ5kj9ZDX%2FAaWcTNh8%2Fega900ti8CUOKvdFEwrLHpHcOguvrBRhq0AMMOrSBvwe2pKvCt2fHQ101TpJEU2p16iT5DARTNL%2FvK%2Fi3%2FQHpPgMOLMcg4Y5WrYbS8Zf0Pq3EzLG9BDJUiSDavxJaDF4QS4hXNVrgxe2NK5X5%2F&X-Amz-Signature=407fa9ab145dee21201c42e127ed7477de290e4dc9def54d2fd6261dc8d669c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2V4BCZG%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjJ57kr%2FV5%2FGZnpP32KU2%2Btp1pJTo8OqF1sfa1FW4qTAIhAIiqjVtG8WYZ2pUQA891QknSS1eN7ZwO6wfTf4yuwEePKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2BIEsz1OQnJ9HLUD8q3APZMGLzThh%2BqAsa9liKC7NrUxpG6M35%2BWP93KhDz2nooIVdXBL31RRosSUU%2FTo0uQ0Ks%2FhmfCx4pk8jLJznfo7zMKYlcCY0mIGr%2FPg7fOmPypX6YnXrg30EloQRTezi7ZiIYumFxFGXi%2BHSW%2B5a53%2B6Hvi5RQSsu0TgrBaji0PtoMsq21rI0SKYd%2FGEHl3wMZQaacUqsN77QWHAhZ5HY%2BvojVzFfEmYY11jUXfVTrzmoMm57IhJuzFlnpdGD3GlVyNV31awmgTPYi0wzwGRvrPnvXfQJeh5KSnh%2FRG6LaDHCDlSRR0q8m%2BYNQbQaqsHBDGztuaMJTA0ysrsnERfnILppq7yNBFVUE84K%2BjOYriz6uK1YbZm24M4UXs%2FyW0O5firYiE1OtK7%2BXsqD1OYTI3qF4XlcdrkDUsbeUuuJhiWSkE4hGiibaBKoyQf3v%2BTG1v3LK0GZStjIfm3E%2Fg1A7nzRS%2Bjunruf5e7JZ21iSGsIc%2BBtW6bAlrimUh0fjK%2FwmKlh0aJZ2C1E5yGJ%2F65lUqDwyF5Q0BXm0JxYAMWEm%2FQofwrkwqisBIIXl%2FXEZrh70G2TeWlB1Zd3sS2%2FQ%2B6YP4jY%2FlDDVjj%2FpVgl3RcTyfGcDR2VHGcREcE1GtWijC1u7rPBjqkAUb2Yh%2FSCOZsYRtOkDY%2FMyBW9US5y67jgDyLiTJ5rsbQrBd6wI0YlcWrihIvglNvO5Zpm3fire4Nj8NQH6%2Bqk%2BqajYMcK%2FL5MhmKKvHTsD%2FlQ0J6YqFp21HSBnAatQc3FCZj%2FoJXAZB6dgbAX%2FsIxxKzTO5Xk1cM6PdFF%2BDG5%2Fl3SRQQOw4GjdO0NuG%2F9MQ60BBb3Zx0VRyHMPrJxcv4sgYXqEh2&X-Amz-Signature=e4ef04ca69177fea34d1fdb77afe3ae85ecba1fe0091cf63856258906b35980c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEKPQFQI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBN2%2FZjYZWl0kIfBvqZTayuVO%2BBFi4IgqlwtYQM9ricpAiEAk3fCtEbMcJP%2F%2FehMGsT6YqEulhGwpNVlk5jcABkQ3mkqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDExxJyZkD4reFhjPVyrcA7ItXe3K4S0SDZA3CNdFkH42tvOBzfIJXWP5A0%2BRelhmriTNHmsnFLzfg%2Fc3GtqZjkvDIq4YsW0fbHItsPQkEBBuFm%2BGEpGL7WQwLPm%2Bf7BrC%2FAnQnXyx8FJTqk9TKAB9TMTKz%2B2tGIA1yzmmJQYy0d7mXbSrlZr%2Bn9ltvHA2h73hOgheJCpB74GrHgnWRQPwnSWLlef6NxBMGTnr0HN7TpDki1hPOGRXUQaptWdZT86BnYACdjBUt8dQ2ZAecfohRiX8H0%2FeHyladAD5vGTYsxetGgwPjxtLAst2j%2BPqjrRjx%2B86H31DsllmyhI%2FJG7G0x%2B2ktEZlgSFtzkC%2FsbIytWLjhssdFhaL1BZv54dsbJWk8WIVYeUKqTri%2BvChAZ1WQGs6OCqncr5IuJuRNWlNFEaRl3VfBwx91G0OLfcjQpQLMzgnGFc2ZqRFaoJbWxZHKJhvvjKBIqxPJEEeirw3rv10mbsvXHtLOhNEDJXn9Kzc0n3C9A%2FnE3nMNB3T61I8JHXp%2FINEURnCJE%2BfbonOz%2B7YBdGk9xrj1K8mJ0aUSA0LiZXACbOQHLFUlySUL0Uo2AYTTrtzOpcDzQ7AcFTP77DBBh2ePzhu%2FlsFfoRPGOi483GVWTA4tI4wNOMO28us8GOqUBdfMXjbEamkFWmdaLujfMCDETVz4eH4PkudDmDUpCh4AeW6Nv2RYXVCtxm%2Be5S3VtV0J4TMvcAQjusqJedCbFP6MudeB00szSIuU4dj8BPrp2GsrKefSnbPeURS4WssYneZGM5BRDA4MSBWSfGdxYGYr0J2LDCzd%2B61rz2RMr1e8KInTH0tg%2BK1H03lA8RTRt8tPzfgVOxvmAwLU%2BzJUWz4QYXX5i&X-Amz-Signature=1c0cb29a061651533a7753a2f54acf1735bd5b6cfc5bdf66065031f3a56f16c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YIOWK22%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF1jiNtbuEvOaUE3mnOEio46GoiGYHaHxDRRDDMFWpgqAiEAt3jXdaW3U3iQ58rlULp1Cv7MfTDafEjBCVOKJZoTiEcqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEx7NEHERTD5YuRs3SrcA8GW9GF8D6sIsWx6e9Dka9Lh%2FWiaSGl8ybak8FvS6r48MTCZcALykl3L28MdmgZcvpJd9T4YKQWhnk%2BlthCqIKZnh0vIgUS62lUVUa7NQQi7H8Wk5rztdrAU0etBeCL3S6L%2Bt5fcI6TvVAYzCDumDNEqgKGmpVYe8VdYQE4u5teJQkqjd9aU%2FemJhLqrS8CA077lk6QVmz1ZdbX6GQ9VpOBr9BpYpsshhN3Fh6AOwMRymSpHHCk16eJi4n%2FjOye5srMzMg11tDn8Mmcc8tiV2QUJXhYm0esrpv8xMjfhNgoBKa3hgV0tnxEq66qoOvIjLJXVXEWfNZB%2BSTKbL51MkmZEiA3xDDKgNENUv1lxFQvUmN9vSSDHo44Pxg5WzMasNx%2BVNEkij93G4wd7YHWGp89taKJmgsEVOpfhf%2Fi8K2%2B44kRl3oA25hKDe12sKnXqbruITnV%2FF7ihHB8SVb%2BMUjWXnz23kh3Ko0jRc%2BaZSnL5wViUBz8IOe3BteKQvBn1hjJ90qCtfdn1BTFjX7Sw5JA28JeHak4r4iXD%2BfML1KZyh8CUaJT6iXBRRDxnHlZILFXnaEbP1LIifdznq5HAEkAVoh3obiiEOT4GhxEpSWdFW%2BwZUSUKL69%2FtjY0MKm8us8GOqUBfwc3qHYsFVpWW2GafiARvS6zNiRBB%2FEF1jWOWW5Jy%2F26hZt279lV%2BOZukz9ZQKD6BpvUskN1boiMVA8HhDk1GSSXLkka2fuK35ZQ1Vsj8uxTn4RsjqHRkP1GwobYf9BUG1Q6oAO7vKIuYmMqmUAHhpHKzjTOqPLhNOIR2tbOKkP0MOqtZst%2B0Cq30keaZaRTyMpVIvgIZ8ni9b7Q%2BcTCcsHzTlS3&X-Amz-Signature=34ff551f46d7e0f1121a17851fcd4c2b15953dd4a15af6fbf58dfe18b9a7a0dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YIOWK22%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF1jiNtbuEvOaUE3mnOEio46GoiGYHaHxDRRDDMFWpgqAiEAt3jXdaW3U3iQ58rlULp1Cv7MfTDafEjBCVOKJZoTiEcqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEx7NEHERTD5YuRs3SrcA8GW9GF8D6sIsWx6e9Dka9Lh%2FWiaSGl8ybak8FvS6r48MTCZcALykl3L28MdmgZcvpJd9T4YKQWhnk%2BlthCqIKZnh0vIgUS62lUVUa7NQQi7H8Wk5rztdrAU0etBeCL3S6L%2Bt5fcI6TvVAYzCDumDNEqgKGmpVYe8VdYQE4u5teJQkqjd9aU%2FemJhLqrS8CA077lk6QVmz1ZdbX6GQ9VpOBr9BpYpsshhN3Fh6AOwMRymSpHHCk16eJi4n%2FjOye5srMzMg11tDn8Mmcc8tiV2QUJXhYm0esrpv8xMjfhNgoBKa3hgV0tnxEq66qoOvIjLJXVXEWfNZB%2BSTKbL51MkmZEiA3xDDKgNENUv1lxFQvUmN9vSSDHo44Pxg5WzMasNx%2BVNEkij93G4wd7YHWGp89taKJmgsEVOpfhf%2Fi8K2%2B44kRl3oA25hKDe12sKnXqbruITnV%2FF7ihHB8SVb%2BMUjWXnz23kh3Ko0jRc%2BaZSnL5wViUBz8IOe3BteKQvBn1hjJ90qCtfdn1BTFjX7Sw5JA28JeHak4r4iXD%2BfML1KZyh8CUaJT6iXBRRDxnHlZILFXnaEbP1LIifdznq5HAEkAVoh3obiiEOT4GhxEpSWdFW%2BwZUSUKL69%2FtjY0MKm8us8GOqUBfwc3qHYsFVpWW2GafiARvS6zNiRBB%2FEF1jWOWW5Jy%2F26hZt279lV%2BOZukz9ZQKD6BpvUskN1boiMVA8HhDk1GSSXLkka2fuK35ZQ1Vsj8uxTn4RsjqHRkP1GwobYf9BUG1Q6oAO7vKIuYmMqmUAHhpHKzjTOqPLhNOIR2tbOKkP0MOqtZst%2B0Cq30keaZaRTyMpVIvgIZ8ni9b7Q%2BcTCcsHzTlS3&X-Amz-Signature=3e0ded2b210542b738d956e3e3d225c8b177c04c2c9b098be97ac3474c6de5d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSERFIYK%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDV37ZTk641IHogJ2kpo8oQn3e6wqaRCyVWD9qwUHZWrAiBn0AMDrtVZSCuxApZAAVkfqD%2BiYxV7Z46ihZVJc5y9iiqIBAi4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAYqqRCHPFmQdhF2NKtwDz7JTXHMJKPFyHuHr0cNGjTMt30%2Fb8xv7FuKz4Hco8KbSP4xFZArI9x0fVK5slscvmIW%2FuL17jLwpLxRXWiMuFqo7jGTfIgEx8hAtYNfS3aXpJAh3qOTfH16MQzgZazcen%2BSna3ZJFP%2BrKGny%2BChPV%2BIPg4la%2BlLJlPT8Oca3cTTf0caRWE53lzIdH0ol7yuCxpzI2GAGTdZtp2jqNHyp8sxl%2FUJISo6vRBInqVgVRtQwBBPYbsVtj3JJ29%2BpQsHbiQsdhiqVwwF%2Fb6uf7QbFm77CxAzaiBAGviWPRAughHPk%2B%2BJ8ucfH%2FHUDJN%2FWNhfV2TSLM0EeTKKBpvyaHcXXadxEJPAu%2BCkaPBM8tAuVu9m3rYEIyEdWHf2hkMSUlkgwwQ5lXBgrYSCkxaHZCTVrljW6%2FT%2Fpq5MroeD1BcvxSeOSfVXjtBSMh5qVD5wngq8jOAAEZYcPbTiUmxajvZjSI8NjSdeMvu0WsTG%2FLcubUvON%2FWlVGCzyhRkw3374SUGmNVnR2WBJDFZT5wHY40kOOQBEON4oIBD8fHSol5406cWiYTw5Sm%2FKFEWkjzNFEFRPBkiJc0xiDKl8cRqh2LghoUGloFYSOkmQLa9Il0ESvKAdrSRIXA2mHolOSewwrby6zwY6pgH4fYFoDgELFKInLeLfttd4EaVB5Q7eLOMdPiKkV2eP1Ryw1QIOjtvBUq9%2BUwgtLQ0H%2FcWlBV1T49%2FD6%2FCVOJazeEVw9WtebMgEz3BXF7yp4%2B6sB1QqrTVyqtKf6V%2BObSPrAiYyfLWqAkZ3XaXYBK%2FDjUKC4tEmAtPtV2yIk2RpuFc5PcWCdCuApJCPEZbSpMQRmTzokLqSq4KWSfj6GtyWv5bNVzZd&X-Amz-Signature=b37981fc3f45f2fccc3ba4b223052fe3601c9be3862e014d198483c811407a02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HTEKCN4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDtv0LqzvXZ56w%2FinKWgdf8THhVybsUeq1fjxBxKJfUxwIgD8pngouS30gAvLwODv%2BBn0z%2Ft7XkMgCT35IEbFBMN64qiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDpshqeM03Phl87okyrcA6bpdZJ8cNKeeAzaIH0YEFakSldvlVq7vW5%2BZW2OqDdoQqHr0SCkm07vMCJOde0Qd3QW6%2BSr2TrVo5e455prdcvjqin6N8dz%2B%2FuoUMqaWS%2Fv7lPw0LwrcuGrJ%2BZ%2FG2SjOaug%2BQL6T9Z%2BnMZuJ3UXo8Mpjkr30qYxl%2FOwm1ZU4IWSO3OcsvCusmxamIJO1DHOKUnZE5rx9daTYcUaexKzzlJlwp4NIESNyfzrEyjK62vlKHw7BXTy5DpzpHKuFdPpdviNCYjv6d48nVpeTKHF5S5cNV9yYe7Ib%2FdQPg1dJrgooFugAs%2BFaaRQ6UZj1iXdWbpaZlp2rk%2BtiEnVsKKT6%2F1THRgHt2CoYHeFSSS%2FTybVbrKz1B6ydNQuCPdMD9ueP4kyFXH9PGgCw4bt5YHfTPGBSntuSFkgEGdHocl0A7Z%2FZEnsmQhAcsbqVmVPc8SlRMec2LVDLlQ0s0pTjXiYllXWW%2F13YGlqKliB1cIjHcAZE18r2RAypn1hHBgxV5JLQJ7InllVeapGmj2XO1OXAArTUNL69XTYwu3%2BLeaBJVahoz8I5xQBA0BGd5554nce9rySWUL20wjC3QDwm21tQDLGki%2FSeqTk6RE1a4Hd8iTtm9Diajk%2BXQbjia1XMJm7us8GOqUBTJRNFj64E7ddDiRrkM7KfpQfTdGAXOZawM2Mb7E3Y5wLhY3gJMsi%2FZ7lCbz8CVnl8etpbICyRB6hQlGFHX%2BtUUBNPaRj%2Fm2Gnw1KB98kTTh378vQniVw8wWI%2FJCA%2BwtsdrfTLGQFUMSL4Iw5CBCorUiXexpDDSvMA5Kspyk13T0QFljnRYWlYhJVO7%2B%2BC1KMPx1QHcZuClbJlgB7Esb82JZqE4w2&X-Amz-Signature=b2973297020660bd5b39e8cb0bd8ae8356255c915553e794486c57e28afab546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HTEKCN4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDtv0LqzvXZ56w%2FinKWgdf8THhVybsUeq1fjxBxKJfUxwIgD8pngouS30gAvLwODv%2BBn0z%2Ft7XkMgCT35IEbFBMN64qiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDpshqeM03Phl87okyrcA6bpdZJ8cNKeeAzaIH0YEFakSldvlVq7vW5%2BZW2OqDdoQqHr0SCkm07vMCJOde0Qd3QW6%2BSr2TrVo5e455prdcvjqin6N8dz%2B%2FuoUMqaWS%2Fv7lPw0LwrcuGrJ%2BZ%2FG2SjOaug%2BQL6T9Z%2BnMZuJ3UXo8Mpjkr30qYxl%2FOwm1ZU4IWSO3OcsvCusmxamIJO1DHOKUnZE5rx9daTYcUaexKzzlJlwp4NIESNyfzrEyjK62vlKHw7BXTy5DpzpHKuFdPpdviNCYjv6d48nVpeTKHF5S5cNV9yYe7Ib%2FdQPg1dJrgooFugAs%2BFaaRQ6UZj1iXdWbpaZlp2rk%2BtiEnVsKKT6%2F1THRgHt2CoYHeFSSS%2FTybVbrKz1B6ydNQuCPdMD9ueP4kyFXH9PGgCw4bt5YHfTPGBSntuSFkgEGdHocl0A7Z%2FZEnsmQhAcsbqVmVPc8SlRMec2LVDLlQ0s0pTjXiYllXWW%2F13YGlqKliB1cIjHcAZE18r2RAypn1hHBgxV5JLQJ7InllVeapGmj2XO1OXAArTUNL69XTYwu3%2BLeaBJVahoz8I5xQBA0BGd5554nce9rySWUL20wjC3QDwm21tQDLGki%2FSeqTk6RE1a4Hd8iTtm9Diajk%2BXQbjia1XMJm7us8GOqUBTJRNFj64E7ddDiRrkM7KfpQfTdGAXOZawM2Mb7E3Y5wLhY3gJMsi%2FZ7lCbz8CVnl8etpbICyRB6hQlGFHX%2BtUUBNPaRj%2Fm2Gnw1KB98kTTh378vQniVw8wWI%2FJCA%2BwtsdrfTLGQFUMSL4Iw5CBCorUiXexpDDSvMA5Kspyk13T0QFljnRYWlYhJVO7%2B%2BC1KMPx1QHcZuClbJlgB7Esb82JZqE4w2&X-Amz-Signature=b2973297020660bd5b39e8cb0bd8ae8356255c915553e794486c57e28afab546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZZ3EW23%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T232635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDYTZUNxpwDrttC585NKNoXlOZkph79gT52IYtKUM%2F%2FhQIgdWSceYmet1GgfOIxzvvduxrnYP6JuQvspTTBG5Yfc%2FoqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDID800hBQt85YWk6pyrcA1qD%2Fm4rEWLAxVmggXW95clZGBoS0RY6HK20P7D4eKZBKeoW9y584M3U%2F4HVbQbvmgFnFtm2gmeFverQi4UpX8t8N5qh1rta8hX%2FEtT51FMz71sNCfx6wRPs269n4X2JHNcyjK4xIm%2BiTHKdggh0j9MATmQIhzGxgzXrtAJt%2FvSYp27%2FDuFzwE7R7exB%2FSfqgRFtHdwQ60bCYdv%2FrAT35hQMwpS7ZYu0cVXkNcoSo7LD2zZi2rL7ROUYOafeuMCp7j40Xnk5TykU%2F3qbcGp6OGMY0fdA5G%2FTgtd1zjfc8t%2FrmUBltRRJT6%2FJaSC5k9VS6VU%2FC%2FMz35rIpRYk%2FDz7hWK7vbo73R2lKykrSRmdMZrphB3mTt1Rx0QG8bdUmwvjDadspr6ZN6qwYCXassuUG0QG1TsjZa6Qa6mW7beSoCJJWw3h5KTL3M%2FinPPshaZcAA5g6NiwsfByxm375hDQsB5xaSBDZkk77iBZYFWApBGB38Wr9Lpyvibfcq%2BzS71zhvr%2FeGSJhg%2Fp2e04DEHn5OQc8dObTvn6LbtdWDnLtSCabECyo6PQm9fGESU0%2FC9dfvatUb%2BCpgQRWmo2yqe%2F5Gp1McMn6UROOQ1se0AVQYUdmTGkcpvGuCMo1vA9MPK6us8GOqUBZ5ARJbKltsJmkPg%2BaXBgOP5%2BgdP1kYs13%2FypwezQapWEOrVm9CiveoRjKGg%2FiFB2wnXIev83uruoMTL%2FGXi%2BwSR%2FUUxthZuI8KIF8OhBw72AILI6feIV%2FxtBcok7ZN190scoWm6BT3nDewzZSyY2KJUMHIMjeNyWr2JwRf5hDvBuK7ydpwUujD2d4gvXqrK5DlvvB%2FjdpK0A8lyoMotUqdYnb%2BHE&X-Amz-Signature=e326b329582bd713f623530b47fa6ea3804f10b91f468502a0e27d1d75fca1b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


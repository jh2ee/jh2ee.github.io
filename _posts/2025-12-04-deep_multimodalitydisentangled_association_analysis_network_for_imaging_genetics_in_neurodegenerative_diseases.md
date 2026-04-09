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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZIQR35B%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDniecmd1Gb3sZ%2FIcQPJihidZI2mwX%2FnGHfwmafUYatUgIhAL9ewMN5Af7PpxOrE%2Bv7wL5JyLBRiqg8XAJ273L9K4tQKv8DCBoQABoMNjM3NDIzMTgzODA1IgzuEewggV%2B3ANXRFqAq3ANjDP5r5Vnlezx5iyewaQ6I2ohAkV179%2FrDPNz2CtGUuiBXEO1PgzXXXLIvbinoUjGoCLbSK2nfz0vPp7xdBphLPY5Jw%2BNO0glF%2B0NHoNGM70lvJXtSY9NOgwL43U0DR%2FxPZdUkqOVxlt9Okj2gsV5yaPWzRTxUK643Tds4J20PVD05b8r8vXS8%2BSY%2Bnd22GeMPXcMUVHbrQXBwXZildZ3rvG6pIm26Y0k4cM1mUJrsE998gVlpXv44iqk5O%2Fnq6gOyHKE7U8e%2FWccBOdFQQu%2BoAw32lOxasg%2BeGkpiQWYIDUjno8uPjijNCJ19pDMmDYTDAaMu8Ew%2Fa4ZYIjiH4dbo%2FOTtShZbMSKEoxulK2KV%2BIMo5nuxrlnYW%2FL8s1vGBuu1UPuD6a7pZCHtdTDtz%2FLe8al%2Bo0mpsOKvxX0CKtpkq0jiOqRC5S%2BIaPpCXbsK6rdZ1nCK%2FhuTIjWi9shBrcid%2FqH00lalvIsigvV%2BiLCSh4Ku3rEHkDTztOWinz8yCNjgSQ7%2F2tveFKWg6AJ%2BlXzvSD%2FakZnbvbYtfDlsuY2j9JAXnpQEmC6xcFUUmsVFpF8Wqs%2FATwggcXNO%2Fufg5pC81iRIzXORh1fJiJCjllLf3StOh3wUz20MCdPPkTCMu9%2FOBjqkAf6r%2BwmnBNRTEViutJAWGUC%2BLSEGFQHKnMMaHj15XJjr3tdAJAKCgzkxXAASJEN8NJNn0qi%2FCFsP4P%2Fv207fLtafIny0mhUS08K700BmL3f8kYhI%2B%2F9Wv2%2BHLsoO2J9cmQJTYUudDlaA7JJADCdP4ux%2BHsDJHrdgoY%2BVexoX8S7RxBJdHTS7JLTyNLjFzClgbvGJgFJlVQwu%2FiY8rnhzl7Im%2BNkS&X-Amz-Signature=665f3ed79e39100e05a11c6d4a902137c1785b1890b869bda74f09f181bf199c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZIQR35B%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDniecmd1Gb3sZ%2FIcQPJihidZI2mwX%2FnGHfwmafUYatUgIhAL9ewMN5Af7PpxOrE%2Bv7wL5JyLBRiqg8XAJ273L9K4tQKv8DCBoQABoMNjM3NDIzMTgzODA1IgzuEewggV%2B3ANXRFqAq3ANjDP5r5Vnlezx5iyewaQ6I2ohAkV179%2FrDPNz2CtGUuiBXEO1PgzXXXLIvbinoUjGoCLbSK2nfz0vPp7xdBphLPY5Jw%2BNO0glF%2B0NHoNGM70lvJXtSY9NOgwL43U0DR%2FxPZdUkqOVxlt9Okj2gsV5yaPWzRTxUK643Tds4J20PVD05b8r8vXS8%2BSY%2Bnd22GeMPXcMUVHbrQXBwXZildZ3rvG6pIm26Y0k4cM1mUJrsE998gVlpXv44iqk5O%2Fnq6gOyHKE7U8e%2FWccBOdFQQu%2BoAw32lOxasg%2BeGkpiQWYIDUjno8uPjijNCJ19pDMmDYTDAaMu8Ew%2Fa4ZYIjiH4dbo%2FOTtShZbMSKEoxulK2KV%2BIMo5nuxrlnYW%2FL8s1vGBuu1UPuD6a7pZCHtdTDtz%2FLe8al%2Bo0mpsOKvxX0CKtpkq0jiOqRC5S%2BIaPpCXbsK6rdZ1nCK%2FhuTIjWi9shBrcid%2FqH00lalvIsigvV%2BiLCSh4Ku3rEHkDTztOWinz8yCNjgSQ7%2F2tveFKWg6AJ%2BlXzvSD%2FakZnbvbYtfDlsuY2j9JAXnpQEmC6xcFUUmsVFpF8Wqs%2FATwggcXNO%2Fufg5pC81iRIzXORh1fJiJCjllLf3StOh3wUz20MCdPPkTCMu9%2FOBjqkAf6r%2BwmnBNRTEViutJAWGUC%2BLSEGFQHKnMMaHj15XJjr3tdAJAKCgzkxXAASJEN8NJNn0qi%2FCFsP4P%2Fv207fLtafIny0mhUS08K700BmL3f8kYhI%2B%2F9Wv2%2BHLsoO2J9cmQJTYUudDlaA7JJADCdP4ux%2BHsDJHrdgoY%2BVexoX8S7RxBJdHTS7JLTyNLjFzClgbvGJgFJlVQwu%2FiY8rnhzl7Im%2BNkS&X-Amz-Signature=665f3ed79e39100e05a11c6d4a902137c1785b1890b869bda74f09f181bf199c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEZMJJQI%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCUO0i1aK3QqOdmVXhhr7y%2B1JxS0svUdRnW3zGiT%2Fi2dQIgV787MdC78GGMBh8Zws%2ByESNRVVGgUzpxmfiZw7m%2FSkEq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDDOhGuks7cR%2Bnqhr%2FyrcA2ZrFa2Z0cDITQe%2FpsrIzgmk9CkNJc7Xr37fwEjTEm1X0JiuZfCs4KmaxDp2bAJTMgPwT%2F7tvFQnhvjJWe5MCBcr8Y%2BjE3fTA2lWfwlkNHUIZBq4HKMFzMgmGFlLZfbqJ5hQ0nzoDBIAj0xaUCHGcCS9Uq7BeQGl5p32ZhaMrJaaWzwHzGd3yOm7gB67GKObt1xrLrGZhPGs8jagZ9%2B96lIJ%2F0I3VdpiYMrI1EfHu57Oo3ZuiQQjznI%2FZmy4OqvXXquZCF3Gsk%2B3UxpLMl%2Fs4Mx4q66dBbJasS5uhM%2FE27Uk33my9oM7LDvi9gAtcgG5WjONzP3EhyJ47gYHyWcoKyc2%2BPY5fx%2B7u2leaLu4yzDUnbeZR7gjoNZ747vR5YxHCdHNI5g4kgEhlyejNspbR061vCh%2F1uXM2qgBiu4qrb7vEON6xtsCr1%2Fe3y99wVLpdEYcp%2F7lw3PBFWujvZFtXlZNMADT%2B5MI3BmyL3A60LECvfpNUXIlgzl165s5D%2FEo90%2BOUEU1JzBiNxmQb7o7uYtnDQUpiCKBMah10lYv%2FXT2TNePBkooFEn1%2Bi9IGyaqf5FzrDfilDq1Rk1sDJRtvSBcyApl1UDmQZ19CgNqNmjK8%2BZgIEScAlpWcdXRMJW6384GOqUBP5Iiw86KdPjKF9rhpauwIz64QdpZSBlETxzZbL%2FMmSNWTxtBPj6Zrr3s8fREManjKO9m7HIgseamEDL2v7AV9qUn%2FVff4wCTOxZp8ovLvowcET4kHE1F6ocem8IjYdY5oRA1f%2F9LvdoLFAI35Ze4lbKD3teuO83kzle2JNYD69zDEgkNstz8rkR83qT99gGOfkKDQb6jdD%2FcRBgeCWc6PweU56Wk&X-Amz-Signature=4a7f17bc72923aa448f6bb171c45de9c3966b99f0ca4f535b896d0d8b0dc03d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466424XYOIF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIByYliLyqA8k%2F7t6RKWclTrAO%2BXyqZHOB9AFinV6K8Q1AiEAiNLez5S8YMuinv9Zk%2FnwSCY5eYqKGNn67PQyDh3t3bwq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGaaMfTNWX%2FVBSDIjCrcAwnDhLK7zqbGHJD7D47ibtQ7Oz7dXazAzXXtep%2F5isRwLJWjNyeVJbvE4Iol9NxFO0CcRqoW30LXBJLMscGbJtqnxsbGtjpS9iatAu9NtyboRRGt4LC3BjmmvptIgz1fx2cYS2aqyjhaeogODuH2DY7ME4a%2FiBnfqVvofqGj%2F3ufPBKx5MrftPbRbrRxkH90BEtgO2YnzgbqovugrFA4DeNfteC1CUTjV8yS7ZGk7WyXcbimS%2Fo0AIFAaDYQ8B69E2IL1IJi7jIcGFRfL1OdnHPy6KwU2i8%2FCJkbj0k4xZDE8vutr3UJS6NVLJkQdRvO4rr7MzjfOVdOvE2GHo8XPFV5zYEBZ7UJxjLYZipUvMrQBV%2B3B%2F2LouTjaLP5JkKot3rEhyitsLOTeJYE0aFPJxIHT%2BBo5jp1DYXvABNo7mqgtvqE0TkMsl1C3Wz2h%2FISlCfaUt2YmSUEZ31E1W6V15tRI7nclEWRAQMMGKhNSnSGmK4IzRQIM8GtKblwj8I4ZMZUmDaHpSQCN95Ziur33hcETbDn1529qC3QdmIzuoxXE8XblvT7P2IcO%2FO0RPltfDP3FCJsPmDKt4yXOrAT%2B2cIvNdo%2FhKaGd19QKFPYoCorI3Rv8b%2BhjjNopRQMK%2B6384GOqUBRRvFZfcuGI8icI3EUiDOVZkuW3PFbyZNr2Xl4dM7cL0ENUIpYW811aym3VDcBCMhWwxEDnBDVm%2FLr9NGa2moROUsK5DtscJUuc43bmeCp%2FNe6QBOJE9ht2jxtA1oXFMd1zpaEmFdhrJwMkwLQWEOk136pJ75zthM6Ro8FgOwdgur6vrqlec3t5Jt76KKYRMjExr%2BwF3fHK1jtEmkyBR6nfYvXfXt&X-Amz-Signature=73b5d18a8e7ef017c90b76026bc59fb73578a2f5dc5015b5ec7261494cadc8c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466424XYOIF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIByYliLyqA8k%2F7t6RKWclTrAO%2BXyqZHOB9AFinV6K8Q1AiEAiNLez5S8YMuinv9Zk%2FnwSCY5eYqKGNn67PQyDh3t3bwq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGaaMfTNWX%2FVBSDIjCrcAwnDhLK7zqbGHJD7D47ibtQ7Oz7dXazAzXXtep%2F5isRwLJWjNyeVJbvE4Iol9NxFO0CcRqoW30LXBJLMscGbJtqnxsbGtjpS9iatAu9NtyboRRGt4LC3BjmmvptIgz1fx2cYS2aqyjhaeogODuH2DY7ME4a%2FiBnfqVvofqGj%2F3ufPBKx5MrftPbRbrRxkH90BEtgO2YnzgbqovugrFA4DeNfteC1CUTjV8yS7ZGk7WyXcbimS%2Fo0AIFAaDYQ8B69E2IL1IJi7jIcGFRfL1OdnHPy6KwU2i8%2FCJkbj0k4xZDE8vutr3UJS6NVLJkQdRvO4rr7MzjfOVdOvE2GHo8XPFV5zYEBZ7UJxjLYZipUvMrQBV%2B3B%2F2LouTjaLP5JkKot3rEhyitsLOTeJYE0aFPJxIHT%2BBo5jp1DYXvABNo7mqgtvqE0TkMsl1C3Wz2h%2FISlCfaUt2YmSUEZ31E1W6V15tRI7nclEWRAQMMGKhNSnSGmK4IzRQIM8GtKblwj8I4ZMZUmDaHpSQCN95Ziur33hcETbDn1529qC3QdmIzuoxXE8XblvT7P2IcO%2FO0RPltfDP3FCJsPmDKt4yXOrAT%2B2cIvNdo%2FhKaGd19QKFPYoCorI3Rv8b%2BhjjNopRQMK%2B6384GOqUBRRvFZfcuGI8icI3EUiDOVZkuW3PFbyZNr2Xl4dM7cL0ENUIpYW811aym3VDcBCMhWwxEDnBDVm%2FLr9NGa2moROUsK5DtscJUuc43bmeCp%2FNe6QBOJE9ht2jxtA1oXFMd1zpaEmFdhrJwMkwLQWEOk136pJ75zthM6Ro8FgOwdgur6vrqlec3t5Jt76KKYRMjExr%2BwF3fHK1jtEmkyBR6nfYvXfXt&X-Amz-Signature=2f5ccfb7be3b450c77740b13087fa1853e9181f61cbcc600e995fe795490ccf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY2DOOH7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCE7gV2Vr6wgDEIQ2oac2Vf2ZVAGWE5eERIAKREuA3AmgIgAQn9%2F6BLDDTbFlNRVlIMV0cS%2B8EhJtiOOudJ%2FNtyHrYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDCegSmOTPuBa381i%2FyrcA0xCL%2BEGhH04nJ5TP0qjvr7On%2BjWGVRhBnl7ns3ZCBcZrOTsNZhs4ADS%2F8KMlyLFpkSel3drdkkNw0NTT8gpE8kafJfLpP9bXELF1Na6NGnt6IV3fNjuvAiEwNQp%2FhGaw0fiP5%2FSoAyqJEsmv%2BxvINvpL85zXlzRrvDiM3dgYhzmbsq5lYVHd7%2BprxewFS1TyRzKwtBc2YTHD1l2bD0%2FBjNBBVE04cxdKGCI6xPWvWpIXyv2WoA%2B1nVA%2FQdbbvRK%2FI%2BkqTc8yLUmPuED%2BQp5A1AxXNslipffX5UfqyLinvQtLg3UcpTlZGM4heVUkl90nMfXg62%2F9%2BfogoHAgjfYppjfZmUCqAbqiomLghPhjo0QOuak1nCaj3dG0YZHqLS91XSYC1fGVi5IQNDAVmhWAY7fKNdZk0MjNzvxlpLwKa57MS2roETe4T%2BpBUWkswuxcWH0RCGWr5K58uGkAO5QNdEuEJI7O4i1jhKE2yONEww5odxUhasixSeNYhPs9332SmVOfW7OEEETAmBTpxjtmOFqz60scBmj3%2FP5Ay3WQQE2I53u1ynOQJ6%2FSFUtWv8PJP8JzMPOUZDVSgWakE3DRqMiQSfo1IdM0eVU%2F6yTdILmFq2ys1JH5o1EveBvMKC9384GOqUBMxQhh3xoeWTA%2BEStMFkWcu9SR0COT4Jm7Vgi%2Ba4u%2BAviACMuG6NxbXC0uZLHMQex0jlUUGSZ6Iy7ofg%2BM34%2FkNiWS1tNtjBTsoaHjJ9Hgd1HKO4m5UVmmGremtIa8SXSpxoqwhXqHWTj%2BrSO9eDrQTYq5BSrmk04IPjMGyIiYwEN88sHMvjSmkPhqQuuMa%2B0hCBLWWslX37wlzzXMV1O9NyzHIiK&X-Amz-Signature=3d8383a43c39de128342417749a41e7cca225d4009a8578eba1e0d1e42dea158&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673GHXVIX%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCctIo%2BNdK7KXN2fGkJpiOqYaYS5JwdCoocZhd%2BIM0ztwIgRwEWDU59OCKqMkTGPs2WITa3kjpvTBHbx8ONZhnZQbcq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDHaeEXP8iC3ydXGJPircA7YBlkPGdxyg%2F5RiI8rTdfku0u9ljqwP9v8dP70gV3WpYKdYmNY%2BaVzPh0wzokZjazjjhvodIfmO83oACIdDmOhBacVxickFA%2F1YszP7lS3v3ti1P0q%2Fsy5TA5FqRwFMd%2FXghwSElR9Lhung69UBr5FI1RdykLGiPDf7neoxBuWLDVO1ebjybBswkiambda8lcj02PbQzee12SGFVic7ZOlkx9i26T5t9cKv0AVUW9DJ1Wqp%2Fmg7XAPLks%2BurkxWH8A8j6j9LYfjG7FPwUR41RDlKDUc%2FyEaH%2B%2B834kMH2cM4Qd8nK5Ahen8p6Y4cbHZ1X91U%2BIoxYISJQc96mE7CM6r%2BrjkIKMuFqjNqvwQ%2BuQ6qY4WS8g%2BbrtDNks64iGrAbJVJo4%2FIBDwf%2FM6Q8%2FiFB13VRDJpmQCSpNZAWO0GEb7njOPUoYTCBpjJJK7ULctRUnWNw77txMw6lWYUKx00yKDcaqYq6JLCeaKYQ%2FqjsLa1YXSpHZOL%2BC4hPakR1UD4zLKLsQNqkXVTklSnfFASzlsMUv3n0N%2B9eLrRN3T%2BVmDBBrHtJJYFQXCg9yWUCyqIgD0wSO7aHOuggJCJ4paeHN2XS0Oo50WTn98QxkSmzdtucWt3Gq4wZpDXcbkMJe6384GOqUB2qA9pAa442iQEsRkcamYsP039IQN44j6mDhrGdt94M98ScWZFitNJP3zTDFC%2FYb0Qi3bWB50nztX33I86gIwwDsN9CT3DoLtRSLzdcmjSWvtsyXLjiIpmSrfd6k2RMNpUvujohupHR6fyz8JB4yedybaww9eyR6ksjUmmJ3lFUK62TF%2F3thtrj%2FrAsm03rru5%2Fu%2FKpbL2YXM7JKGx5fHw0n0ePpn&X-Amz-Signature=c5b0a04a024e9fa0742de73c36c76f0701ccbf739a5efd87d659f9d0ec651fb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665V4BETX2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIEyvgIKj8X%2FG807XPY4h1PLRRrSxKAIMcyYUFK7blQPKAiAX4%2Fq2aRCXPwlYlpSd1RfTsKMrIDL6JLy370%2BwHHoIsSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIM7FiIu%2BAPtLcCNJuAKtwDpk%2Beutp%2BYI4TIaDFs1evSd4A%2FPHZfVzqdDEvG3L7tOh%2FzsTrNtCtks1izjgaizNZhh7TE35%2BU0wK921PY2EnW4xpc9Lwo%2BhwJPrCYeOpZe%2Fm9estobHahgJMaRvnkFMwM2k1LczAiq%2BsryAlyvdSQ1HZ%2FBn%2BRr44imwRzmky%2BVzHYJ%2FOz%2BHPfj4x5pvRpm5%2BEMIHPhEQUs4lcyIkBkD6zy3AbGF5h2xnap1rmn3XgeYTZyEi7AqFWT6iRWPfyTvF1CXsScxc7cGH56%2B9ftk%2FTB9eaYRRy7JYwsNg3IrLe1NIPdUczCWD%2Fgk6ShdhuT0TZHWIGKlwS7bwBQkqLMOD3nGHKYNQ3a8n6adDxhLxHw%2BeIkv9nKoA9Oa5fX4kxNQrMkDmIP41ldcgrRyscJbZLuKpPSHM51ISF4vMHmR%2FSzEMvCiu5GAiFieFp%2Bfz2EnfkTdC1qgM%2FNT13WSzNytp7BSp1Z9%2F6SN7jONtY%2BIxhwqpTZCCnlYDp8RQT0QL38MUWlm5vlw7R8bkL22WeAgPGfTUlstytFDnMozCVzKZwWRsclZRjjXtzh8IcXuuWy8GWgskY2iD4UC5u9VLTSNNCUVUfLhFzfkb9Sydlju8bltO%2BavP9riWCaHsRO8w37jfzgY6pgHJngqq9cw9LktFDQGPRetWp996CSf%2BVUlYsRXpsPypTuAAyrx8eUnvS4av7mtvn34cztH7UhahnXcK4A%2FzMH2zDfCZ6pmzZzqecXpX50wu38XIJx9CslHSrzvCDVXWoVl1fzhKfrwyxTRyPoRD2sXx8jWZksadaVWiVedQDQwpGposSE4Blv3qdfjaeR5Nq5YHq2u3vV4CfLL97I5H2fE7BaYWE5BR&X-Amz-Signature=7174ea5bbb1064f4bad93f86875ee4638a1650a7fd0bd1a1bffea76809a33ce4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSQ3AL7V%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCICoHqkU6bX6hRYQokHfoq9zZ6YbghcY7q5QU4FSZutG9AiADXG3%2FCBycKZg80iewiSAsDGSZcijVbRtd4ouCYoPKnyr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMZ%2BlWsKjDsEQ98uMkKtwDbmMW70ZSMCzimeCINdm8SB9WBv5T1wxv4dcmV7Nl5r3Pu%2B86GK0CbooyjKUydPW6ChlpGXnVaU%2Fd298e7DDqqV9tzjpaAdAANh1ePSLrkhcFsOF7OAxawXMqrC22OZ4GUmQ1IuE7TswXm4HNslQLQcekJ9KR9JpEfOmhNWcgPYMLYEIPEZsG5L6yCPy0wljF1N1NjJzLesSCpvcKp%2BPcqs%2Fm8JnsWgzZ6eRdpINRHEt7gNbQVJMpydoNEHKoPabbm5S32yMw4b0cN9Zfel4IiCBlgq%2BbxoUJlO5O7H8HCnzb8y9Ksv4MVaaadqZoW58J1GJwZl1qO17tzHO0sgQ2XOnRUjcCc8vKmi9l82ZSdBzuE7m%2FXDib2Al7%2FqVVetMLy6mamIdk9mOWNiXOF16%2BUoWqs8HUTx15CanJorhUbqsmHnZn72KicfLWvi%2FkYy3GUIAdQN1jo7uiicIJUa2Wxd1PxrsuN4xPqpsFK4D3ww9qI2IUSfTeZlxh90zjmf3bJqu0z3vkxmH%2ByObeGi0HL7FMhQhpSECkHnQi4%2FDiSxHTvjPN%2BaZbPXsGYfGR3zfjwa7IfJ631FQuqS2qmWo5I4NtCLL7YTBGEYyMiynkvVRSxsEr18rleEF3qbowlbrfzgY6pgE%2BZzPc1aGFOMkSSriS8IpvA3rcJtHupHhJdVdzxYxgU62rmsbGGp1dWoh8nAFpozHlE88B0WwBOTb8thnN1EK6lLzPKa%2Bgf7qmyVdzMaBp%2FBxSR04JBkbaiQPXaYX%2BLD7vtf9kCT3%2F9n0e31Cea2BArga6KOcPNF%2FqRHZoXUQk9cV%2BbCgzMpK2HT4j%2F%2BUeLGT9k68jXLmrQnWvpwSdCRtuiWabpIkq&X-Amz-Signature=667aedc0fb7ddb7ee9bc0852304c3579bc75b06376e9625cbc0d6b46fbcb1859&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSQ3AL7V%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCICoHqkU6bX6hRYQokHfoq9zZ6YbghcY7q5QU4FSZutG9AiADXG3%2FCBycKZg80iewiSAsDGSZcijVbRtd4ouCYoPKnyr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMZ%2BlWsKjDsEQ98uMkKtwDbmMW70ZSMCzimeCINdm8SB9WBv5T1wxv4dcmV7Nl5r3Pu%2B86GK0CbooyjKUydPW6ChlpGXnVaU%2Fd298e7DDqqV9tzjpaAdAANh1ePSLrkhcFsOF7OAxawXMqrC22OZ4GUmQ1IuE7TswXm4HNslQLQcekJ9KR9JpEfOmhNWcgPYMLYEIPEZsG5L6yCPy0wljF1N1NjJzLesSCpvcKp%2BPcqs%2Fm8JnsWgzZ6eRdpINRHEt7gNbQVJMpydoNEHKoPabbm5S32yMw4b0cN9Zfel4IiCBlgq%2BbxoUJlO5O7H8HCnzb8y9Ksv4MVaaadqZoW58J1GJwZl1qO17tzHO0sgQ2XOnRUjcCc8vKmi9l82ZSdBzuE7m%2FXDib2Al7%2FqVVetMLy6mamIdk9mOWNiXOF16%2BUoWqs8HUTx15CanJorhUbqsmHnZn72KicfLWvi%2FkYy3GUIAdQN1jo7uiicIJUa2Wxd1PxrsuN4xPqpsFK4D3ww9qI2IUSfTeZlxh90zjmf3bJqu0z3vkxmH%2ByObeGi0HL7FMhQhpSECkHnQi4%2FDiSxHTvjPN%2BaZbPXsGYfGR3zfjwa7IfJ631FQuqS2qmWo5I4NtCLL7YTBGEYyMiynkvVRSxsEr18rleEF3qbowlbrfzgY6pgE%2BZzPc1aGFOMkSSriS8IpvA3rcJtHupHhJdVdzxYxgU62rmsbGGp1dWoh8nAFpozHlE88B0WwBOTb8thnN1EK6lLzPKa%2Bgf7qmyVdzMaBp%2FBxSR04JBkbaiQPXaYX%2BLD7vtf9kCT3%2F9n0e31Cea2BArga6KOcPNF%2FqRHZoXUQk9cV%2BbCgzMpK2HT4j%2F%2BUeLGT9k68jXLmrQnWvpwSdCRtuiWabpIkq&X-Amz-Signature=a6f6fc9b9e47a1109fc4c20a700bcadf87532a895ab92e99a6ac397e2aacb799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TK64DBK4%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCXmAEJMW0Vfc9umVQ7LhO7n0GtZKTzEm3EtN9qetaKzAIhAN3FYX61b9ROG33eu5ITlcLU6MYCjzCQx94qCH%2FKhUSnKv8DCBoQABoMNjM3NDIzMTgzODA1IgxfPdTkTPR0NATFLS8q3AOp%2Fe2J0WGemcArsGdBOEz3RZN8p51rdbeTyULpFjGqqR0OWMY4mVD78D8c1gwjtaGXuqKLBl28QQR2V%2BjZ3PFDsXe14UgCgkjhkMEAnyf26qr%2BGxmzKDHD6uVl2cMJvp00t2Jdv0CmMnWuJfQ3OHm6s1URArgDnzdVXs%2BN9v%2B%2FRqK7db9Iku%2B0%2FoVkUR6oDJ5psZ0XAOSxnmggRATYoQd%2F5BuR9t5iIYcYYEOKB11ovXfPGJsGz0RYsfm8iEMK4QeKNz4tSRS1Ej5zdrH7hywzRN8ptV5MlWH9Pd24v81Y0MV2w4pJesFOCpOriMIEl2SO%2B7owhJu4sl%2F0o1ZlevnTTI0YHUTo5ROuWF7SYc4NO8SGVF2hSMZeWEq%2Fs%2FFBFoCpzCvlg%2F40uffRf1xFPo%2BtYURMgAaOJ97aZ51mMB4irSKargTKHD7WODsbWoFHeh5DmnKFX3fQiHLy6wPwmVPNVB7JD2It4ndRdzf8P4vQiFvq%2Fd6a02rUQLO%2F1FpVvNOzdFqkGyrqD12YhCbFFoVWjs4VSfCg5pD%2B1OMxrskTX7547yytIeqRX2dMHo1tyVr9wF6NGWtECbSPU%2BE8d6bUNah1aWBoiGmxwRSPy4a7qXjLONj6ShEEo0biETChuN%2FOBjqkAQaDT5D6VX7ws6SJtfC9jnzdIo8QSt7pTnViyxo0JJZWWiWVSf4eY6dnNQJw77UbDCEpLIsDXJORly4Gev9pWgLcAJNUO6PDmd3oB0Z%2FRImlmCfOj02sp6yBAyKg%2BL9Hl4eJ4w6jKXxgsN6KPeogW7td86Jf8RCKFaOvW4YIPV74iGWCW6hHNzqK%2FuQ3vrZoDxq3Jav01N2y9kcjTQMWO0hTJAVY&X-Amz-Signature=20f53c474ce200ce8d18b24e381629d1479f2f886a25c05fe50fa8d5c91df15f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665H3A4NDY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDy%2FZ4ZYEAAVp1YUluHqlSD91ZaddX2f8XhRG6MZ6LWnAIhAPSunDUmdMlZokshlGpOlmAnj3LPUCsgoEXUbZ9b2MZNKv8DCBoQABoMNjM3NDIzMTgzODA1IgxHsK0tHyT%2BhwGdXr8q3APUVQNXKzAhZJmnY%2BQAmY8HOXPK7zFRtXT4IYV2sKJVOdXBl3b0BsRFngRhY83XBanrmrUYcMQl0Sp27OA0btV2XmbBDFM7Mz6cDoJ%2BdpYCKYed2XtHT5Q5u6uBkU0YbygsRUyGiuUw%2B3L6guqKcBai85B92A5jen5R6PQ4mDnnnWvwy8KFRxt5qIqYYAw6Ihh3FC5wVYe82A369t1ZpoMnaKfdYJLYMYFaA7GDeFCYIZozGAMe4SWRmmfQxv%2Fc9nj%2Baw0%2BewXfS%2BT29U%2B48hU93vw7Nbju2MlbKIXKf6aQKOKsOh1EiKV67aQhE57w%2B5nWY4ZM%2B5zIwdw9zFq8MeoSI61Map5FKDTUPbEfiflbsUY3sBUU7ilOMuIUfkyBNquDT%2FnOnaenpc7IB03ok8LZkyls1Soc7%2FA3AWm9z4%2FZaNrbzUZjsLT0y2fpRxte255q0S808OgwKyB4Za6z25HGT0Vom6V2DjiTeY%2FBUoWjfgrZzEvrZO97SWAVtnQswe8%2BATVqz2qj4KVFHfTMt6Ji0nHBpnOnocPjxBCT8XmizdhaE1PMvfdVWrh0PR75WOvG%2Bjj377%2F7YQpyK8S15pDGA78yVZdllhmXzx%2FtQfn0SZvT6V1L%2FEvI3uStIDD2ut%2FOBjqkAQGzZWfGVTj9s4QiQCxCPW9wcwe77SFviuyIkYOExho4iwq0z1HIAccuY1XE3ntfqOu1mdSbkBXhMCNj2Wlm%2BfkWwssyXiPrE%2Fw6nsI7DDpmp2SvB20BcaAB9F%2BkTbqJINvIg7cMIxRB%2BZYn2bQx35TmQZFY2quuqyaZbLFCuJuI5%2B1Vh0uy7bIZaqO52sJu%2Bt7NMP0l8EaqltS8V7hxpYVm4AUR&X-Amz-Signature=e93ca5a76b5b197dc093ce18bde0706313f40ba454595b822132120d3d0b393f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665H3A4NDY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDy%2FZ4ZYEAAVp1YUluHqlSD91ZaddX2f8XhRG6MZ6LWnAIhAPSunDUmdMlZokshlGpOlmAnj3LPUCsgoEXUbZ9b2MZNKv8DCBoQABoMNjM3NDIzMTgzODA1IgxHsK0tHyT%2BhwGdXr8q3APUVQNXKzAhZJmnY%2BQAmY8HOXPK7zFRtXT4IYV2sKJVOdXBl3b0BsRFngRhY83XBanrmrUYcMQl0Sp27OA0btV2XmbBDFM7Mz6cDoJ%2BdpYCKYed2XtHT5Q5u6uBkU0YbygsRUyGiuUw%2B3L6guqKcBai85B92A5jen5R6PQ4mDnnnWvwy8KFRxt5qIqYYAw6Ihh3FC5wVYe82A369t1ZpoMnaKfdYJLYMYFaA7GDeFCYIZozGAMe4SWRmmfQxv%2Fc9nj%2Baw0%2BewXfS%2BT29U%2B48hU93vw7Nbju2MlbKIXKf6aQKOKsOh1EiKV67aQhE57w%2B5nWY4ZM%2B5zIwdw9zFq8MeoSI61Map5FKDTUPbEfiflbsUY3sBUU7ilOMuIUfkyBNquDT%2FnOnaenpc7IB03ok8LZkyls1Soc7%2FA3AWm9z4%2FZaNrbzUZjsLT0y2fpRxte255q0S808OgwKyB4Za6z25HGT0Vom6V2DjiTeY%2FBUoWjfgrZzEvrZO97SWAVtnQswe8%2BATVqz2qj4KVFHfTMt6Ji0nHBpnOnocPjxBCT8XmizdhaE1PMvfdVWrh0PR75WOvG%2Bjj377%2F7YQpyK8S15pDGA78yVZdllhmXzx%2FtQfn0SZvT6V1L%2FEvI3uStIDD2ut%2FOBjqkAQGzZWfGVTj9s4QiQCxCPW9wcwe77SFviuyIkYOExho4iwq0z1HIAccuY1XE3ntfqOu1mdSbkBXhMCNj2Wlm%2BfkWwssyXiPrE%2Fw6nsI7DDpmp2SvB20BcaAB9F%2BkTbqJINvIg7cMIxRB%2BZYn2bQx35TmQZFY2quuqyaZbLFCuJuI5%2B1Vh0uy7bIZaqO52sJu%2Bt7NMP0l8EaqltS8V7hxpYVm4AUR&X-Amz-Signature=e93ca5a76b5b197dc093ce18bde0706313f40ba454595b822132120d3d0b393f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IS6IAXA%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T174918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIEwJ7HgHClpy92Zaz6t0YiEqoKdN5aqQKHPpKfpiFrmfAiBIX%2BD6WEPi6%2BybJ6qMDSDHwcRWADxPCUkFH0YQ1xITOCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMMm2GLM3d6Ta0RgGBKtwDTcxrqN1qvm%2BR4b168ioARvqZf9GxJwvgaY4YtFHXuQdunSf0RlDyjUxD4roXH5mptVIs%2FKomSeltLvecz%2FZb9%2FK%2BpbpzfBMrnL2o66F2XQOYE71KTBCYFQMaCNxvUJJJ61j86cRj5VcqLRrnzUHuAVd6R%2Fa9GT5bXRnXajkhPIWls5%2BD6xh7XabmV3KlhFXLrkAswG1gKrZU6A5wsSAQT83S7qmU%2Fp8xE10cRPvP%2BEZ8ycbuTBvnmcbf1u3jMVv4cF4V7Kn4tCDZMTokkGM5qHqOlScNpjwoISIsvXNqCpnnmBkdHMvQnyCXRgS0h%2BUmmDY2rv4qYNUspmJCotq5QwZ9Z%2B8Ktuhx5es2YxIks5HC3FmZxciOZOThXaGs8BPpEWQdJ92kjS77qxuDn02PV8HbGXSvTSuG%2FjcqUZXBVORgCpZhH1xImUo9Dgb3M0w9g2ZqWVhb2MrnK7qpdZ2gkv7QwbXXmIJ2juGbjtvMjuwIoC%2BrSfdFpXTUPxCca%2Bl7mi34eyhrFnrBdzpSHexQu9uyGyN8LA9VDzj5DXpAENaV0gtKNwULwu9aecLqnkImmQev0DjrMFzBBDSSxKOr5VC1h0cEhoeVyavSSiJrs9lf9uhTcSBPRuqQn%2FAwk7jfzgY6pgHgI7xBSuDX3BENWKlHYuIkqobM6raueAuzLGTa%2BOjpwpMI4D8dPnLA1xZYVfMa%2B8bBNYVLnN0ODydO4HD6KykcLGKNPnOjPrVINkOeK8Pn7oxqL%2FYHe2XzmyToB7N0p4BPFhFW4zXQQ9GXSOSHoT7%2BBpdRiJY8YB5LEdU6Uvq4fAdYOva3K1KfvJx3zyqz4yJeqUc%2FAnWSsVGhjl5yHyDTsUjp4N3I&X-Amz-Signature=0e10e5e721a5eed1fd997018655886d4ec064601b3b4a599bb2b6f119aa2b639&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZMB7I5P%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQC5w3R8FZWd%2FW%2BwgVcn6TUYeQfGStG0R0l7yh5sV9581wIgCezdSj4GlNikmKJ2W7ZzhHJSjo32feEYPIjpZTcr7r4qiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDW%2FMsqfGN2nvMG0oCrcAzqbw1jvSHOiBb%2B3W9GZ2oTA7prV2JOUlC6qtmVDa0xpsr0vmK8GC3YPgXCYXAJUnBtV2YX%2FWv%2F5EdNYEDUQi5keOxrE6B%2FPlJOMwcHQNgxoYfpyv8reH3ZPnGJZw571cb6Qvho%2BWo8qmj4IMJa93We6%2BsLIdGLMjRDGMpU4QEIwSu9Q%2B4RX0bppotAVyWL2%2BP4C00NJLQD3crkma2sc4Syj0nnFJNahGNBwuWuFeitLDVEai742NoDkxmej28f%2FdGhOt75tJ9vsWyZBiMckOPfeG6lDVa0%2BnLt4M%2FQSrrwDPOuHFelSOqxpI7HbS2iBZA%2BIsP4b578vjXMSDXRxYqwBMGBx6runQ3zSRQK8znxnWYQN3O55z3Y6itmKkLMSsmFpJ6xQfBUo0eKNtBo0z45VICQlG1dbSojDgvintqFao3OHXEmkzJqJOgipRWQ5p3agDhDYfDCU5NZSY6093kpCitbPlVBy1L7BlI5ledsCb4SABNdsq02EEtdNjBLiF4aOY8SmEK4OVzMMNaIXWC8nT0Dt7P%2Fo4HD70P4j89m0F9oIfYB98xpOm2rubsApnnrdlNoA8yFwMUTiSttpzHsk6QVKhaFzL38EdBd4yauiFIdUO9i2J5AtDg7ZMNHliM8GOqUBK14%2FJj%2FC6BzXtUhrGT0vEcy6asMdbtlEjF5eW3uGknDouiAFNtGR7f2Vg67EUYUO5blxM7%2Br9Hi7E4VIbvh0sxefoszAybmZw4MTQOFg0jmAPMKe34Pl9lLiyI9BX5pR8zRE0gAi8hfF8olXmi93yt%2BahBighFyZMO6VcjlUwSoZeQlPWwp7tX6jm1APJmROTRp%2F6PBPa3QrWIXgUpmigw4MP0vG&X-Amz-Signature=7b81480cc3c61441f5f353cba226593ee237225872bd0f829993b95921df43f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZMB7I5P%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQC5w3R8FZWd%2FW%2BwgVcn6TUYeQfGStG0R0l7yh5sV9581wIgCezdSj4GlNikmKJ2W7ZzhHJSjo32feEYPIjpZTcr7r4qiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDW%2FMsqfGN2nvMG0oCrcAzqbw1jvSHOiBb%2B3W9GZ2oTA7prV2JOUlC6qtmVDa0xpsr0vmK8GC3YPgXCYXAJUnBtV2YX%2FWv%2F5EdNYEDUQi5keOxrE6B%2FPlJOMwcHQNgxoYfpyv8reH3ZPnGJZw571cb6Qvho%2BWo8qmj4IMJa93We6%2BsLIdGLMjRDGMpU4QEIwSu9Q%2B4RX0bppotAVyWL2%2BP4C00NJLQD3crkma2sc4Syj0nnFJNahGNBwuWuFeitLDVEai742NoDkxmej28f%2FdGhOt75tJ9vsWyZBiMckOPfeG6lDVa0%2BnLt4M%2FQSrrwDPOuHFelSOqxpI7HbS2iBZA%2BIsP4b578vjXMSDXRxYqwBMGBx6runQ3zSRQK8znxnWYQN3O55z3Y6itmKkLMSsmFpJ6xQfBUo0eKNtBo0z45VICQlG1dbSojDgvintqFao3OHXEmkzJqJOgipRWQ5p3agDhDYfDCU5NZSY6093kpCitbPlVBy1L7BlI5ledsCb4SABNdsq02EEtdNjBLiF4aOY8SmEK4OVzMMNaIXWC8nT0Dt7P%2Fo4HD70P4j89m0F9oIfYB98xpOm2rubsApnnrdlNoA8yFwMUTiSttpzHsk6QVKhaFzL38EdBd4yauiFIdUO9i2J5AtDg7ZMNHliM8GOqUBK14%2FJj%2FC6BzXtUhrGT0vEcy6asMdbtlEjF5eW3uGknDouiAFNtGR7f2Vg67EUYUO5blxM7%2Br9Hi7E4VIbvh0sxefoszAybmZw4MTQOFg0jmAPMKe34Pl9lLiyI9BX5pR8zRE0gAi8hfF8olXmi93yt%2BahBighFyZMO6VcjlUwSoZeQlPWwp7tX6jm1APJmROTRp%2F6PBPa3QrWIXgUpmigw4MP0vG&X-Amz-Signature=7b81480cc3c61441f5f353cba226593ee237225872bd0f829993b95921df43f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WP5QOUF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIBiELAGML0zr6xGN%2FC30l0LU%2F%2B2toVEM%2Fit9rsx2joIRAiApcy0ZGEvaDzgx1OjGPP%2BLY6JrMnIN4cqFy%2F4eomtpySqIBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQNFhuELLDupNL%2FbpKtwDdOrj9eUq1iPtSR90Qe9sIPHCnn2mtnl3ZVCjSSwoL8zTADTAkyVobB8DxyNtFYLRdUk1%2BS%2B4viWE7lVeKrV2OzSmkm2MT%2BaWvDyWFcfrPazvzy1sjDg28gb9OQvkgRJXcSLNSRDCgZ4kHrN15IaYh5AYZZGBbDE5NBcxTzIw3KZ%2FizFKNStgjRp8OkkRhUGqoyxBqZDeCjVr4yyO2kL6C7ckI1F0Ub8J%2FgbJnjyty0f2X029RmhffGOipx29yudkA15CoYUrcBFldzGmEeQrGLNBA6s%2Bcmzxu3qjVF2PilO%2BoJ2P47Ovtk50YXMy%2BLIvn0ocSd0b69EUbcf%2B%2FVMJbRsd21lOT%2BlXtWQpyQM28fLHCFmkntD2Cs1pKw3tnkPXPBLOGWgQV42xYyHCUa0SmWg2k9Gjup39vHik1xBeaDeD4UOwq8F0Z1RHF%2BpuNldf7ECAObbNHjSQkG8JS5xJ3Jx5GIvjE%2FhXPqSioHmEpcVAIw9tWqTwYLqeWKxhozJOiKAvq6hvbsvouwfrb1R7NotYLbDLYygIkqVvGqagmlEzntB2jowjrHapIhb000CWb%2FJtmfdVfiGdTt5B9sxtkw1vbcPuS%2BPp04a7HzvhjYyA%2BfzhrZlV7weLZ3YwqOeIzwY6pgHlulJkOCBLKdD4P%2FkhwACaKaCvx6lt6Z0qTddyLNvf6IC23B%2FcbrFpJQnrIsWbWu9g%2B5JTem%2BUY%2BbRX9UWBQPeiJtEqDk%2FCYgCtRkcKCYwe5zTLTE6ZDBZAglwEizKC7hqh1a8EbGnldBmOIvMDdKXGF7ZIhIsM5eOrEjfLOMdzZ3i9%2BHx2yEuBZZ7rIlbGg1BUGGrdW1AmaLRW0qcIoLtqPi1LIo2&X-Amz-Signature=21e0d1625ab1dd07c93132c973f6f9d8ccc61eac8d369e2b2211a8ac9fe59f62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624OIG3PD%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJIMEYCIQDWi6L24PANQ3X5TPLU7aY3Pu3%2BIZVK04AiSLqrTO9pWAIhAJoEk9EAPn6tUIkC50wFZ8i5XiM4YfHWKJvpRHu5mYROKogECNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx9gCUSo%2F79qfbdO0Iq3AOygWkySvZO%2BhnC1qChoJKPpMHeUIRuvsAcTfoH8vBu8zLHwwn7cuoAGkGQSRf8vXQOkgz4liSIwWfyNidaL2T9mRc5xgjTdX94CEI1h37%2FFkYfg%2FTb2Lx%2BcEm1JNgKLC2PZVUub5RtO5iIrDF18c%2FGFjjOLEe5a2kYpEzssHR7Nvl0DtZz9HEnStL7tjYmc6CXUi%2F%2FTWKXAyIZiSW%2B%2FTu2O2HTgMYw0ibMuXzJ%2BvfIo5OdbeVKTbTshBztxo95HG1rFGPz%2B246UXRlVg4y%2B2h8Gq4Fj3idIFMdOTF5KlX5mTpQsHq6lKX0Jb%2BtNZnWshjPdOciaW3yI4Okq5MzPDwgEqzKv45CP4z9%2FTTQae9Wmqxk9DveqtuaEWtrtF6QfDNIpiavGPD2StDK5NUGbUASb8AY8TaMl25XzO6q6e%2FJC8pkLJTGGMOhf%2F4Lc1EezwvA2sTvyQJ0Tc2qopGNYcU2argMpyEg8f7sW5jP2etR%2BP8iLeRKlsyt4JU6uCyOVwFo6K3Mq6dZ7SFdxYCVZ3vU1dmS1DapEcL9px47EUb%2BhXwBvCkPIW3u6prhBIQSFxjj5ILNKYKvBnVbcfP9pnBbOj3X7xyYtE5JeyfitnoBzZWRjcoAHFxGJJWlXTCm5YjPBjqkATL6u44akhYhrBIVu%2BN%2BKT%2FTjvr28im%2FWKgmDfFJ9Gn0qGAoll4KjuD4KsZHYBH2kVx2qEoQXJq5qsicFHg1j20xTKpPo3yBgRvOL0uDjYC0MaR9%2F8dO3dLuNNJmug%2B3WW5Gyqr6%2F4RgphPhxL3jR5fWk78wwvAG%2FuS7uT6nWwFGVaytFG8LHcjZa1lpc1BTrXhMjVHEpMI543RDAGVGjrYf8np%2B&X-Amz-Signature=9c31f2f741ce52129fc087f3c4151d4dc75b1393c9aabffbdedf0b6a9e1942d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624OIG3PD%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJIMEYCIQDWi6L24PANQ3X5TPLU7aY3Pu3%2BIZVK04AiSLqrTO9pWAIhAJoEk9EAPn6tUIkC50wFZ8i5XiM4YfHWKJvpRHu5mYROKogECNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx9gCUSo%2F79qfbdO0Iq3AOygWkySvZO%2BhnC1qChoJKPpMHeUIRuvsAcTfoH8vBu8zLHwwn7cuoAGkGQSRf8vXQOkgz4liSIwWfyNidaL2T9mRc5xgjTdX94CEI1h37%2FFkYfg%2FTb2Lx%2BcEm1JNgKLC2PZVUub5RtO5iIrDF18c%2FGFjjOLEe5a2kYpEzssHR7Nvl0DtZz9HEnStL7tjYmc6CXUi%2F%2FTWKXAyIZiSW%2B%2FTu2O2HTgMYw0ibMuXzJ%2BvfIo5OdbeVKTbTshBztxo95HG1rFGPz%2B246UXRlVg4y%2B2h8Gq4Fj3idIFMdOTF5KlX5mTpQsHq6lKX0Jb%2BtNZnWshjPdOciaW3yI4Okq5MzPDwgEqzKv45CP4z9%2FTTQae9Wmqxk9DveqtuaEWtrtF6QfDNIpiavGPD2StDK5NUGbUASb8AY8TaMl25XzO6q6e%2FJC8pkLJTGGMOhf%2F4Lc1EezwvA2sTvyQJ0Tc2qopGNYcU2argMpyEg8f7sW5jP2etR%2BP8iLeRKlsyt4JU6uCyOVwFo6K3Mq6dZ7SFdxYCVZ3vU1dmS1DapEcL9px47EUb%2BhXwBvCkPIW3u6prhBIQSFxjj5ILNKYKvBnVbcfP9pnBbOj3X7xyYtE5JeyfitnoBzZWRjcoAHFxGJJWlXTCm5YjPBjqkATL6u44akhYhrBIVu%2BN%2BKT%2FTjvr28im%2FWKgmDfFJ9Gn0qGAoll4KjuD4KsZHYBH2kVx2qEoQXJq5qsicFHg1j20xTKpPo3yBgRvOL0uDjYC0MaR9%2F8dO3dLuNNJmug%2B3WW5Gyqr6%2F4RgphPhxL3jR5fWk78wwvAG%2FuS7uT6nWwFGVaytFG8LHcjZa1lpc1BTrXhMjVHEpMI543RDAGVGjrYf8np%2B&X-Amz-Signature=798f38a71880225b401a7b90018f713200f4a3f96deb3f5bd66ce390ed94ae8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZSISZKU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQD5A1G1Bv0YRcNAbozzzUbwY0TuSn1d4p4Wu0pgAsQU%2BgIgEl8E15QvVAhQNtfx6SQQg%2FxEXrJgadIy5KNjKfElYMgqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEMhDXgB1u3X1nBinCrcA8Zpy3H%2F5njDzOF%2BIAEuQQQz3Xc2cI7l49b%2B7Q%2Bhdmz%2FRgdT0tGahyA9mvv35xz0XrXWQM0SWC7f11j%2FPQmgxP7VrXAqc2yybM5KvuRrTS74QOksuSQG6kbYrVZRCEjWM0VQxT0pXoX6yrUYvOL7Y%2BCuQOZrzDzMh6rZVykbBRzHBycjuyf0jNDMJSjps4raT1oQUM1sWcmdAoNu4tkQ%2FUzuCtcJn0bK9R%2B649gwGAdfgDNBgoy2djZU14O1uqzg1uxI1xBsPw0c%2BjHiw1tB2BBwPOLpDGLP4Als80ZVHEpCy3BwfjSJ1LN6%2FXloqs8X7Is2%2FGFFWbKsUMjJ3Z%2F2IyM%2B765Rzix0IflO7vlE%2FejrcwILbJLkB9L1Kyxc1bBUkOdJ6onfwzesxRmuX7N9wz6c4LekJZb4HcllX1e%2BLrkNit%2B5r7GJ1FewaeEDyl3CKOqsfnMlkiQ%2Fz%2BBDUre3hQkrnFKoQfxkW0NALaHetXGwegpJlH45cP8ysrdlMld0bntWz0iVoh01KFf%2F5Mo3CmBZJ5s3CRQL%2Bbyx7XP%2FMAqopHBXJFHoQc0l1EMTH%2FZwT2UF6BUF6ezCxR4QK5Gief%2BwY%2B1ZxpEJ7P4TzR3zpH0ARArNJ%2FwHJHbMCpMFMPXmiM8GOqUBIC27ze122cI1c9V%2FzYdJNVLxZdtQt%2FKJY2QdHIPdshUwyqYtTsNVBzypCyw9akYa5hAy6JdWoqO9PNLvaaXHWRf50GPNhLJWjILjLXNJxsKvIybgao9Ox%2BZYVJtT8V7%2BYE920hx9W8Au5YFhNe7OlwYbcCL09VLqmvGCxtGpGnhQI2vMSbqguKpTbDiSralXjnSD0BjNJy4JrXpPFV0kusuRMxBO&X-Amz-Signature=d9de6e434d984c4d1d34b7073c32d40857ed7091d01bf3948e8dce12ee415972&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNYUZ6CV%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQC%2FxJPJdpXFj5Al8vAfwiWVX0ddnrcerstJ2Sv3FmEKxQIgY1UIp2oyYDn8jbVCTuE0l6zReql%2FFAuU%2BZTCiAKEwuEqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBKTJM%2BCxpl36bkaiSrcAxOjNNAGFgvfvfUCVw3sz3rA9IFIffe419lPC5MSKSQGex123i5Wt6VLiYEK4MfzvS%2BTAkBJaj88AUl2ePS7gzmpUjLJIPhk8jodPzSri1oQIqDpQPgLtZln9p9p6YUt0khpdAl3zB3%2F0%2BMeGtRdURZeZshaTgMhZCfzODoLkYWsQ6tYKi%2BRbsqppWG8pq1N9t4i%2F5ISXwPx6uOWs3ovG%2FgzbUHRCeYOgklhaCBmm9cSZs6N6G5%2F5bR7lTK4wCMZidqq8d2APH2K1aIIQfLwLo31N%2BENK8UwMIm%2FJ6w4X244J4zrPnTQRR%2FSHaJ0EQ%2BPg0iQbM%2F%2FhXAdqLrjMYneyfeYwA1npzyQ%2F0oPc64kd15cGL0thi1pWn3qLgGQQZVcguScQMZhA6MjjPkOV5w8CWQ81atmQoNOpLZ6qH1Z58hFkLuvYH4gTwps0IQuQ53tcWmQItqkhsH69YxS8p6IP8V1nT4meQFNX5f%2FGgUPYsb%2BmgbNpAJj%2F5mWskUT%2FG%2BaPDrBA%2BZDdFP2Q2gacKphVqsqx%2BdH9A6xygj3C9bkD7eEJETfjCFYpigqRURmj8v4IfTHKDVLC9PGj%2B8FAbTE9438k%2BU3NjNkmYEG%2FzumxbwgCZ6tsIPdC1ClzG0vMMHmiM8GOqUBGkLGilKJG68WaGfa1MnwVkgCdtW9zVLaks%2Fw5EoBq32nItF1nrpfRCp14Fyrdj0Z5NEwz5ldP4UYuSENBBcx3nxihYC6e15%2B7eLp4dNcyp7eI4kPshdpUjK4qY79nqyXuvSmcXsK7CocEZMCdOpEpa%2BF5L8VTo1Lw0lvNQ4BG9gesUVCi9fuPxKNNsVnPKShE%2B%2Bxhlotvyz5itLy5l%2BLqLtXtl8V&X-Amz-Signature=527a81b77715982adb412fce2a73c5894524770d4ae3e3745ae65faa38f25711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SHD7OGC%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQC%2BFKavVwPxj6RAgyAxj68nQVQobZxIOuFfV6krEhcjwAIge%2Bl7pgM28wQfX04NaMoEcFAZKzhJu7%2FmMBJVuGZlBa8qiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPxYU6JB0fH0axXB2yrcA%2FoVeK1Z6w183upj1k63Rxzypkr%2FRRFq9HupA239CKjaFfflo%2FlvJGGeo3gFr07h0PD5Jqufq19%2Bn53jY%2BKEHCBmQqbjk3SRx1OfQrriLty%2BBWE%2BBgLxTCkRp85rGATNSVtRVHfsrrtDEiXP7umMDfyLavAY2u2mDs%2F9Ax1Mt%2F87HdgHxtGdDgjXghSrs9MkT3mT35t9Rk7N2SBWtrmIBUce8bYFrRfwcAh%2Fu7gcU%2FgUk%2F88zqoMqs6vVYfu5wbRB9MIHfFTVpnwexizfWMsqT5Q3miZAKs3QH6tM9yWAyjT0EzUukM02nYVSFfNGUpN9P1GnxS80F31QkhxCplJbPp7Tw51irl3vdmW31UnbW96GFW96tyYOz4XIn9BEvcT77oxyDX2pqwRblGKPiHeCqbKpwGm%2FDIY4IW3wGl%2FHXJ83dItRACCeuvx6n9AoWzmGNC27v%2FEZdUNsiE4humxqqOaysdqqq8xxp5qTYf5T4d7%2BdC4KHlsyJjZ9K7mg37hVF%2BhEEGv0Od%2BwwSAyQ5NiJuKxpmbOzI6TnwkAThKX2Tv9KZRFJ19wbTK6akNlh58V7XFNMQ9lsUf5GvSOnKybR%2BMmw0xF6%2BppkKI1ny5vdjiO73zsA2qvKQOocwzMLfliM8GOqUBFYlsV4fxisec464%2FjfoqikDJV1ZpajVs6qy%2FkrzEu2ax3FTe0knpqkbKbl7e86HPGTbTye%2BRSHbRusWldDe0KSai2iFwFn%2B0Q7Mmlq6iP%2F%2F6cHDBwnphiJq5%2FJab2BFzwFc3aX2aMIlhnj5mR9tQE4S0973h0IlRTKvNqyNSex6oEbL79NVuwERENYehgCtD96U6coYGjVbWrCRMhxTlvctKh%2FPZ&X-Amz-Signature=1cd770097fb2b21276a68374c5be89963e2a1f8c6d43125db95f8bc89443b7e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIJ3BQG5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQDnXP5dn%2F1ZN%2FeyHKptomkFO%2FP3zGEzWwTWCybFCI%2BLmwIhAI5pFTyE13ItJNo%2BaKGgXMNxysJWUKBxP1iAaSP2DL1YKogECNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzftaKKCXB7LpbsHiAq3AObTG4Lj%2FG4AI3XsuSDplZGuD%2FVbPmn%2BMWvHn04icbrdcftn1RZSPAXLFuORxLhdiQ52%2BqUqK0i0GaAcGMMFeIXLT34nR3UDTWudvYvhTj6JCC0wAbLrNtE5HSzieWx%2B5BHtzbj7norATu5MJsSbXjb3ofkKeRZ%2FmsEMeSC10W47MykfClAMhWx2t1NuDzcmqXulPxOzmEd%2F0i%2BtqcKS2L5PGqcyV2%2FbrroTpScFYUzqJZfXJuVFzWjQjR%2BXX5n10COq0LHq%2BbpiXHthBaW%2FxqI8EPNktq6NEEfJYIgwGwlNgY%2BDhkef47HuTVn9GS4By7iMNtlNCnADtMsVNAUwFo88rQyllDdfIP%2B%2BfLpthi8bvKjHys6MmyJxvCRiD3x0nOhgcUK9DXar%2BrtWT6wNa6Cw1J6ldmgA27gQaTz73XV6hpEZzETAVEDimDqmXuio3eo%2BMAKK3Kt%2B8kpWTyJZjAqD6XGY2YceWC7v3sqom9pRFeV0DM8ZYFcogV5NiRNf%2BifDVBPoCw5UY0OO0f4oLD%2B%2BQefFuWoCWVTJZBYiVU3TDbfw7WozimleyjIeo5CGpoPaphhLld44kkwlYRYOzHHEQCLv5Owtl%2FXCKexoc%2BHoQQrNnCGc%2FPBjE7itTDz5ojPBjqkAai4aUKuTA26UTGCbDwBDel2E9%2B8Nzo0OogSUnFV%2FFQvVGRd09kdm7tvUFNS1YfxJmDJCzXcXrqUfY5SRS34fZA9R30rjcvNN83v9FIE1QMR25P7nJGZiFP5fRt8NYKCRATFO8iFrY4suyC4Qb2KOHukcTeotT7Pmtp3ZCTBZM3YFYQRbQu0WtGFPSHQ2SDXthA3zoyULx%2B5UBXfpAGsI7%2FdXapT&X-Amz-Signature=1b1af37b36f31c965dcaf4158a936fd5917f77309b053a9843229fd7555882e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIJ3BQG5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQDnXP5dn%2F1ZN%2FeyHKptomkFO%2FP3zGEzWwTWCybFCI%2BLmwIhAI5pFTyE13ItJNo%2BaKGgXMNxysJWUKBxP1iAaSP2DL1YKogECNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzftaKKCXB7LpbsHiAq3AObTG4Lj%2FG4AI3XsuSDplZGuD%2FVbPmn%2BMWvHn04icbrdcftn1RZSPAXLFuORxLhdiQ52%2BqUqK0i0GaAcGMMFeIXLT34nR3UDTWudvYvhTj6JCC0wAbLrNtE5HSzieWx%2B5BHtzbj7norATu5MJsSbXjb3ofkKeRZ%2FmsEMeSC10W47MykfClAMhWx2t1NuDzcmqXulPxOzmEd%2F0i%2BtqcKS2L5PGqcyV2%2FbrroTpScFYUzqJZfXJuVFzWjQjR%2BXX5n10COq0LHq%2BbpiXHthBaW%2FxqI8EPNktq6NEEfJYIgwGwlNgY%2BDhkef47HuTVn9GS4By7iMNtlNCnADtMsVNAUwFo88rQyllDdfIP%2B%2BfLpthi8bvKjHys6MmyJxvCRiD3x0nOhgcUK9DXar%2BrtWT6wNa6Cw1J6ldmgA27gQaTz73XV6hpEZzETAVEDimDqmXuio3eo%2BMAKK3Kt%2B8kpWTyJZjAqD6XGY2YceWC7v3sqom9pRFeV0DM8ZYFcogV5NiRNf%2BifDVBPoCw5UY0OO0f4oLD%2B%2BQefFuWoCWVTJZBYiVU3TDbfw7WozimleyjIeo5CGpoPaphhLld44kkwlYRYOzHHEQCLv5Owtl%2FXCKexoc%2BHoQQrNnCGc%2FPBjE7itTDz5ojPBjqkAai4aUKuTA26UTGCbDwBDel2E9%2B8Nzo0OogSUnFV%2FFQvVGRd09kdm7tvUFNS1YfxJmDJCzXcXrqUfY5SRS34fZA9R30rjcvNN83v9FIE1QMR25P7nJGZiFP5fRt8NYKCRATFO8iFrY4suyC4Qb2KOHukcTeotT7Pmtp3ZCTBZM3YFYQRbQu0WtGFPSHQ2SDXthA3zoyULx%2B5UBXfpAGsI7%2FdXapT&X-Amz-Signature=ad863d3f80e4512c8cf180e077de8e5c3a6b533dbf49bffda9a20ea986f024f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466422IP6RF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIBt7vynVo%2FFYNXu8Gib4L6lBhkZNc2LleaFGuF5gAim9AiEA6f2l8tV%2F0EAd%2BWtaWC2ISTY8gJdyOj8GVLvjQZqET%2BIqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKPkj5bXLNg4UGfWUircA9xzcI0z0i%2Fn08lM36CgpAcO6Txdv73vI%2B9hGxeK2SzGtvUZI%2Bp2dF4tYfVBs0%2FEgbbwfwOBYeRUSWLMsTsmVytAjfl41FjdSLvN5Zr8COAIHlLHeM%2Fn2tD0qHe82ZTcwYV2ecJP%2BMqVcA4TONWvzr4JcjKEgzK95nxzTDmbb6eKGm4SpKFbQ2XhCvVlweFhRDtAhP1TZbO%2B2AhzThysMokLPBAVpnkA2%2FEFglIyuRdwiyrZhTUiQ4bkq2oy%2FIwO0puu87wFx5YozDVvNdkKeCsXFxY3e0DGvhaQz0K93dPqvVxeby7YPiulokIJ3AkzUu8SzkzlXhcz5EwFxwyhfXhkj4Bw90birwbcByJ83jpcS1tGnUycnPvx2Rkc%2BrJnnm%2BCAq812hfumFyMYv34c3dXak4r0jICVHcyt1chf7zdcX1Jtn0fzf2tW0iGaq%2FyJTm248G0MNfgItm5GkPiw6H1G%2Bl1YSnk3Ff9Pkd9jRmfLaSDxcgHboV%2FDisifWmGzj8onkB40NYPMOJI6r2aJA3kM92oKOinieJIBdEBge2nU8ITJQs7bygow03zQ0cjR02%2BVmOCwSsOcZEO3Cb8zx7c2oyVBOI2trWAc2O8nzJtEaHLJGzD3mJ%2FKx43MPHkiM8GOqUBkjhqEseNPxAVMnBe5Tm1PsGTVVUUKa0l1Zu8wzH34b4XMM1czLz28LH6gZkr3NuzQ9tDejqnjz6VeJwzQkE2Ioj9igkPZrMtfJfA6JfAD%2BQwWIx5HnXW0IlhyzoTxiQq%2FPxUzNANkrOpGNhT0eZvXsf%2FnrQMqkr40vwLxsxduJWmnkPaT0S1GlTNX2UFxun%2F9hTX2i6SH67nzmrKl%2Fk1yyY8JWlP&X-Amz-Signature=c086c993ff270c2e8370a9a2141207dfa6392386ce4a5db600f91a760fff8e1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662U2QVY7Q%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIA5hYnHFysOASmFhS%2BGYKvv1VoGx5YXQPSh5%2BZNUTnZFAiEAzDuWCTTQ4CfVVf3Fj23eD7gpffEbMctIUBBJdSCDG7YqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCfOJKf3UIhYID3ZKSrcAzmsQa0czohgBDJ5isGfZ5%2F4YevZLxmrKEYNJFz%2FQy0LcwlTTsuSO4XdEF%2F%2BDdAO2FDXnMqbJZfII0oztHmDoiayi7C7%2BFMHt4PpqJ81mPIYufAZKGL%2FtA3%2FDzcDOxTEDE9InZu%2FVexObVIpExmQK0uf5c52KwyEYARvRcGgIlw9av3KV7wIGr3235IuMESwrh85kkFEdJEb%2BIyQhCFljj4wTNFq%2FVfFWqZc%2F3ritDKUGkDOH%2BF9BaTCy2oPNWuiKCEimj8vGkqow8aUxxBw%2B4Ku%2FWSfLcPH%2FmffV1IrPN7vrtDRSZ0dz9JDjucDR%2BhOhbBwFSK2fO1taAlL37G9fJzTKjXoehnkHh5Kimv8BR%2ByHSfcS%2FV%2BSPtvLt9QWLfLv3SY4%2BZ%2BQW1yztwhsunq6Fud7BBi7Awtsk3E%2BYG%2FlACUoKSJ%2Fb0YUdZGg4GqmtPOEFXGvOe2Cfj5t4IEj8Z1zJOV8sik4wb9tV1Xo%2F5Z0%2BqJiX0DQ8Aw4IFaQdOBXSE2Hp%2FpjYVNnLWOY9uIqapcPxCUtG0czmHH59dd9uo89PMgd1MQMaRvjkT3kqnmtpeiRJJALcVUpZPE0dMSS1kLbDEi1507DYpcYUYt%2Fjl5HjTG1kHTGAjXoQFcLBX%2BMKXniM8GOqUBX4qydZGaGdBfolmuU%2F28Mb2yvy80hmu4toiE86ovJ5LmfXFi6eDrUR7%2Fx6BJx1ovM%2FzDUyudc0PTD5i80kX%2FBMwrkMPNDqELQahC5miR6dFOXGWLcCAJm6oqcSfg6SXTe4JlxQPTi8m9byh2JeG6lTgsVyXR3zhajnZFdADVBWmEkHdo%2BTIzK384jWJXaJRjUa1o8QTgkSYct7cQq1INJxpPYBMA&X-Amz-Signature=5dd4fcea8211b3a052d61b1ba6ea95ab44329655211f8756c59662aa51d0d008&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662U2QVY7Q%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIA5hYnHFysOASmFhS%2BGYKvv1VoGx5YXQPSh5%2BZNUTnZFAiEAzDuWCTTQ4CfVVf3Fj23eD7gpffEbMctIUBBJdSCDG7YqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCfOJKf3UIhYID3ZKSrcAzmsQa0czohgBDJ5isGfZ5%2F4YevZLxmrKEYNJFz%2FQy0LcwlTTsuSO4XdEF%2F%2BDdAO2FDXnMqbJZfII0oztHmDoiayi7C7%2BFMHt4PpqJ81mPIYufAZKGL%2FtA3%2FDzcDOxTEDE9InZu%2FVexObVIpExmQK0uf5c52KwyEYARvRcGgIlw9av3KV7wIGr3235IuMESwrh85kkFEdJEb%2BIyQhCFljj4wTNFq%2FVfFWqZc%2F3ritDKUGkDOH%2BF9BaTCy2oPNWuiKCEimj8vGkqow8aUxxBw%2B4Ku%2FWSfLcPH%2FmffV1IrPN7vrtDRSZ0dz9JDjucDR%2BhOhbBwFSK2fO1taAlL37G9fJzTKjXoehnkHh5Kimv8BR%2ByHSfcS%2FV%2BSPtvLt9QWLfLv3SY4%2BZ%2BQW1yztwhsunq6Fud7BBi7Awtsk3E%2BYG%2FlACUoKSJ%2Fb0YUdZGg4GqmtPOEFXGvOe2Cfj5t4IEj8Z1zJOV8sik4wb9tV1Xo%2F5Z0%2BqJiX0DQ8Aw4IFaQdOBXSE2Hp%2FpjYVNnLWOY9uIqapcPxCUtG0czmHH59dd9uo89PMgd1MQMaRvjkT3kqnmtpeiRJJALcVUpZPE0dMSS1kLbDEi1507DYpcYUYt%2Fjl5HjTG1kHTGAjXoQFcLBX%2BMKXniM8GOqUBX4qydZGaGdBfolmuU%2F28Mb2yvy80hmu4toiE86ovJ5LmfXFi6eDrUR7%2Fx6BJx1ovM%2FzDUyudc0PTD5i80kX%2FBMwrkMPNDqELQahC5miR6dFOXGWLcCAJm6oqcSfg6SXTe4JlxQPTi8m9byh2JeG6lTgsVyXR3zhajnZFdADVBWmEkHdo%2BTIzK384jWJXaJRjUa1o8QTgkSYct7cQq1INJxpPYBMA&X-Amz-Signature=5dd4fcea8211b3a052d61b1ba6ea95ab44329655211f8756c59662aa51d0d008&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDYTQZEX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T141322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIAkQs9q5xxZ37O7JpG%2BJIg0XZJM8Xox3DdyxmV3HoqckAiA%2BPuKMsp8Ww0d1HC7HRBngVQcDaV53gePosHqAoiNauCqIBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvgZRsgHxj%2F2QG2EKKtwDtrk05Y9YrdTI8SUJ%2BhI5thvFjSacLrIX2p%2BL%2Ffm9yZ%2BPz7voMj%2FFMpJxMxvdweRYDX811l68SPX95pzzfuXV3A2GAHBFAoJP8GpFPJ6n7HqQ7rYekI0cK7HY3JNWHBk3tx4be7pkpQHjeS%2B4%2BYuJYKCwRKWCI0HxnVnOSrHdDcp9LNhrUQ4JocCrbww4%2BtirMqqtwjnuwjgMNcAilzDhAM0ezGsVHrkDZSNdY2M2VfMJC4miRjA26pIPoBZUjG1ahqnzjlSudOEda8h23IQkYnPpqYDQX5whq7guc2Ioz5tg8jlruUF2JfGlNaF9toVvpaZiPKwYicKLT5aeReWUG032pB3IOoXPL8wUHqoSr5DyrdMzvkE2hIf2R%2BPl9IRBMN2bl%2Fn23N1Lz0S%2FtRIeA3QxeV3SCBM1mHC036wm%2BX5Q0uVZiZ7su0XksFXvHSCVxLZXELlVgoFLwFlIYmaHHT6fK60Or9rpTNaqxYCOICRQBHFXCXJiiuvg5xfOiL7PKKAn%2FztcfkLxZAahss0U6PE%2BGyDtxA0INHbHxY5cDV2LFif%2B0SHVf7yPgrR5kZ8VRmiLi4zkCOm6C5ZN%2BWu9mn5wV%2ByEf61QSW8uHYgLrKVvJ3uGLs5ABgjoRmcwi%2BeIzwY6pgHUGs6Mp2B68DtTZ921CTDq8P%2FtkNcVvrjPdtu1dIYG0vYSfTlTv%2BdLM5C1PzKRO1YXb7FoApZDJeDN0%2FBmxnK%2F3C6NFZkmqpB%2BNzLRP%2BQeNtDUQKpX2paLcWmL2n%2ByNuDGRvrKiO%2BSeR%2Fv1pbnjRxocCBzYy3KYSx5v8qQQHDe3ImaaUQOSdj6BJ2kTrKBQOJl2iSsIqPUXDW8akEFHWnwq6tOeW7H&X-Amz-Signature=9acc42baf7e5a7fb70153ea850f969b83fb4a07059c6848da81ecf294be026a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


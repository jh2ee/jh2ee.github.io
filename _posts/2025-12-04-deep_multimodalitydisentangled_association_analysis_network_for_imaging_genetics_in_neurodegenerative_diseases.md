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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUKAJPFG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDo%2BEP6ArNhsBNqQegL4b%2FuszH3K68%2BoEDgZLlWwEhBhAIgCD15NIW1yzK9sOYCmVF0aLxc16CraPMKlbkLR%2Bx4YgIqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCoMBuRq5vLWepxwGCrcA5%2FoOWdRIH%2Fzi47k8fqQGcbrN5MP7Q04PiqAeQ5thP9UTpI%2FUpdnh8NAE6CwgIoJ%2BU%2FDJyhI022b60AVQdMtW7l2J91GBDAJEN%2FLcbRNZ75nw4iR0U5DNw8yXZ6aSbDNP83yAIOWFKBzwtwqzT1nrZ%2F8ihRVLs3feL8ODAIgtGfpjSMRWIvXl7ve%2FdRiMMObuY1q69bKPT4s5BirJe%2Bx9GmU8duh%2FUqt1l5%2FeiCUFa50UqyDivpgVmxf1fpLmogsG9I9kHxQy%2FDck8FbjKkEQYkikZYhrq5xJoXgKos7jg6sy3plnS7zXy%2FrMcjZ7%2F9oQY9fbTyik2dHgXpNvDQ0cTRi%2FcOiS%2Fi7DRZfXKznEn1G9BjI7wfYAPLyEJnL%2FhmsOkOK80GLdHs8NSF2pPoaobDgcpfe%2BCIEc2kikuZqkuELqZoCHsFUPTbskP92o%2B3s3Qky9HxRSt1XoNTm3rMjj58Yz3ls802bawacqVfN9EN6mb3D9Iw7ImzqSKkWHIk%2BSWCvzbY4kFMqr6Kbs3T2seoSUUEU5RKcQWoVPGR5sUSW4Ni6KIqKM2npTRabKmsfVftaPfRe1iBmr%2FMeFe8RpXUOlNovd2JoA%2Fv8S2%2BNBOR9kEy8S87T6e9yDto5MODUmc4GOqUB1Hp4UEXYc9Lxn0LeOsw5Z%2BniNBI2Ck69lrOjemhYovC%2BchhfgZMWuSfDnbWpFVGaYZ8PT1X3wxo2%2FVUvGNfqvsJFOooABnI5UTf7i4dcL02fSp%2Fo0K0QbPSS5VmMB6CiZV%2BwXSzozgOsXvDonMRXX1M2nUA3qkpDbTPXEcqLPDBKKEauk10LR8Q2%2FyXg%2B4MIpHgNRGaeWhsW4ANp3SRS%2Bwy4Ziha&X-Amz-Signature=55222afe65bc10369d1dee680fbcef650d0b4009d40c8df676c63f53af330d67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUKAJPFG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDo%2BEP6ArNhsBNqQegL4b%2FuszH3K68%2BoEDgZLlWwEhBhAIgCD15NIW1yzK9sOYCmVF0aLxc16CraPMKlbkLR%2Bx4YgIqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCoMBuRq5vLWepxwGCrcA5%2FoOWdRIH%2Fzi47k8fqQGcbrN5MP7Q04PiqAeQ5thP9UTpI%2FUpdnh8NAE6CwgIoJ%2BU%2FDJyhI022b60AVQdMtW7l2J91GBDAJEN%2FLcbRNZ75nw4iR0U5DNw8yXZ6aSbDNP83yAIOWFKBzwtwqzT1nrZ%2F8ihRVLs3feL8ODAIgtGfpjSMRWIvXl7ve%2FdRiMMObuY1q69bKPT4s5BirJe%2Bx9GmU8duh%2FUqt1l5%2FeiCUFa50UqyDivpgVmxf1fpLmogsG9I9kHxQy%2FDck8FbjKkEQYkikZYhrq5xJoXgKos7jg6sy3plnS7zXy%2FrMcjZ7%2F9oQY9fbTyik2dHgXpNvDQ0cTRi%2FcOiS%2Fi7DRZfXKznEn1G9BjI7wfYAPLyEJnL%2FhmsOkOK80GLdHs8NSF2pPoaobDgcpfe%2BCIEc2kikuZqkuELqZoCHsFUPTbskP92o%2B3s3Qky9HxRSt1XoNTm3rMjj58Yz3ls802bawacqVfN9EN6mb3D9Iw7ImzqSKkWHIk%2BSWCvzbY4kFMqr6Kbs3T2seoSUUEU5RKcQWoVPGR5sUSW4Ni6KIqKM2npTRabKmsfVftaPfRe1iBmr%2FMeFe8RpXUOlNovd2JoA%2Fv8S2%2BNBOR9kEy8S87T6e9yDto5MODUmc4GOqUB1Hp4UEXYc9Lxn0LeOsw5Z%2BniNBI2Ck69lrOjemhYovC%2BchhfgZMWuSfDnbWpFVGaYZ8PT1X3wxo2%2FVUvGNfqvsJFOooABnI5UTf7i4dcL02fSp%2Fo0K0QbPSS5VmMB6CiZV%2BwXSzozgOsXvDonMRXX1M2nUA3qkpDbTPXEcqLPDBKKEauk10LR8Q2%2FyXg%2B4MIpHgNRGaeWhsW4ANp3SRS%2Bwy4Ziha&X-Amz-Signature=55222afe65bc10369d1dee680fbcef650d0b4009d40c8df676c63f53af330d67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4DOIVUJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQD3%2FhShE8OWm%2BBhOmkOf8tjSoZpSssLoLC3BqTzRdM9HgIgTNDV4cwMXGUCLAkg7QCMzU8Q8dcscnhweTvIGmm47hkqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHhsEax7x6dfDfrLcSrcA23eyHdwBYMkTmaQDZMYISLJOZD70SqKhbnx%2F9MtfCOYOKspge0AX5W%2Bz%2BF8E6iPSaCwe3kkwVW%2BJHoah3YVEk7KY5iewvVF1v4g5%2BQjvJVnvnfbMXGUKs2YQwtRpFyMpkCo7sNxfi8izTbesclCg05umrtv00hjU4ynuRVOgDuc1JR44lAyDfV%2F6tECNzzbRuj4wpUq9C9PhFbxfU7S9Vdcji7PPEyB1hEHzTjSos65Rdj7cYn07h8qJnkbBGzz84auic%2F3EHw8nP%2F%2F42jQ5E2AH2NJU9Oe0a6LZ3oRXYZT%2FyydsmX0G2JNFmqn9kuyOae103dhbAwHwr6Uc%2B1gQu6TM5NjpygkXHnb4jy0fcd4Vp4tuSg0YY3wEMETM9Nz1rNiqgO27gHtCzexrUvzrI8I%2F0%2BUTBNBxp4jd%2BrHiPIlShV1Cpj3WGrlwK043VZ6MwCr1C0ujXPpjH8Cc%2BzpKHOersbuUijLi2Jw9w9cQL0cS0kHof3CdH3UKEHKDqNzQJZfOrmBKIT7KG%2BxdrxquGEPix6xrtBymBlsuV9RtmiS2dPTuxzfuZQiE0ZZQfSxg%2FyvlAVIFC4O3bokaRSMama%2FxFJ%2FwUbf8L301mwprcTzAcjcIuGiUzcRIFdmMJbTmc4GOqUBdAZKc5Jtfiw6PqO206yIkM3W%2BWBEiJZXyzY0crDnidpuuiR56RD09%2BittjdQ8uGrS%2FHCgWcwKJety%2F8m%2Bvqo9fE%2FeAuiGefqptF2ZS4FlxwG24%2FyX35DlXCsu%2FNBYYfYLEC7CHyJNsUAKSnvpjy1qr8EAifdKR7yFYqf0B%2BNu%2BK8acMNBHrqLp2G%2FEFRQNJ%2BxuVZekgRT3poYt3eyhSn2lGeA3R6&X-Amz-Signature=d6a5b0ace3485d0898a15075842e65565e3e70a324a082887f357fc9054b1ca7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4YVEJUB%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIBeOoQ7kkGA4O0hRoLyCguLjo1GjdH787U2y3ukkaGKnAiBuoJJzUOF5o%2BX3tXmtCydhJXkxZFooSkECdpC%2FNiq95SqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2B2OBZj3rhN%2Fegnx7KtwDpbR1n6gOmSo0sAc8qnNTJXVkgSuXrWqhrEh3CPFJo6PGn7htLjqxUNIBGSsAFiXr%2FyozOBdD71GdILXnjId%2FLBjos5GGmrb5Oz2l5msLlW5hGsB3rKMEk5r7JHcJySSQzvVVEnH17XI7bNu2go4vML2V6RWndUlD34hxffLcp8q9gDnVOtF9xn9yJprOD2WkAwP5g%2FhN4wABKE0LXxFl8o52YS38O4v5mnaEI8vKFgxbP%2FhT76fDshHf30B2JB2KoRTYPkpJ7%2BRnIoZ5G%2BMMdaOBKJSROlDAuuZWPMCtiEFyeFA5Y40jlv8NVqSi9pYQBuWpY2pgwvpNS6%2BUAKhryMNBJk0CCM4SLsiYsFgWbfe05uTtpcNLm8%2BNnblTd8zKmsUdVM%2B4bfolFBAWG%2BLEgV2bgWHiB8mS2PF0PkxZIliJckJP0VH2rhwtSON8KWbMnUzNv5vLnptMs6VDBPkR3j4XNqBkURqYi7cUAFVovepp2t6ITMSsrbj7KNqBmHGHf9RvWOCemfMFzrJGciBdtrtHa90PNHttLl0Edh6mmPAcZ3D%2B%2BXFR6ckMuCGxtvc4t6PakqSR9xpuR1oH3132jzJd%2FmrRwpausNP%2Bam0WtJVDCWH0JZh0LXUqqzYwn7OZzgY6pgEWyb%2F53jmZs0v1x8SsW7L%2F%2Bxp0%2Byeqql4mSy9ir0xcuiUbCIFOcK02IOO%2Fx2p31JFxvc0XTGOPhHcEPtKtbAPu18Nayl07TOgDrvzkTUPM6mQ4iEjAeXqHFHxe1YgEb7Koojbc5uHS%2FRR6IwfIGuGjb%2B7m%2Fe0faB6Uj%2FPDBHgpYgkBJF9%2BYpIHfhpqK9e7b%2FXF7PesgnJTZeq8cDQfkWgzONz934Ve&X-Amz-Signature=2b25b8fd6014cf39849951d821f79f6d5cc016c2340d9588334aa9894be77336&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4YVEJUB%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIBeOoQ7kkGA4O0hRoLyCguLjo1GjdH787U2y3ukkaGKnAiBuoJJzUOF5o%2BX3tXmtCydhJXkxZFooSkECdpC%2FNiq95SqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2B2OBZj3rhN%2Fegnx7KtwDpbR1n6gOmSo0sAc8qnNTJXVkgSuXrWqhrEh3CPFJo6PGn7htLjqxUNIBGSsAFiXr%2FyozOBdD71GdILXnjId%2FLBjos5GGmrb5Oz2l5msLlW5hGsB3rKMEk5r7JHcJySSQzvVVEnH17XI7bNu2go4vML2V6RWndUlD34hxffLcp8q9gDnVOtF9xn9yJprOD2WkAwP5g%2FhN4wABKE0LXxFl8o52YS38O4v5mnaEI8vKFgxbP%2FhT76fDshHf30B2JB2KoRTYPkpJ7%2BRnIoZ5G%2BMMdaOBKJSROlDAuuZWPMCtiEFyeFA5Y40jlv8NVqSi9pYQBuWpY2pgwvpNS6%2BUAKhryMNBJk0CCM4SLsiYsFgWbfe05uTtpcNLm8%2BNnblTd8zKmsUdVM%2B4bfolFBAWG%2BLEgV2bgWHiB8mS2PF0PkxZIliJckJP0VH2rhwtSON8KWbMnUzNv5vLnptMs6VDBPkR3j4XNqBkURqYi7cUAFVovepp2t6ITMSsrbj7KNqBmHGHf9RvWOCemfMFzrJGciBdtrtHa90PNHttLl0Edh6mmPAcZ3D%2B%2BXFR6ckMuCGxtvc4t6PakqSR9xpuR1oH3132jzJd%2FmrRwpausNP%2Bam0WtJVDCWH0JZh0LXUqqzYwn7OZzgY6pgEWyb%2F53jmZs0v1x8SsW7L%2F%2Bxp0%2Byeqql4mSy9ir0xcuiUbCIFOcK02IOO%2Fx2p31JFxvc0XTGOPhHcEPtKtbAPu18Nayl07TOgDrvzkTUPM6mQ4iEjAeXqHFHxe1YgEb7Koojbc5uHS%2FRR6IwfIGuGjb%2B7m%2Fe0faB6Uj%2FPDBHgpYgkBJF9%2BYpIHfhpqK9e7b%2FXF7PesgnJTZeq8cDQfkWgzONz934Ve&X-Amz-Signature=05e6c7524f0ae0054e5f5963477d4385c980a7dc8480593b722e8b5638019c3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OPWOBPF%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIEI5Ps1eqG%2BV4ayN9%2BMv8QBSP2Uo8CJn1%2B7hT%2BkI0%2FwuAiEAqZ8aBbanqIi9gQkvfLvp08%2FwvRTw6zrpbkzg0h1XMYAqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIMgUlEpOVh6%2FnO9eircA0y1jEkZ4HqgcW%2Ba6MAyDVASfv52ACdq%2Bm2KDQNsW4lokTy4Qpe1iLfL5%2FTMbiOGuqLtfBPIQSg6qopPMMnCxEwawmz5Emd1%2FeB0kE%2B1mZzI9Y3EFc55vdjDgSRyQ9jhnUyy8ERM0R4dWZ%2F7ewzgeeQ7MTSo1KVe%2FNHkgRwtQ99g%2F7E%2BezbxqaFqT1dHbembeS1n2KYvGKRNgDMygG1pyU4z1e%2FivRszKO1iimRJcsVVgZ5NIhgwCG7G0BuiyuaNg6cboBmiBzSYIxvjED4sWspNjL5nTyG2EGaiJX3Ll5O%2Fi2YfXKH9RFLTtp3nTtH7APMI6MDCehT%2Fry3xBZh6vwQV4%2BWJJmdXwlrPiPqt665XDG4wkVJgLS%2FAEtfGcoHxd4fG1f%2BHpcE13zAUECsosr6RlyjFdDw0%2Fls98Amr8SiytugLBSEPxolEYNzlHlPfBbh7p7fl6C9jhe2iMOe58CzfF%2F%2BLJzUnXkOee7so%2FUeLE15Y6eRWMJ5xgCSwCiDjOYaqmb03Ggb9UjW1XRL5wmmmJAw5dZ0CzBd8Nks6Fhj%2FY9bwDfYcPq8H99jwBDZaLrJrNrYay%2Fdbgu9e6oearv1IQMX%2FwkQcf9icB5SwE6YTsd60Tjt8W4eoDvTUMI3Tmc4GOqUBdksdhFndXGqLc7bHIn6bPjC6zhU1ezO%2FZp3hsdq%2FPkFY33QUVSsOHQVdPzkza9mOYKlnDnDkei96F3Imb5asUHUtTvm3YEkFl4ITYzEypNbOjB%2FEo8cERNsBxNAZ5UL7iyAgtP67bEx2zzt0gSBXeMVMB7GznbQO8m6rBU9izgbwA4jlzbHe1nlKm6nAJB2dZuY3uJt%2BfDkleGsWI7OePmLK3QXZ&X-Amz-Signature=d400d2a6425f453ab6f58f7b3cf3dbb6b31f3fb4b405cb5a039ee8ac247af45e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKMX3ADT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCv2r1IOK0RoMgGGSovbQdmMW5O0GsDJ4XGIveMtHBl%2BQIhANyo8Bh%2B5Qtet5%2B9%2Fdb2WWfgnnaIA6X6%2B7Lly8fLBHe6KogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIdIUBpERXnOGXkf8q3AMqWaMfjWqphUm2rToV%2BlaRl%2FyronV3kny0pBfPeDSptmW9B4tfU%2B7vE6fPW3GB9oeB%2F%2FahNwNQOk7vQudLcU6mVA2G44D%2F15bqzYk7XH5vFikZgWO%2F0zmyjQi8630GIUEIjCHoKnbyus5BxvmWd%2BMC6Lv%2BDnC%2BpLdKvbMw8OPFPlbJym3vTOyYJ2d%2B0HGjPWMRdOj7qHPLv8LFAUkdR%2BJFWyu6qZJtvG9WLiXna%2BzbJ3yKYWmHkpcrLcarQKjKXLPR1khj9omUbBd8aeNg7epN6T7j%2BZUyghU8sEfOqvuSuhgCrcGrLmdX6m1QVDWXGD%2BZPeUAfgcvQRlHWYv7nPEhcxRG0xOQRQfvrAeou1VpeCk0sDGMPzgA2hKjUU3YUR%2Fhtkx6CIelfanhX8rV2P5%2FITfbeZ2hNllCsHp3pMH40BO2HcGZqZWMnQMiKLLyuVG4wWoOuVcBtVJ3kKwb%2BdTLg1t6z1K7YJesUMluvq8%2BkiV%2BQShAFIUb01cOAMK%2FX%2BiV5X3OrL1lsR5aAB6D64Jw1ciJjOSLMORzMRYQwN8aKXaOm3qNzuAfV5C0F5FydYUNw3Wc%2BiQabJjFWLghP1oIih%2BA1U0As7lZnZWJHUqWdSjhj2YBSJngzryXIzCn1JnOBjqkAfjVYgeXUEqBnzdG02yx7AYq%2Bf0VcfRWEMd0GrgPOlRttF10S2HHuMtiJmD%2FidLRQRVCnV9PuT8F%2BDg9F%2FiHbe4LrMlydbKKzkg%2BuwvIiNm1yceXSfUj9uSgHMu2rkwqzvp6v6YrBRmz6Qkp%2F0jgoXuFLrHTcDmVGiQO4Q%2FCwbOE7WVipHHU8aObIeNSuZsBWjqoEYyb2fvH%2FnQ68eDFc%2BlCQ8Pi&X-Amz-Signature=cc35d2a2f396445608a1b8497eef7ed787120af0bd85dd7642c3f61eca69bccd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665N7ZBPYA%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIF5rh9%2BJPf0Q6ods6TH5To5w56GyEJSUlOl8DVDTLS1eAiBIj%2BHYJDe8ip0iEfZjSnsKsBm4QAQw3CR%2BZbWOt3vFeCqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAC2yhNDR8Smc3dIyKtwD0b%2BdYqFZ7qWipTdHF%2FYkpmNakUmMvDglMQgM%2B%2F7YBkHzkNNLGH3Bhat8hAtTpCfs6BinXQQvrL9%2FRPqjzbn8%2BpLKryA2YiETq1eptznhGB9n%2ByTfgKKLVeMx7I5PBu8SfUyEtt%2F4fqqjj9pbcTAu%2BaJWU6o8mUxLWu7SPnH0XZ2k3GjPnikqS7Hg7kk6d8TKIxVJj7AwsyR5JT07rQ%2BNaSYpMESnQfC7UBhgJk47gOdGJ6MqKb90PaTjl1k8tp4vW1ed2vcuNBSf%2BzPaXchuqzqQ0Qoja94b%2FxilzY%2F57pP5ycJz8NDaW6PyE9%2BOlhfJ60sFuC%2Bg43sIqFztUYWjll5j%2FNubq%2Fu5X8YNC4ptRyX5wubM3tF83sQWlHIe0DdPKS%2FpnER2z5S2Qtb0AlS3wxBIMknBGkHoKhg4L0FqZ29DKBJHwFEcyi3HyMwygd0feGDitua4GNabb31MNOk%2FJstVypIMbQu2%2FsLJzWlmSYAgk%2BmYb4NRFbZo1VM3WYYi1i5%2Fnk9%2BcYeKJ0XF6B7HMvtvpQxny%2BCU%2Fw0lkHyvQrCAqvZZ02Gs5yTrMEeFptEw2rPU%2Fs4hrDzVlrgVlZZqQt2N8%2FDs7bZYwgFrYWJaiZtwrQTKICvRzV7MaeEwqtSZzgY6pgEfpP%2BcbZ6k2FUM273UVDwpO3P8KksJDg9QkOwpT2R9NWDZplV65BrSU2XweCEJL4yg9hplvS9BNJq%2F9KPWk4gVjEVHqLv6QIp%2BqZRSx7bAFUUzLqr8%2BIIHTj%2Br0s2a%2BlTew0Wus37jF32u1saKmFPJAJuRFLxxi%2BAznGlC54hHf76S3IinZeo96FW2UdEUhKMRgoRz9VPeQwYUO1PpLc5ZaIcl4%2Fh4&X-Amz-Signature=a638bcd60eca455d1c845ec5624aae6d74f40d10ed18d3cfbe4f90b94a48997f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLVBNGWL%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDnehgv4nP4up%2FesRVf1JVkF2rwXxRlSLF%2F%2BXdhdjzi%2BAIgahoBcFwcqZSS0MySNtYAjvnVm%2BOWiAOJgvkPsVCVQSQqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIEdXVeeV7qeM10LFCrcA%2FuVCTf1Vx8aoFlkldcc27sgP9aXbgWUWdhZxRJB3GK6ssXdBl9OoP%2BABCrYlhBPK3jp1cNr0CCBsWJ9oOe13FzpXnhSjQRCSc%2FgL3HVvZgqVvg06vKmQWJMHbZzH59MvbECEp%2FL%2Fh4RovZ7ywEWpQFDHRrb%2BVxfk22KwEfix8YvbrvWe4d7N0Cf1VzY0Gx%2BxYlt3civ%2FyZvMWrmFeY1208aMLP34KRotHXPpq%2F9MQlUWjZ%2FKNOzcJsgPRnhq3P8ntmwabgEJMZJ2V1CG8FB5wvFJG8o6bRdvik90KQ0bevzCCu3dFtDAXHdgsSGbj0kcnOYZjPLJyqAxOvMRmqq1H8eGuh2Q%2FxpJlHm1nAYNJ2rz6wsbikc3HqzfJnKCVZWyAl%2BAgJF98h4Q9HvbhQ9B1Wn8L%2B2vJnOdg%2FH64j5D3z3m0x3ybD9Xhd%2FwFLe4mTs4lqeFY8cRQhVGOOufIfivwjeQAvWFyjWKm3Vg3WO3hKQPhOTPMmufe8QpiW6NZRCyNkK%2FSXsCtz6fUWWi6J1aeDxIKW3JzGx68%2FedAOCQ2Vb2fE9RAe7lTex3kNxjhy8Hf0woDcueGVAPLAh7AN6GrdsUidfZZ6JbW6VGTO63v6JNznaTlDmvzamk4gBMPLTmc4GOqUBiMnnQa4T3QQkPCYte7koVnETLaBkyWL0LZdZ55c1Qf%2F37dSoXVMWRHavB2RayrtXTAEmdrzp4EPzEFBQcLvWqoamn2WxZccId6%2BXuWut13xEBpOgum9Aes6W0sYqeRngSFtaOcfstg%2F9BXfA9MlHsbxhLybyxWQTflEy1dhVDIS1w6QU8jEa4GW5bLpiQIfnFs11PR33rgOEsGsSF7Uy7%2Fp%2B0Mro&X-Amz-Signature=d5348e7fe407a267d8c59e052097af27798414f1ad7519e2b1ee49c7191c0e0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLVBNGWL%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDnehgv4nP4up%2FesRVf1JVkF2rwXxRlSLF%2F%2BXdhdjzi%2BAIgahoBcFwcqZSS0MySNtYAjvnVm%2BOWiAOJgvkPsVCVQSQqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIEdXVeeV7qeM10LFCrcA%2FuVCTf1Vx8aoFlkldcc27sgP9aXbgWUWdhZxRJB3GK6ssXdBl9OoP%2BABCrYlhBPK3jp1cNr0CCBsWJ9oOe13FzpXnhSjQRCSc%2FgL3HVvZgqVvg06vKmQWJMHbZzH59MvbECEp%2FL%2Fh4RovZ7ywEWpQFDHRrb%2BVxfk22KwEfix8YvbrvWe4d7N0Cf1VzY0Gx%2BxYlt3civ%2FyZvMWrmFeY1208aMLP34KRotHXPpq%2F9MQlUWjZ%2FKNOzcJsgPRnhq3P8ntmwabgEJMZJ2V1CG8FB5wvFJG8o6bRdvik90KQ0bevzCCu3dFtDAXHdgsSGbj0kcnOYZjPLJyqAxOvMRmqq1H8eGuh2Q%2FxpJlHm1nAYNJ2rz6wsbikc3HqzfJnKCVZWyAl%2BAgJF98h4Q9HvbhQ9B1Wn8L%2B2vJnOdg%2FH64j5D3z3m0x3ybD9Xhd%2FwFLe4mTs4lqeFY8cRQhVGOOufIfivwjeQAvWFyjWKm3Vg3WO3hKQPhOTPMmufe8QpiW6NZRCyNkK%2FSXsCtz6fUWWi6J1aeDxIKW3JzGx68%2FedAOCQ2Vb2fE9RAe7lTex3kNxjhy8Hf0woDcueGVAPLAh7AN6GrdsUidfZZ6JbW6VGTO63v6JNznaTlDmvzamk4gBMPLTmc4GOqUBiMnnQa4T3QQkPCYte7koVnETLaBkyWL0LZdZ55c1Qf%2F37dSoXVMWRHavB2RayrtXTAEmdrzp4EPzEFBQcLvWqoamn2WxZccId6%2BXuWut13xEBpOgum9Aes6W0sYqeRngSFtaOcfstg%2F9BXfA9MlHsbxhLybyxWQTflEy1dhVDIS1w6QU8jEa4GW5bLpiQIfnFs11PR33rgOEsGsSF7Uy7%2Fp%2B0Mro&X-Amz-Signature=9268acb4461c1356d20a4aaab827dd194cf9d257bc7bac643895ec004d80c92d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYQZJCXL%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCICx5TYewYeeBJ8DKXjqqma4w9kjzBRRE39PSZOQa5RKBAiEAovIcD9CplFTVDn7SawbKaWSgjfQhEQn%2BGBNGfj3hrvQqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCVd8rlWL7f3l3zvdyrcAxaoNFCEtFk%2B4RWUrW9TpICp3FxgSQnOPnsW%2Faf9fknau10%2BjrtrvOCipcJo7N3NeaJEgy33IRxA5wLfgwaZoIy5Kdw9Uwtw3jEmLO1pFmdWwkemMCCUHmP%2Bf7mFtbtSzEY2xAFX5VFWI%2FLOn9cjc8TN7AWpTtCDd9SRX6z20JH45D%2FYdR6BYDCfJd5w68MGSBMK2%2BaJgMYI4BICgSM5RunYtISQ4H2Lk2LkfNRhtUwF%2F3RKjXctjyKJ3CcPfDBAd5j9mFQegzC%2FgofR6wzlknQo0w1oQjtdOKZZafOv31Ty5k6ti2JucZiX2JddrsJYklmjj0%2BVVPWSFyfqOxQwpWF86Jba3dCqiEDJ84AC5dkvi9pTsbAk22mtOvXfK3rky9XZG%2FHUxKTb3U%2FtgRewK6PeSIRLV5W6ivMSpyeWpduMqPpkRlfAp4FghjSyJm7u1RCxH%2BfnZsLW8%2FI0pTgGxaUNgPrQ0WLNq5ITF5zh3QmqmxIfvp3e9FLF08KrLsr7dr03sHmC0T3uWC8xB%2FQDYXV86iRhSwtY%2FOu5dV6zdxS0vFbundxguLP%2BKXwL%2BNc27ALoV0CiuQcxTYGDAXpNFz18s1quxhJ2BQSRBTmof9VqTX%2BLjbNCAl%2BR5kY1MPSxmc4GOqUB%2B%2FNuEdypYexhI2Qj%2BiY6t%2BHuAV74ZylqGgNO%2B%2B1pCWoKBToNEw9xEGVmSqJU7sFO6q0zWJtQUVIF1LjC2WzLzbj5BbRj%2BrvKOsL9MIRgP66y4A5XPhw0%2Bo6t8xJHltZzRorUVKAsHklqhqL3kUK%2Fjjhd2rJxGfmUwq9E2cNQ8QrCYiUBe%2FnrWA2JsDK7ZtFYeq05ktCzvUFdgMNicHqmxkDZbLDR&X-Amz-Signature=5ff5cc00bef3fa39baaf633fa6745757241fb1c12816ff16f145395b52ec89b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVFQAHVO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCYQrHiHLRmXNGI69WSDnAJquX%2F9W0ygP0AfADxArcEYwIhAM3nwaVFinrmfDD8gQ73dgv%2FoeOyWr4hH91AaXAT%2F%2FPLKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxbJGTDNsC4BXsUy%2BMq3ANylvCBsUocdY6h2LaoW54V97rMdFv5t4oQliy0FVNOf7c5Is9UAwNz2wCrcn7o6Arh86i9K9eG01sTcnF32MyfKpvXnFXEPYazFjEWzYQ32R2du0naYRyWdey%2Brw6RAQpLw00Es0XHb38p26Y%2F6qSLT38oBldB0UY5A0pZ1%2BSQcw1vSIe4bIl7ECjKnv65JP%2BgGFAZRRZRE8YMXioPa1%2BUyHAgTZ8gzYx2Kx%2FRmf4TupAq65fDCjpeWUNlLLQuwXx%2BeSsg9xdAAisxrF%2B7Km39t4pvdoNHCbCOthvvHWkzwBwWa7cnotPXDW0xQ1T%2BHu2V3HrUWwWjN2b7a4VCfoaKOrydcC%2F5e7tvhg4AsjbAhmnHQEgV%2FpXRiebb93Ko2HcoSjb2LCg1DnRI6n3TTyBw%2FEtsJW4YB9y9kLTpJD8OPAC3QmhMKzehiRFQCXLnP%2BEfRMHrodNO5veasQfkyOX0CPSW4RSKGphC67AyP4lI7f5ElD6yhbQI3nv70xEJ8Scquyi1q1t9uZU8aMLIGU2HbkN%2Bp3tMUDGR5cuKhYA%2BmXM2cwYTRbqQ8K0ZJ3ZOu4v2sBIO%2B2377L3baZA4CrnIFnqFH4IIyBWyIphvmdb0UmjtGgRsh%2Bess55WNTCN05nOBjqkAfvq2yxm3HSdpxYDd%2F1uipdbsOmcKHR7vzWuTauIvbKFk53z0HzrOeZ6HuGkai8u9NwDRctVOzK%2B%2F4O9CLhMOE0PsOZ4VlH1Zh%2BP%2FScAgtkDmyw6Jf%2F7AaK8ayVJSldJ0tf2a9398vV5OmlBDGFyItZnBPLQ8W9nBVRN6fYEtFmhdcLZoqRJw0kR5giLP9JWRo2P%2Fm4s1ftigeWLBymtDVFdqrvM&X-Amz-Signature=771fcf72249525f29293d53a7f4ea430f343bef6ea8cae23403b202e5d5db4c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVFQAHVO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCYQrHiHLRmXNGI69WSDnAJquX%2F9W0ygP0AfADxArcEYwIhAM3nwaVFinrmfDD8gQ73dgv%2FoeOyWr4hH91AaXAT%2F%2FPLKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxbJGTDNsC4BXsUy%2BMq3ANylvCBsUocdY6h2LaoW54V97rMdFv5t4oQliy0FVNOf7c5Is9UAwNz2wCrcn7o6Arh86i9K9eG01sTcnF32MyfKpvXnFXEPYazFjEWzYQ32R2du0naYRyWdey%2Brw6RAQpLw00Es0XHb38p26Y%2F6qSLT38oBldB0UY5A0pZ1%2BSQcw1vSIe4bIl7ECjKnv65JP%2BgGFAZRRZRE8YMXioPa1%2BUyHAgTZ8gzYx2Kx%2FRmf4TupAq65fDCjpeWUNlLLQuwXx%2BeSsg9xdAAisxrF%2B7Km39t4pvdoNHCbCOthvvHWkzwBwWa7cnotPXDW0xQ1T%2BHu2V3HrUWwWjN2b7a4VCfoaKOrydcC%2F5e7tvhg4AsjbAhmnHQEgV%2FpXRiebb93Ko2HcoSjb2LCg1DnRI6n3TTyBw%2FEtsJW4YB9y9kLTpJD8OPAC3QmhMKzehiRFQCXLnP%2BEfRMHrodNO5veasQfkyOX0CPSW4RSKGphC67AyP4lI7f5ElD6yhbQI3nv70xEJ8Scquyi1q1t9uZU8aMLIGU2HbkN%2Bp3tMUDGR5cuKhYA%2BmXM2cwYTRbqQ8K0ZJ3ZOu4v2sBIO%2B2377L3baZA4CrnIFnqFH4IIyBWyIphvmdb0UmjtGgRsh%2Bess55WNTCN05nOBjqkAfvq2yxm3HSdpxYDd%2F1uipdbsOmcKHR7vzWuTauIvbKFk53z0HzrOeZ6HuGkai8u9NwDRctVOzK%2B%2F4O9CLhMOE0PsOZ4VlH1Zh%2BP%2FScAgtkDmyw6Jf%2F7AaK8ayVJSldJ0tf2a9398vV5OmlBDGFyItZnBPLQ8W9nBVRN6fYEtFmhdcLZoqRJw0kR5giLP9JWRo2P%2Fm4s1ftigeWLBymtDVFdqrvM&X-Amz-Signature=771fcf72249525f29293d53a7f4ea430f343bef6ea8cae23403b202e5d5db4c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHOQ3SY2%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T113213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIEHHXuT8uwOZuxEIZV1M3klBYyCKveiuWh%2Bvry4QpKJ0AiEAsXew4CaDED6SQ7oL9pXRYb4jtWQ8SWJt9fN66IvgjqEqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBI%2BwyDm5HCALaVYlircA56SH4VGPDw5GTCmgDZv3QO694A6jNiAKQH1q2WDg%2B8cp5imnVl9kdPaREdwKAj1Xs%2FlZ7SqIMz%2BgEoVclbVuXJZhqQOiPpYEmNylL1C9EzJcWtFDOhiZnvbRzVTAIWXh01D9dUixj5hZjfr7RvbwOb%2BSsPtYGBXieBJb8lUs2H5OWrrOlSTjp7FepsEfuL%2FKOZuJnfbfT%2BjvCF%2Fip08n73OK8otcGdzJrtBp0z90JHBYomTEIGmMYRUIdAfAcQtpky8pz%2FXOwaJfMuzvvQ34qM8HMK3PYLKaaxADH9WHz8ijwd%2FHrpDEhQinPKwrG409Q3tA4Z%2Frc%2BEgQ7a7oQk3Qz26YTcT3diduYIsXVgsAJAINv0L%2BD30quYnQhhGp4XlWxFtJRNAkIrk3D7EC%2B1M1HeZ4KO%2Bn9pkBtLjXExg8UL2bi1Y1BcCP%2Bfj0GHrLsppRfZbeAqyS6yIdtIMUIwlS8lMLcjBNTyVWJxvwlgjfiEj6ai8AUQwjzD8Vvlm75Uo7xPDeXuT9HQ5oT39bmSVewd88VPo1lDyHcQ5%2FifHSKBcyZM54IiHtIDMgD%2FKxF%2BCtRkt9ToI2TyMuyV9D3TYBRjv4399lv213fB9y4HGCoieYBP1mbsBSZsue2FML3Tmc4GOqUB9Hm4iY9bG5%2BGkE%2Fz50ViHig0wGdKiaUB1SFxcvzI2bFLji5GUFibifOwOEnChm0uJpbTE2Lphd%2BbKYxFjkOlvIAzA0WtlcpNQf3rmH%2F1ztfe0LI6G8TjLEVDq4dQNFhCBAEB%2BBHyKVg2R1XpyYGQwsvSvHYzdObGj1hwzB2b1zHkE0WALZwhImt7inseokRosZ%2FgwkzeAWrJTLYDm%2FNQk64fohD2&X-Amz-Signature=73815d424b7c9d7d8a626903ef514c3d624432b1348d2df2750724190dd6d189&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2UE7VI5%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNCI411GKPeD6pRGaL5x4NsdqqBD8%2FFexvPFoWZB8GDwIhAKD7ffxtA%2FuKSwK98be3cMkXiJBGcw97D5WolJvC3hyNKv8DCFgQABoMNjM3NDIzMTgzODA1IgzH6vnL6MCIa5uNzYkq3AMC9hxZQjGJ0wdLMXub83EvaYiLVirYnWKh6jDJBoT%2FGv2bk22R66SvY8AaoMfnN5ZbPtgOE1tGb9yjvnN3wC7mtvyQFULA9LTjyXJ5O408o7fI592rs%2FxJeAF0ARu9MVMdRdun0VkVHx5k8XhBqTZ%2BXNxJCERdZDb15O491YO3SvhamDYUH8HNeO8WhsBFLLRP%2BuUU%2FGYWSJo2iKEqTAtknlrXUYKAwpwdTWp8vmqZLYsMTacdkmDAgA54%2BO4rVMxDEEzPeEpDGWJW4Iz%2FyC7bcq2VhDUgc4zY7tPOJ0uiMRSUo2PH0oz2p527RCuR9yYr22njAjJDXXiRVBHUclKUXqHKomN37Sbq6rkjmyPk2sK03y6Qf%2FMd0qsgZpZKeU4h4UMCatIGspCloOL1umvJ%2F89%2FREZLweL8ktMIUPFL11WKWG6sgFtBYYZX3tSnFnYq%2FJT6UpD%2Bau7GCoOirIIQb8Z6eJkvYeRgVUXEKuqsWYCJV%2Faaqa5OaAbIM3TN8jaECzypo%2F%2FgkI068XNWm4nvdgM3fRnG3OWpfSjJFmBmGSADxUzVVEVocUwsMKWMnKzEac54ne41D5LBncKjGnM2CsmS8tuHJX6jKOxfJjAZfjDPHnLdYHPtGO0qoTDAsMTNBjqkAXtoYqHrb8MiUaQOvPpbmm%2Fz2LYcBW314YWxzmMaU6QLmMD80KSuMQUXfdQIvdeBM4BxQC21FkGcvMA3%2BoiO%2BDR6Lt%2FlzeYJrhjaT6w8Jb1Y1HMi6brJm6cOfD9IZkZ5vPDGBGuoacKupqdbOn5ETaUCvIvw5FbQ7jUr2uI24BWFviStvQCkEDG58TEiBlB%2B%2FfJkGbskHheeB4PcSWxdotMI%2FRBI&X-Amz-Signature=3876674df35173f570be5d601678b8d1060e59cf0e476919f471c3512e3d803d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2UE7VI5%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNCI411GKPeD6pRGaL5x4NsdqqBD8%2FFexvPFoWZB8GDwIhAKD7ffxtA%2FuKSwK98be3cMkXiJBGcw97D5WolJvC3hyNKv8DCFgQABoMNjM3NDIzMTgzODA1IgzH6vnL6MCIa5uNzYkq3AMC9hxZQjGJ0wdLMXub83EvaYiLVirYnWKh6jDJBoT%2FGv2bk22R66SvY8AaoMfnN5ZbPtgOE1tGb9yjvnN3wC7mtvyQFULA9LTjyXJ5O408o7fI592rs%2FxJeAF0ARu9MVMdRdun0VkVHx5k8XhBqTZ%2BXNxJCERdZDb15O491YO3SvhamDYUH8HNeO8WhsBFLLRP%2BuUU%2FGYWSJo2iKEqTAtknlrXUYKAwpwdTWp8vmqZLYsMTacdkmDAgA54%2BO4rVMxDEEzPeEpDGWJW4Iz%2FyC7bcq2VhDUgc4zY7tPOJ0uiMRSUo2PH0oz2p527RCuR9yYr22njAjJDXXiRVBHUclKUXqHKomN37Sbq6rkjmyPk2sK03y6Qf%2FMd0qsgZpZKeU4h4UMCatIGspCloOL1umvJ%2F89%2FREZLweL8ktMIUPFL11WKWG6sgFtBYYZX3tSnFnYq%2FJT6UpD%2Bau7GCoOirIIQb8Z6eJkvYeRgVUXEKuqsWYCJV%2Faaqa5OaAbIM3TN8jaECzypo%2F%2FgkI068XNWm4nvdgM3fRnG3OWpfSjJFmBmGSADxUzVVEVocUwsMKWMnKzEac54ne41D5LBncKjGnM2CsmS8tuHJX6jKOxfJjAZfjDPHnLdYHPtGO0qoTDAsMTNBjqkAXtoYqHrb8MiUaQOvPpbmm%2Fz2LYcBW314YWxzmMaU6QLmMD80KSuMQUXfdQIvdeBM4BxQC21FkGcvMA3%2BoiO%2BDR6Lt%2FlzeYJrhjaT6w8Jb1Y1HMi6brJm6cOfD9IZkZ5vPDGBGuoacKupqdbOn5ETaUCvIvw5FbQ7jUr2uI24BWFviStvQCkEDG58TEiBlB%2B%2FfJkGbskHheeB4PcSWxdotMI%2FRBI&X-Amz-Signature=3876674df35173f570be5d601678b8d1060e59cf0e476919f471c3512e3d803d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5VLIKEG%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGbGHgb89Z%2FTvzHzn4OhIyPje%2BXKtXOuwpp5IDT2f2XMAiEAwdLfhUevuTY3gA33OvVaC6REfZyYGs12WFkN3cUs0CUq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDM8SrZWXbWX2b9K4VyrcA%2FZCM4MHz8hoVa%2BYkTi9Iu%2FKRpMgWMWJrVowZLZbjeUD3AQNo16X0vvDCG3EsYQQNcDOZKrZZxQ1gKVCf3V9pU9pv%2BvMuvpMyKzX%2FWcKOWQgIZ6TElle%2BguM4YUsQZU7QP6OxWUVAQhJv9CSVPjY8hiRPOubCms4FbpB4gtsB0zoOx2%2BvwcKmwC93WpEW9zCZH28MwK61N38%2FLiYV32XRkRK9Nlh3CrnVruAbpWHWSUvIywfKpsD%2FpOnaM1tbPvxzV%2Bd%2BGwmbWSY5Nlta6qEp%2FhXZsJBl9mWZ9MWrI5k3SfgmRDZrIhX30VfSIBd4q%2F3haxHFxkslCmsLM7t4I9jjnISdb08fbTls0sG8FxA%2BBusxWyTcGKU8Ors1LjHPCvZiRUUm1WDwuqzi%2FsramyNj4BZZyqGU%2BBCHAy8p%2Bi1dVvIEJk0JmBBfy0ZHLs1MmVPbt041D5g9PI1DWDB7sGZP8O7D9BD%2FTgE9SWpjreXRgGo%2BapB0NbbJgTjcCwYCnrqwMj4WrZyOh89eBvjUBS7fwZeUoUvekyXNxVqlyynnqSAJexvMjEiuiX%2FIvgWr3p6KKYJjGW4joFPgcX4h3MuWojZOqzIvBwSMxv2NxG06fCuLgBT6hP3hQymRxSQMPKvxM0GOqUBoc58b9sA5%2B6YnmEDhMNMNr6Mrz3%2BGHVZiV7W1yKgxv4yoMSK2uPXNfhKe8oXjj9Z2cFGRG2%2BffzwQ36nAh45AZ8ttB7yAF3ApzdnL2rSyaV%2FpCAuRgBwoiAdUfQo9pVMcGxF9R0ShtTCLYPSIRR27VjAb%2BK4FSbMY%2B5TZXQU%2FydT5lG2H9S6q%2B1nY1FWLx98ycmmTyOax1nfePoWAHPWbflP0xO7&X-Amz-Signature=b081ffb9b8efe53621e984a0f1f68c403cec0c499fb389a289a66e40a7cb5e6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666KWJOMP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAix3cddEIM4hDeG3Rc1XeoVE6dBQAkM4mulDn4isEncAiA10LJ5lmDVwOj3lOWF04nR6E8AKFig8XL9Eh5YR2tXrCr%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIMSf%2Bstr%2FaSp5Hoi4MKtwDvgMZypVRMbrbZI70l8n8zEMwNbd%2BMxsfUFV3Rfz%2BKJgwm9qv8fMRo1k8Vx9njtXsZ9yf3vfzjkEWiioRALvze%2FDWlj5i7sM3sNMi26bJuUYfgbf3edv1U99C778WX%2B0T7w5LRjTuVYssNGCxBroO9hyfGn1%2B8VgaHkZwfoFtFjvps3EEWkAfCbtz41L3XXNOntUae298SjmehoOH%2BYXI96A4oZM9XpDuWVVTamdYxV3U%2BGE%2BN9szfTGbiMhc9OLisVUbSux0x5%2FrUtRmu9dCKb6HF99eIMjY0Ui89ZPOYQWWWDhJY9PC7nd8xShVYcuSL46Tchr9y5yNCZsH1m%2BWvpaythmHOTttZHlsSFnr2fUQSvsrC7Ar9asPpzN420HzvCi1entk9BSsKRx94fdPhrZE3RP8C1nf%2FllF%2BMrcxGW5vjWpgoGIFHuq4awxU%2BH6UjFsm%2FNU6o8ens1G6CjeHQespNR3beLUwugOCd9K1r7z3uPD%2FzcDEgcY9vcC2O%2BBv9wwvL6%2BTtN3OKGvwNYr9yEWN8dcCbZ69cseJWuP7dPPbKxkC8E2wfcwXzeINcQMcuJX0GtML8FnI77y7oROS9QJygEAAlHOFP5H%2FpK0%2FAFRNx0AfZsuYZLOaZgw66%2FEzQY6pgF5y%2B7eNsHKtzSm%2FZK51oZWCDl%2FBN8ZgEjTGt6NxTIJ4UzX7MhWmxUqgtkKWS4%2BuVzxiJcJKMSCFJGndoOdInpWnA3mVj%2BgWloV8bbVLkcnGvgqOsgsxFIzJUOvKO2wGvxK8zJ3BKkupqjsZdurrHNt8qZESZu94ElQMEpYmAqUWUWGY6JSOvsDvnJONUvrKm0kuPEiz66NAvmDUcbI7sBeUEsimKDY&X-Amz-Signature=8385d9670be113c1986b7fd041d6d6c229c69771aa8f912b185073201fa083e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666KWJOMP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAix3cddEIM4hDeG3Rc1XeoVE6dBQAkM4mulDn4isEncAiA10LJ5lmDVwOj3lOWF04nR6E8AKFig8XL9Eh5YR2tXrCr%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIMSf%2Bstr%2FaSp5Hoi4MKtwDvgMZypVRMbrbZI70l8n8zEMwNbd%2BMxsfUFV3Rfz%2BKJgwm9qv8fMRo1k8Vx9njtXsZ9yf3vfzjkEWiioRALvze%2FDWlj5i7sM3sNMi26bJuUYfgbf3edv1U99C778WX%2B0T7w5LRjTuVYssNGCxBroO9hyfGn1%2B8VgaHkZwfoFtFjvps3EEWkAfCbtz41L3XXNOntUae298SjmehoOH%2BYXI96A4oZM9XpDuWVVTamdYxV3U%2BGE%2BN9szfTGbiMhc9OLisVUbSux0x5%2FrUtRmu9dCKb6HF99eIMjY0Ui89ZPOYQWWWDhJY9PC7nd8xShVYcuSL46Tchr9y5yNCZsH1m%2BWvpaythmHOTttZHlsSFnr2fUQSvsrC7Ar9asPpzN420HzvCi1entk9BSsKRx94fdPhrZE3RP8C1nf%2FllF%2BMrcxGW5vjWpgoGIFHuq4awxU%2BH6UjFsm%2FNU6o8ens1G6CjeHQespNR3beLUwugOCd9K1r7z3uPD%2FzcDEgcY9vcC2O%2BBv9wwvL6%2BTtN3OKGvwNYr9yEWN8dcCbZ69cseJWuP7dPPbKxkC8E2wfcwXzeINcQMcuJX0GtML8FnI77y7oROS9QJygEAAlHOFP5H%2FpK0%2FAFRNx0AfZsuYZLOaZgw66%2FEzQY6pgF5y%2B7eNsHKtzSm%2FZK51oZWCDl%2FBN8ZgEjTGt6NxTIJ4UzX7MhWmxUqgtkKWS4%2BuVzxiJcJKMSCFJGndoOdInpWnA3mVj%2BgWloV8bbVLkcnGvgqOsgsxFIzJUOvKO2wGvxK8zJ3BKkupqjsZdurrHNt8qZESZu94ElQMEpYmAqUWUWGY6JSOvsDvnJONUvrKm0kuPEiz66NAvmDUcbI7sBeUEsimKDY&X-Amz-Signature=3c3010e47d20166c59280e7f248640e50ac4beffa6c8dbedb5f184f53470e5ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YG6SMRNP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcuPg%2F9YzH2%2BVVXSMuLIv%2BdsdAS6Cj%2BmF%2FPuzj7ImoWgIgWKIF1cyyhud0oiqRThttU4wL4CXxor1Y4tSfc0huDtkq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDPoSdAYg4mCiVEjepyrcA7uQCClCE7HJrPb8r3lSXW%2FK2gv7Z7rwrE%2FxIMyTxZijfKANmXoO%2Bh3u6YdplrQKS2jp6dHWMGhf5Ak3XWHdrqZQFsXgbrDIKzCFZCGM%2BooEJaWewxeRDJTQM7y1iBpTJrfBvHQjlYB0iUc7661qUkJjJ1BtzpX4yMyizLNetb7OZbaSvZ9nAqhgKJuU7vHnFAXZxQmpFf8bYEP%2FSvZaTSKGq%2BDt3BgRdcEal0s7EFoalfgJO33cJznBfSf%2FoZtYhfpcYdxF8mBQ1FKdU0ZBpZnoFpyzqRYGEan2JUpR5DYgYAiAwyrUId1A4n0NK57ej27dFnDUUP7tcnQPRAYvldANh%2F1Cq%2Fxy6YW%2FuyYRCrSFyMAZ1JIYGM5mWvGKicyZPEhFtWIT75ytGI%2FAYldcU631U6Q3JtF9dnL8CJ0ilFUs5fljgGMErVwpOvM1%2FWswvDDG0NwaPJw8CPtTPie6gN6pfAfXM4nw0lgnGv8R7Ah7hFJtRUR6EuwE%2BoaTEUPGM16QBIDOO2RrPslq%2FsMlTcHcw1wAWfioKLWulItSCl478sTSk0waPUi5WMXavN84WwB5B7CsMo0BDbkyo%2FifluYRfYP4f1gKgxq1HnDWYhd5yV1iuCnQHhO5aL%2BDMOevxM0GOqUBpawgARPPSXlchihtSK2G78kwoHKoV0SVuFccLW5qq5UFQudA3ghj84l7xFtLEtz%2FjCw6vAW87bwmrcn%2Bx%2B6%2FcHS%2BiWkxrFYVcFdRm9COxGWBLXWtlDI9AoXrfjK12etOoY44jyBdAhXRksjMUTCXWAYc0IpCIBIsh4LUEI2qYf6vQjEbik1DlLGZd%2BZVKbYs1CRdNb0AWG%2B%2BkyHJTpCoxDKhwx6g&X-Amz-Signature=0db05945eca0501e300982777647f54cb6908a6b4d84091b888581e45fdf0af4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4R6G5PW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBn9CV46aa%2BlHHOR2bqaXCcXB4YdldsmJ0yl0ZLyX3DcAiBHt6s5saFuJvni8K9h7Jiw5XuUK9xa4XfOiZZiofrs7Cr%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIM%2FQ8xgVt%2B0jHKsDuVKtwDmviCNWf4%2BF5eFxJ%2BITHS6Gun6dtg%2BC%2FRhuOELOC4y35zCVFjOUpIu93wYLAO2C4S6nubJR%2F3AwN%2BYdd7Fe%2BaciEIaopSqfcLB8%2FIer3X2tYUNGMvn2u7C9dBvz3qK0jiO3ZoNGcwFQ33Wk7%2FfDInmXbZzGnMZUxK8lTlIhdzCxN1UTjKf77pjPyXSO1OrOp5s4ih3V7pzh0RsOd7fOJg%2F8f2svPBaRQ9UsdKtf4%2FEHW40jg60AgiMOom1CCZ4rjMpAnlwQmcWOzKBgnU%2FBdHOKKf0KDgOWpdU%2FUCqgbcMB67YC6HcJP7I%2B6YzhQfCd7Niivu0IVvfQneWLUbvZXsCBqKEPUJU6oUz2nocwJArTFS0wIlaDhTf0zYyVfeL%2FrliRVw7CEZgIZbd2Bc%2Bg9S3adJ56aXjAOFs%2Fbcmj4GjvMcncn5VNaufWEpI6axmT3A9v35F6iWA5qKIt%2Bs8cIo56g98yC4I1VmpF9X05Q0Hh014Nyt2w7%2FkWVJM1PKeY6wiSa1tM5xm9iZiyxp5e21IUSlYYgo5BTSrTVd3Mvn0a2j7gzFEH4eG1WcQifsGAdB12VgaEdK1MRY8ocEalIh5PERmvxOB02VwLbOmcha8L99KhNl4v2IcUyDGmEws7DEzQY6pgFJaf5MbtXpCd0omzfYkVPPrbV3HsySgRM0AJ3gU3Gnu6vOUucX8eCtGDkdIUqJESvlKgSZYuNONBUpA5DtUA8xGyp%2BakYJKrKeH%2F57SDuwW7GyIeDt5fBBLrkKIJL5COoSCw8JJkvMrmI%2BFn6967M7S58MU1wMA5smTgTgPijUvh2%2Bik9%2BvPFzDN9EbF9iIK2%2BixxZY6%2F6iwrpm53bXmrtwAQiX5GI&X-Amz-Signature=571cd2452e1736642351327f315561d39fb77d11970a257ae0bb5eb1c014e62d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFUHSL33%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDF%2FZVmles%2FGxC5i47vKCAE71D5BsyWOX2%2Buq3bhmBz1gIhAOZVbnGO1jlPhS6un1jjZcn4Dni5ymLnA71wtnfZ18kJKv8DCFgQABoMNjM3NDIzMTgzODA1IgyjL7tFPsc5nyPjrWMq3AOTBpSK9Xl%2FuHHayYXb2aDlZb7gTAsnmMQpaBekLXFmwqTGpuYDjhdDbiZNLUff45P3jDh5rrGcrSHfZ5Xg9wiTqdEsPjKWeg4p1ermyIqyIrk0dNbkyJc1LCgr5aMCrndDWp4j%2FNeWGQBu7q7g1qq2jNb7eX1yhiQEV54ND3iKpo2tLpezyFJcs35IUQGRWRB0eM9IFGbOmmScia%2Bh99xRGOPoB%2BOMKVn05M54YfWD%2BRAQyQypKnV8M98vvIkR1Haqiu6bQ1A15z4zHfowdB73sAnnCryQQM6X0zITlJN8y%2F0mU2IwNJPJNI3zSmpoWjCB2pdCA7UjVGTKXU3I3raQDjTCuY6DG14ZwOWaAndhCfqRWSuPJY8X%2FnHBwQ1IwFOAGlT2CVJ%2B54NsDCzDbWE4l4oZTThyCOJG6Y2HbyIbFf%2FbsAYeYgHzRzJy4a%2BZrNpweBpHRoLXtl1oKPs6YhLL2ZwqQznUwwL6%2BnYEHHuTKO9zVGUCcKQE6VX05bXMrPfQseHd1%2Fbkkd0mgbOD6vH16t0mDbOBTWqe%2FrhCCOT2HyAl3zPMgMj0pa4RPWh5ny9pcl8oRgX84fR2D6jENH6AKVRoU3SWpTRxIS6H3bLOTR9gwzmlYfobdoB3rzCpsMTNBjqkAREBbmWDjVFjQFXZRD2nJbgOiATURmmH9%2FAjNMcEfMPn%2FcdxcoJ%2F1slmK9WZfyLOiZzRyMuKsDFPSFFoSRSdUsj80ZwdQbcVWbeJdLTmWC5r3bBtTzAZlqSkevpgGv%2FTn0YKem4uejQftL8JJFjsN7jpHWoHil6CYynJWpAem3UBMLyYUDE7vR6EHNjiI1i9QymttPTHX6LQuGD%2F8BvnZY%2FkYS02&X-Amz-Signature=d5f9949cfd5aa332a1a5d24fc0af264bfaba327c02da3f7ca54decbb016dc084&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYUFFFLB%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDz%2FzjSNXcrC0oKEo9ToGvuXKHu1yBpbt2yMR73drt6UAiBw5LYOTkXL9K67ubHHaeX6t%2FSK0nm4VvzB4qTp5XizGCr%2FAwhZEAAaDDYzNzQyMzE4MzgwNSIMIQY7AVytGGpNK%2FHGKtwDUApkCO650%2FyJ0UmUj0%2FFV7macSUOt5JPPe5vknEQW1H%2FFT6Itglm11cb6Cw5A146eTOpnSH5P%2BXb1Z7tC1ZphP%2F4JaEeBVOCFERlziDajEgp1lC%2BwfvoFBQyLpe7IxVXDc1GCKo%2Fj6ZjGk1E4VIVaGJjVCLPzEF6V1hoRQg%2F5ME9gzv45j8%2BAky19VEZsnmvb1xcWcX8W5jMO%2Ba%2Bprp1FTCMYMCyYwsBwIQakvZY7sOL33ypIpYbbAb2V0u%2FW1mBXhDK0Yjlfesowv%2FjqasnRUHTY3mOVaZ53i6Cjc9eLmpv2Ee1bSC3f2A9quZARz9ftZdF60qtmbZaCKj7q7IXRo2Bm9Qbafx1MN3aPa%2BHu6E36dsMLk1VWB3VVf7jjSiUButVbc2AocKQszG7La4TLJo0VDSM18dA7FLERH4%2FUkDJYhmgdY2sfEEvtJir5ZMl5kNnrhqMNWqRnSKsIh7lBdVG7%2FoPvv%2BpRhMvwTzoE9Jw6XxAENaHQqxvho5RHg3VlXaRY3kpfyrPXRe6PpOxx0foyRE5PnphAsADNjugKzzorQlrR26C%2FbGR6S6r963yjcZcnJujHwl00azn2s25dV8iyVADZt1DNcahgxfOgCAIuxx61ZM71bzwh0AwybDEzQY6pgEbZT8ZQ3qlR%2B4QTVMFomAh5rJ%2BiuKd5y21PG4IIgvAbHFGyyYZc4CRjbCA94xvV25V0k%2FORTV0u6i0E2HPkWRFFEdE7AgLXz%2FR%2ByBKQVfPnojA0kWnBHXjA9moJsqGL1uidReXblX6P7wF6TXvbVvWhIqFMLNlIRsnmhb3hRR6ODnaVA7cyFS2sseojRX32lKi%2BrvJKs8NgAU1%2Bu17U4eIB%2BF5bKs%2B&X-Amz-Signature=757554efe4069fd3b924ba2023a8224eae883c4ee44845ffc792931e6f838fd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYUFFFLB%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDz%2FzjSNXcrC0oKEo9ToGvuXKHu1yBpbt2yMR73drt6UAiBw5LYOTkXL9K67ubHHaeX6t%2FSK0nm4VvzB4qTp5XizGCr%2FAwhZEAAaDDYzNzQyMzE4MzgwNSIMIQY7AVytGGpNK%2FHGKtwDUApkCO650%2FyJ0UmUj0%2FFV7macSUOt5JPPe5vknEQW1H%2FFT6Itglm11cb6Cw5A146eTOpnSH5P%2BXb1Z7tC1ZphP%2F4JaEeBVOCFERlziDajEgp1lC%2BwfvoFBQyLpe7IxVXDc1GCKo%2Fj6ZjGk1E4VIVaGJjVCLPzEF6V1hoRQg%2F5ME9gzv45j8%2BAky19VEZsnmvb1xcWcX8W5jMO%2Ba%2Bprp1FTCMYMCyYwsBwIQakvZY7sOL33ypIpYbbAb2V0u%2FW1mBXhDK0Yjlfesowv%2FjqasnRUHTY3mOVaZ53i6Cjc9eLmpv2Ee1bSC3f2A9quZARz9ftZdF60qtmbZaCKj7q7IXRo2Bm9Qbafx1MN3aPa%2BHu6E36dsMLk1VWB3VVf7jjSiUButVbc2AocKQszG7La4TLJo0VDSM18dA7FLERH4%2FUkDJYhmgdY2sfEEvtJir5ZMl5kNnrhqMNWqRnSKsIh7lBdVG7%2FoPvv%2BpRhMvwTzoE9Jw6XxAENaHQqxvho5RHg3VlXaRY3kpfyrPXRe6PpOxx0foyRE5PnphAsADNjugKzzorQlrR26C%2FbGR6S6r963yjcZcnJujHwl00azn2s25dV8iyVADZt1DNcahgxfOgCAIuxx61ZM71bzwh0AwybDEzQY6pgEbZT8ZQ3qlR%2B4QTVMFomAh5rJ%2BiuKd5y21PG4IIgvAbHFGyyYZc4CRjbCA94xvV25V0k%2FORTV0u6i0E2HPkWRFFEdE7AgLXz%2FR%2ByBKQVfPnojA0kWnBHXjA9moJsqGL1uidReXblX6P7wF6TXvbVvWhIqFMLNlIRsnmhb3hRR6ODnaVA7cyFS2sseojRX32lKi%2BrvJKs8NgAU1%2Bu17U4eIB%2BF5bKs%2B&X-Amz-Signature=fdd64931ee4600bcfa4afd568461dc59b2f8b3703a29859e9064fa6c068c3f25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOT6YUUK%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA3OzLK1cnj2%2F2loiy1Jgc5Wv%2Bo5l6fqM7Yse51%2FcuSeAiBb6jLX9JGJlXFz3k1Ckg7wjc9rcsdsr2yOP2nLLDymMSr%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIM5NQKDpcmnozSKQ5dKtwDylOhmRv5GGzIP2ClJuPKJ4B8zs9fKMagqZGdJUhsv4tF%2BfxRnPhEiI28naiTIz2eN0IJ1Qj3j8xg8ZfIGOKi4JK3tGywQPNX0JPaxA%2F8jMcy1eKAiyhS4eRRG6DpXw9h35XScOHWyx5nDAjzD8zzQOgiDkrF80XVVnTLvnbBWgFje%2Bc%2FkRB65X8UuWljv%2FPISMH0ECgZWOTvvWDyYqIyixbiNEc45lC5ctxOVDFAHFj%2F7CUxSlJ%2FpPEmYW79zwt4CxAhkJ5Ed650zmQhRFNE1gEexIc5Ks1vmoKLzLD9YjpeRpYKVeKASfNcPRhgbzUSTyO2DUMbg8o762BfE2eauy6YQS5aWadrKgiNbeqGycjbzVvlDZPz%2BTJJTniBSFGz8bRZjXVjLNAc5JLnWr2fVJWOKqpJUv3h7J7EWQI61wTAfzcFWJg5%2Fy0ntXfw1EaNOD%2BtEknQPkPOP%2F8Jm1GGOjcMGPyKJ0dkNn6EOJuSXwdmgyxU7fhAPWELTWlv%2F2oXxTgOXVeKjj%2FBZEq7eDLSJtzgtgW00q%2Bj2uyKylgPueb%2BsWu%2BsRLpBmT%2FsBHcd0dnJ2LIBfbVKX2I8NCRxedogfmRd%2BpKR7A%2FXJP6FtCpgECifOgwOlca1djJoSkwzbDEzQY6pgHrSYeNi4BB7zABWQHa0szIxAb4PQ4knHajTg8c5%2Bm%2FqBqFqlZ650NNBGsDWQF5PL6IZLldNWGFr7IErH6NWnc3325ThmFuZReJLfgUhpFxnsSnxtPxbpcJgR3G1M%2FWJq0D8ObIF6ZkRm6qO9NrJTDtOT6LAR2xc1V2N5L953kKU1qYmI9I%2Fzw%2BEat2SIAbp0IECoZ7aD6CsB5S8WU%2FSkbttWe58SAy&X-Amz-Signature=c05721538443033ec4c525f0be7ee5e5fea2aed9e2416b3f6021c9322dce6cb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646YXTY3D%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2B6KqAlwCcJWkf%2FzzOd%2BGEL4RrdGIBmqTKu%2FUd0c0IQQIgL3TzUcJVBk7fiqc279utBn8HhCqUvXV8BjqRXAVszK8q%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDMor1zqG9%2BWnNHPMGCrcA6zMybvAj86W2UKrPeRMJX5WxHZJrNO8Lbu6mzgxqhRf%2FIx5LeCOPNRKXzR3r3tfSONN8jEROE3keEEdLwCo%2BbGWDBE%2FSs%2FJUHf0YqJxbLCcKIExfcSc9XD6ce6XmpnWmlAPDelSnTC4%2F5GuIbUet%2FyObkEtDn%2FNDjPCkU2iSV%2BMUKuVS642ZEkwdTfaLLjoy3xflQmJPRPa178WWKgYEekkdF0bJClNwWPdBM1YRhGZZt5z%2FceBuTtdTj1EcoOfQzpRwjWZaYndmyV0eYDP3470vErLLs1I8avbquyoJKNkTvmWqkfbcW%2BKUtohFtJ2NJW1o0uRmO5gZVzOpV04DnTPamrF9t698iPwHA9bDSGEZqtvQTG4ZoOzyyrsCcXR6cEMH42wRCidv7yfJY240D4bsgbzVKiubqRZiAlB9uohFkD52eI11sl4SpPhXVDWb2af4IvVb4TCannabQECh%2BBfi4wFrQneGl3tSEma%2BvWUpqeXjArwHaqCs%2FgJg2SeI%2BuX%2BrjMzXr25XBfXra3h4zOfTnd%2FjtdPk1l9T3Ki642pbBQrGGY3SMDOZ0bCl5btH16pdF9Ca3W0xBV9MZjuAEDiSCkAbI25ePb9%2Ff5N0o8kFihkOVa3hk5QgD%2FMPOwxM0GOqUB7Uq7YqlfzhjIvKYhEUPXOQHMLfQ4grlI81%2Fu9JRdnn3sqhfq7vaTkxocqAApV%2FWu%2BCQBykdbd7o4PQ6M6LG8ovNELFCW8pkeM5%2Bq4jp62FQphTn7Ucik4XaFpzzRLWSJit4nbWocYCjOlUtL%2FnVvXxOkHdS7qWbynTB6u8v6H9XlOw2QQRwXRYgY7qVUF9j6AHtEj1SkOuTuNf%2B%2FA1vBS%2F8b%2B70U&X-Amz-Signature=444f0145aa4b62cbceb3f6c34a20d1e0a155a5142113ace2bc8983780936027e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646YXTY3D%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2B6KqAlwCcJWkf%2FzzOd%2BGEL4RrdGIBmqTKu%2FUd0c0IQQIgL3TzUcJVBk7fiqc279utBn8HhCqUvXV8BjqRXAVszK8q%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDMor1zqG9%2BWnNHPMGCrcA6zMybvAj86W2UKrPeRMJX5WxHZJrNO8Lbu6mzgxqhRf%2FIx5LeCOPNRKXzR3r3tfSONN8jEROE3keEEdLwCo%2BbGWDBE%2FSs%2FJUHf0YqJxbLCcKIExfcSc9XD6ce6XmpnWmlAPDelSnTC4%2F5GuIbUet%2FyObkEtDn%2FNDjPCkU2iSV%2BMUKuVS642ZEkwdTfaLLjoy3xflQmJPRPa178WWKgYEekkdF0bJClNwWPdBM1YRhGZZt5z%2FceBuTtdTj1EcoOfQzpRwjWZaYndmyV0eYDP3470vErLLs1I8avbquyoJKNkTvmWqkfbcW%2BKUtohFtJ2NJW1o0uRmO5gZVzOpV04DnTPamrF9t698iPwHA9bDSGEZqtvQTG4ZoOzyyrsCcXR6cEMH42wRCidv7yfJY240D4bsgbzVKiubqRZiAlB9uohFkD52eI11sl4SpPhXVDWb2af4IvVb4TCannabQECh%2BBfi4wFrQneGl3tSEma%2BvWUpqeXjArwHaqCs%2FgJg2SeI%2BuX%2BrjMzXr25XBfXra3h4zOfTnd%2FjtdPk1l9T3Ki642pbBQrGGY3SMDOZ0bCl5btH16pdF9Ca3W0xBV9MZjuAEDiSCkAbI25ePb9%2Ff5N0o8kFihkOVa3hk5QgD%2FMPOwxM0GOqUB7Uq7YqlfzhjIvKYhEUPXOQHMLfQ4grlI81%2Fu9JRdnn3sqhfq7vaTkxocqAApV%2FWu%2BCQBykdbd7o4PQ6M6LG8ovNELFCW8pkeM5%2Bq4jp62FQphTn7Ucik4XaFpzzRLWSJit4nbWocYCjOlUtL%2FnVvXxOkHdS7qWbynTB6u8v6H9XlOw2QQRwXRYgY7qVUF9j6AHtEj1SkOuTuNf%2B%2FA1vBS%2F8b%2B70U&X-Amz-Signature=444f0145aa4b62cbceb3f6c34a20d1e0a155a5142113ace2bc8983780936027e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BP7UEX4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T082553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5My3%2Fi7a48EP3ABSM%2FLXdXMcP2r8yLh49KlTBFD865gIhAPVssWKzDd1RIgpA9zTeaaIHw2f%2FKrq%2FxwzofZWMS7l5Kv8DCFkQABoMNjM3NDIzMTgzODA1IgwIK3omvbDMwkkQwscq3ANjNjKvTxwjItp%2BadKxL%2BkU0Ejy19w4WRkRh4LsXc%2BJxoPfYTO4qmg1GFLjLl0N9gxrBIQZxlZTePAtVToffH%2B3PXbhKjyJLiguBeX3GPPGiEyaPKiBUhIOvguDbboOl7dn7I5a9tHx%2FFSMkDlcDC4FEgEhIbJJ%2BzbtR1UqdPnvLqltVIAVUyVCciIgjv0TSefkQRJ8VWT3vjGXCRAsneWUxtVgczkOXp94qOcUvR%2FpJjIBgAou4kJ3%2BgfMzmQMIBzzx4ClG%2FaTW4gmi8uTuVQrlKLNOjtjxf0kJZ4%2BHfYxxXHJ%2F%2FryJl%2BzgPUKv5UfQ9TaGe1BreS4QTknPOxfzPD6Usmr650s8FLBU9t%2FPXESXBpk%2FaGxmSz0dkTAwRSrklpnC4KuH08DhY5x4a50WA0dbQZ18aEgR6NR2RKtuUNPmcBE14CNCZwodQ9nC6zA6buRLMXuuAln3ObcrKjaRwVh1G9BJOO6S5M4M5yI4vpsC3pmFh4z7E0NnmTOaQQLDILvGxh0Xb1xIMvQm6%2FBEInIn6Iz5PGR2SnxCvWlI3zMfHo%2F5jr8ZQtRqBwt3a%2FC62w1T442QMx4XBGrWN5v%2FTn60UZEaKBvJaQZB6xoY93rflA26rFPxAFZAxdvuTCRu8TNBjqkATbQDkxTuYWT6GGVUEA6LZ0ZPRcQM8w6otvA4pjN5xaw4BFLJRdxSd%2BIimgbEFJA3Qvq33YeCb23LgsbRa9aAs64I6uNJpwPRfx3G2aKFPRN17I7e3fmG%2FUWte6N3goAYJfu3u8kcsy13Hf7EsmF1hA1ONv%2BcU3os1lbxE%2BB51mK7FXsr2Z265ldG82T0AwNMPMAKe2b6hMGjoj6isGa9aZN9gep&X-Amz-Signature=e186e3952eacbac0b696f802b41cc566e4c133211a14897b5067b0a5b489fc45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


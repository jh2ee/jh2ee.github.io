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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BP6ZMQB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5%2F7Akod%2FVmo042ryOEMJ9LL8aIhteaTvUmbmarvUbZAIgJXxyCBQ5O8dfJM7txgIFr7flVhUT5Bu8So4Dx5bO3Xcq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDGpNa1R4f%2Fjq9%2B7cqyrcA8vtjnRmAXaJKfc%2B10CDMUrQhRgViVa%2BVl9mOMXMTayJlQt4rbiCxXtZjGdgwh2djmkseXuO3dp0yWFypwVrX1bcvzLIOliDjZ%2BmZ0x0Vk8Cfwx4paIgA9O42218Ez2RZwbh%2Fljbz1ewSQJtSZZtixJqZa6m9608qCC2Wg0jTRQTqjvKf4AwxZTNIJ%2FFPJ%2FUkSKHKfDIhZxD%2Fjm%2FGUTYw8Ljcav1vmik%2BTDDaOje1vos%2FYP7qotd8D48l%2FkHRwuDkhCKJwWLGtJC3jg5JBrRi2Rf%2F5%2FP2%2FUKeUtuVt0rx6pKR68xvqB3iLt3%2BuT7QrD6EBSTjexztoLoYSShrKgnac9pFDhpAPiCa1FrTu8pfQYbZNjsBB45G%2BjbKCXS%2FuCiByN77TeDpBnwBTbvfDoglPm%2BQhMIfNWZWYxLWMH72RbTnQ1ByUJNrmHVNXPbiGd8a1G0WL2WcAcCwcU6gc6MJLmguCL0e6VFeWJi11SdMnDlN6UP4PdpBEo0vuQ4uzmdD0A%2BLXZi5TGYtgZ3gAUbhEgGTIWg0lGmJlqto%2FpOn8a9T%2BaxbI8i5Fr%2FeaTYueLejx9xy3tdUz%2BV0pahw4vtaSG0XXaGyf1REg4cwmiR1RL9605sJcdR%2BUK1X8H3MOWHk80GOqUBKde6MfPDHA7DRa4X4pHMjQb692Yak%2Fm6P5SL3OKGt3jKW02Hh0tICzvgY67KSoI8knBQdEmXqWjXW5h%2FlZDMuZV4N6k3dMk9cC2%2FOwW7goCVe7iSnaOD3ZyBkwWdYmYZfLu9igoFX1R%2BhIkTL5zCKKCkDLkhu481H8VO5NsqxyIZU1HDDjvhy3Rhmg5pOjTu6ibl%2Bf4ckl7gY37CtcL0fP49ystZ&X-Amz-Signature=593564a7410e8c5f6efe76d6fe92a0a5a91c3eefc02b4d7a687de61640c81b99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BP6ZMQB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5%2F7Akod%2FVmo042ryOEMJ9LL8aIhteaTvUmbmarvUbZAIgJXxyCBQ5O8dfJM7txgIFr7flVhUT5Bu8So4Dx5bO3Xcq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDGpNa1R4f%2Fjq9%2B7cqyrcA8vtjnRmAXaJKfc%2B10CDMUrQhRgViVa%2BVl9mOMXMTayJlQt4rbiCxXtZjGdgwh2djmkseXuO3dp0yWFypwVrX1bcvzLIOliDjZ%2BmZ0x0Vk8Cfwx4paIgA9O42218Ez2RZwbh%2Fljbz1ewSQJtSZZtixJqZa6m9608qCC2Wg0jTRQTqjvKf4AwxZTNIJ%2FFPJ%2FUkSKHKfDIhZxD%2Fjm%2FGUTYw8Ljcav1vmik%2BTDDaOje1vos%2FYP7qotd8D48l%2FkHRwuDkhCKJwWLGtJC3jg5JBrRi2Rf%2F5%2FP2%2FUKeUtuVt0rx6pKR68xvqB3iLt3%2BuT7QrD6EBSTjexztoLoYSShrKgnac9pFDhpAPiCa1FrTu8pfQYbZNjsBB45G%2BjbKCXS%2FuCiByN77TeDpBnwBTbvfDoglPm%2BQhMIfNWZWYxLWMH72RbTnQ1ByUJNrmHVNXPbiGd8a1G0WL2WcAcCwcU6gc6MJLmguCL0e6VFeWJi11SdMnDlN6UP4PdpBEo0vuQ4uzmdD0A%2BLXZi5TGYtgZ3gAUbhEgGTIWg0lGmJlqto%2FpOn8a9T%2BaxbI8i5Fr%2FeaTYueLejx9xy3tdUz%2BV0pahw4vtaSG0XXaGyf1REg4cwmiR1RL9605sJcdR%2BUK1X8H3MOWHk80GOqUBKde6MfPDHA7DRa4X4pHMjQb692Yak%2Fm6P5SL3OKGt3jKW02Hh0tICzvgY67KSoI8knBQdEmXqWjXW5h%2FlZDMuZV4N6k3dMk9cC2%2FOwW7goCVe7iSnaOD3ZyBkwWdYmYZfLu9igoFX1R%2BhIkTL5zCKKCkDLkhu481H8VO5NsqxyIZU1HDDjvhy3Rhmg5pOjTu6ibl%2Bf4ckl7gY37CtcL0fP49ystZ&X-Amz-Signature=593564a7410e8c5f6efe76d6fe92a0a5a91c3eefc02b4d7a687de61640c81b99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQS32S56%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5rbKeR1Pc7tmibjn5DMXRXHyQ%2FNoWRGicIKtc2uzj%2FAiBfT4DuSeN7N%2FjuSgwnS2tpgiJLOm0ieK7%2FWqSJvTp2Kir%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIM0LW6k31ZT6nmGKF%2FKtwDY6vS%2B%2Fo3jtvJ4iEw6%2BaJzjX7XN%2FQvx11aF0HLogMKDEvxwBZ5zhnFqQs8zfluS0KaJeB%2FoFsIFoDVyNSkJtIH838IaMO%2FZ9w1xmN92ukw6GQGfORsFOQW0YfuavKmKVyOZqro2LRo%2BOlGxfBirAqJN0ZFNoyno2VEApIIuUvJdWwtmI4TRNS0vlu4dMVB1N6viceeCJNMga5P7aXMMulGAnlTYVHLMoFKlTgatUcB%2FQVt1Y58ZTrLvDeIr7%2B%2BsDM7%2BN91zCCYh9L2yIlR8bxA6Ept3yVIG17TfP8NeLE8yZlT7tQutRxMjx85Sla4KIQOkStSz7VAWHEgi2tWboTBd1WAKmAZobst2ug9yaVqNELkUVTynDdmbgOdBmod0rE9xB3xXiqzBTN0LIoq34z3SDqnyc1mCzk1VMKUEUj3IUY5axW892OEUoS%2FA2jnwzBQ1JQOKL4Iz8Ih9mfBJadSCreTlHra04vo9ITmesVDGq5myvun9PiunFwBg04GYYxji8AvJ7im2e4vko70FJeIw79gHYyziEXiXINZ4cclviBn4ihPhvMVRnWNNNNJzHPLPamK3LrMPS2yUSKaeJISDBNPJ9%2BhIOIrKh%2BucdA%2Bfu1EgLT58mtQdOwiBkwz4iTzQY6pgHurvNjvPhWQM5LuocYAhOvRwktdyuxp8ptl0WFmjOQRk%2BZSzVer94LlNoN9QahXVU8PCZ%2BaxNb0yPkBDNaWJBjzkcHoWNA2eW7nSpU3uM5U8lu1lhrUgkDUwiU8Vm0dXWJT6xYIuitrxYj9TtJdfov1uNNSXzm99VsrLP2%2B5pxhR1KqHVmDIRKKk28efhwMYLq%2BV0hV3VLxTWWTRLefVmSExnFOb%2BL&X-Amz-Signature=c68d0c5a88c5b9ade8510d6b28fbea0988201eef8ec485ac2b02b09ae6d8086e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2DBDRRS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRRZCBy5bQJV7dxajBBeQLGL92tsyNANP6wAFAMAXdtgIhAOuuRtc1fMbtxYq5mzOC80HpmxtcCYc3PUtDiuhSX5UaKv8DCHgQABoMNjM3NDIzMTgzODA1Igzvx7%2FpLg4%2BwFXsxkIq3APxf9l9bU6kkBpYPfbs%2BlyiiIRyRYQajaGFgRSBlEuv2rmwda%2BylgPYYCR5hA53zqeSk9EoT63vDdj89hid1fgntEtc1WIdbpuzsy6YtAX4yNX0RevwDfSuPdZ4269il3gh7FHWTBLBscqr9i%2F4Aa2QgfJltl0LrUeKO6YvwU0bVnenCK2i%2FJAewb7RzNdjRYaHqFZeZOlNOP1czHEJw3SQdUUY3TQeqEWbLjxKQaLHuPyHSpRz%2BjxeU0oIEvi6uDwDURn4KqX%2BLg0vkGw9PkPXEv9%2FuEfBaD9WIeKxqGoVJ1fEpT3FKEYH6pgWWjQJC2pyk5D3BujQjXAPn0JOSMedSUxD7o4gnCc%2BhVjw49wrWj7GCi3mjpQXFkYY6u2GXxbrMkcd8hZbdBC4Zn2L2jpqzbUJK8Rp%2BHgSauK4lZrKX1DmI0SATd9ijTS7xPbcwJSAAr0wxuPj5kk%2Bp8mg%2BVl22E8vFbR6wuHC7wrcJPA3E9V1Dg5vGCt%2BR36I7bqJi3lKeM7dvoKfB4IZCfaHjeCe0H73RHzh26ProiqeJoN0Jf05PrkXtFVRQiXGd8cQGQyNNTaaJWoJiaBZh%2BhjWVDdvKlrRwd%2B2m1YXTQ371e0iVUaqC8YFIjvN6r%2BwjDZiJPNBjqkATWPB65uzTAT7MSPHiWmghFtW3N76I9oIC35uLbCWqZ4eJfcw%2BLznJCbUjcDljSx1wfrZ3UdZDAVeekaNxoggM5dZgOqjWD8J5cgjIEEJ0%2FREr3r%2Fkp4V6tuuhLuwjvUanOuiL3i3qk2JKqENUQA%2FC%2ByjW3ohPb7BqbQUO4%2FRJSpaae4gHcgBW8iw0RbxXCZXByyl1uwAtbBMRcr%2FzWBZVVGHBhB&X-Amz-Signature=1d25324faf1f82bbebe45116e3734f8d6621d7061381cb62abe0378a9d869c91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2DBDRRS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRRZCBy5bQJV7dxajBBeQLGL92tsyNANP6wAFAMAXdtgIhAOuuRtc1fMbtxYq5mzOC80HpmxtcCYc3PUtDiuhSX5UaKv8DCHgQABoMNjM3NDIzMTgzODA1Igzvx7%2FpLg4%2BwFXsxkIq3APxf9l9bU6kkBpYPfbs%2BlyiiIRyRYQajaGFgRSBlEuv2rmwda%2BylgPYYCR5hA53zqeSk9EoT63vDdj89hid1fgntEtc1WIdbpuzsy6YtAX4yNX0RevwDfSuPdZ4269il3gh7FHWTBLBscqr9i%2F4Aa2QgfJltl0LrUeKO6YvwU0bVnenCK2i%2FJAewb7RzNdjRYaHqFZeZOlNOP1czHEJw3SQdUUY3TQeqEWbLjxKQaLHuPyHSpRz%2BjxeU0oIEvi6uDwDURn4KqX%2BLg0vkGw9PkPXEv9%2FuEfBaD9WIeKxqGoVJ1fEpT3FKEYH6pgWWjQJC2pyk5D3BujQjXAPn0JOSMedSUxD7o4gnCc%2BhVjw49wrWj7GCi3mjpQXFkYY6u2GXxbrMkcd8hZbdBC4Zn2L2jpqzbUJK8Rp%2BHgSauK4lZrKX1DmI0SATd9ijTS7xPbcwJSAAr0wxuPj5kk%2Bp8mg%2BVl22E8vFbR6wuHC7wrcJPA3E9V1Dg5vGCt%2BR36I7bqJi3lKeM7dvoKfB4IZCfaHjeCe0H73RHzh26ProiqeJoN0Jf05PrkXtFVRQiXGd8cQGQyNNTaaJWoJiaBZh%2BhjWVDdvKlrRwd%2B2m1YXTQ371e0iVUaqC8YFIjvN6r%2BwjDZiJPNBjqkATWPB65uzTAT7MSPHiWmghFtW3N76I9oIC35uLbCWqZ4eJfcw%2BLznJCbUjcDljSx1wfrZ3UdZDAVeekaNxoggM5dZgOqjWD8J5cgjIEEJ0%2FREr3r%2Fkp4V6tuuhLuwjvUanOuiL3i3qk2JKqENUQA%2FC%2ByjW3ohPb7BqbQUO4%2FRJSpaae4gHcgBW8iw0RbxXCZXByyl1uwAtbBMRcr%2FzWBZVVGHBhB&X-Amz-Signature=e866f8006e569fa9c1dd4238ad138bd29d94b86dffc465ce956af9312bfe2250&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEMPOGHX%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCmyORICNpQohmTmeNB3eUDmERSiwSc42jHwhCUhnwS3AIgRMyq1hJrFRb9d8TpVgE8%2BYNMuZFfz2fxMke7wc3OGtUq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDF%2F3ixJTmevPDZlq%2FSrcA4CnauI8zq9mhOj27xuYrrNISHgPR%2FZVUFeRfgghAgJk%2FhyobYZ%2FaqTvEsUy84ebwnRRNNE7m9bXV0bU9yJrUxMcWrQ9hpWG376EWVW4D4cCYNvgff2RNzLSF86cz%2FyOh21XuHaWqZ1vEqfiz%2BlIMbj8501ega%2FH%2FXs1hBHBeJJ10EMgiMKy8tthjfZ9SPzs60V9zI%2BM4fZnqs1eelwwbM5dEeWP0GhWGD1RL4CVtnEgHQqOIWz0Ddqygvn3Asg9EGS2MHuyWTtuugLlLpNt3RJZM1v3NaPAd0%2BWyp79SsJ1ADStqKWKt3E9IzgulVwOZ42nXzhsUVtLArtAxodsE%2FmbsrNrO01DhRRQj5boDs7cqxmz8CHbb5lBwmZWCNnHcUy0nU3yUU3jldFCNRQCvftIdG%2FsRtrpovYq9qQ1twR7KQZW6r5gfS5KWWRIxD1qGqiCfby%2FIAA6d0ssZ4FRnp4dfjD0vEGaMNKpcQfP9dlzIAoYY6aFegaOyUCFO5Yt4gSrCH3%2BLjcIXBuFtTPlo81UnIlO6BD4d28uG5QyUsb1t213URJf72Qp3P4ztVKtzmsMvpxLDWpKOtGxQV6Q0KzBtGhmHygKEQJFcV6PMGEjmi%2Ff6Qat1MT%2BJDZJMKmIk80GOqUB%2BZC2SN3cuMsl75I7uQpmUpPjVDEft%2Flb1I1eK7hIR2Dp4NwOqkBT%2BaJdWArhYH%2FPbtKi3vI0b%2F4pucEa8sq3ahDGUimzlhhx1EXp7K6Y09kWwFg4dpJ181c4z5edwQA9PM7kFJPIisJKU9lIH6H1RyrQU9w4dV%2BafFaYq3OVt5H74tYnGk2f%2BIZIh8L5rFXwK8ROYYRcQWd%2FRNsLdvp7vmfOMS%2Fn&X-Amz-Signature=7ca9ec4a12f122edb840b453dc4d2372dcff25e0cad846dc1f21048602f49e9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RKSMMNI%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDdjmYjwCy1JAYro4AvhkJu%2F1YBybwMQMBUpMqNMfX7WAiEA0ihfr%2BJ1FYNJm3CkJuIqIz5cnUI%2FCA52NifwbTt9ZU4q%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDBtNzFiMfl85U6nZKCrcA5%2B53l%2FKUba68nYuMvNtdNW4nYANCmWDF2OFRZwJKtiVEXDwZc9U9uTESA8I3csnnfRyBhrvOLiDOzcx4tN8H06XXMXMaH1Nr%2Bc6VZlDLtk7geBiHlZwdT0pqVLh7sqNsv8mFjOgjkYuBEP%2BJIpa32Pfozb5W061tnai7XZaruXcxpEt4%2Fkpl9NB2hPWLeUVbC7R%2F8ifa8DioyAiQ4%2BBRwNc4YXdpHf9x4L%2Bb8mLfjQhTHKWbql18k2etW0FGiTMR%2F8SzS3mbdYERpBtiivAOmx1qu3X%2FOgavnosortm7Zb42Z0YpEWlSSn3Eh9OYlKNRT%2B7jRBYr3jztqs4lpNS5rYjs3B0DWoa3bMbwhfD5YTNIChdsaFVGRkSS4e3EcMnaKme9lojRhnQOuxiZmM%2BG3E%2BTeqyc3uhQnF2dMblQBYpH7GFlNo3lNtTXlQ5pS2oeTRVjnCsBseKG%2B6rWtcR%2Fx7o%2BAfJcKJuCwRL99YMb0hzyTDhlEDDmG4ONDY8TMNrea%2BwWL%2FvOkouBntaDIBFtg2dc7n%2Fpw1ZYjLK3Sd%2FQdwRU7rcqQQBjj1ltA4slWZU0hf2JY7Xc%2B%2FPJAC14CCFF94p1ymM2VTSjG8aDgH2obJL1GxGTVY3Xleoj%2Bb9MM6Ik80GOqUBd%2FyeRoY7QzVZKcBmjoKhwExMUIfS%2Fc9R7ankscFMp4Om3WUF0blVJzXDLvR%2Fko99NvZiCov2HTwrO3d9tOv06ZCb2defhng7y5WmoYc25sXB%2BmHThaVbXGo7Vb%2FavUaIIMDia2rZCHHOjhHecqOBz9jkKBmY5%2F31HcsL4GJbpo4AUVvqOBYQC2c%2Fj%2BGqa8gZAQBXXV1H%2FFL8Zu8I6pq9zkvGteyG&X-Amz-Signature=4bc3bb56af8a487ffaae9742db669bfbf91ad86d551aa1233711066abee5ab09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUGYSR4Z%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDP5YeFmqG%2FwLhi4C0FVrkHZtCtY34YK%2FEPDHlCIq06hAiBlv1kf5UqUZK9va8bieU72gF9nerAyG%2ByYtAcVpWkapSr%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMyGdxiP8yZAR5zZ81KtwDTtRVWwGKcYqu5g%2B1HG9eE2kWkDXJDeM1Aytic229ZvLhEuvo2xzWoUeGKHUh3NxCgAoNUEHhQlEenjZCMCcVXCMo5FLK0oBZpgwE1jAJ33A23PhOgcurXnXcVMXp39%2Bx9ofg1EXDX8TV9z074z5MicG0FdY8lDNTwexo6lPw8gG2z51S5BGiHH4NAfjcae%2FUWU4CLecTxCxRC6pts8IVwSUBfXZeUV7VZ2RCmCUZXON%2BqqFfGZwWOWe1xX4wnp1JgrveEQxQ1mvhMxKGdUK2Xp%2FmspAqRKkjA84lZsMH3GK04la9QUO%2FpjdldnhvW%2FeshA5UXUjQY%2Bbi49q5pLpC54zluqCZzug%2BLdRi4x%2B7Bsm7aU7r2jYTjL%2FMuArH4%2Faosdsl7oqC5ef267v4M%2BwUu2PclQZxzzJfrrT%2BPvTHo2Jem9ayvTZWsSaZN2BdjGHuBq2Hf%2By2MMOBh1FyBheJQYUgWcuGFeETAhJTIZ3FX%2BY5nv2BFsMbSa1UfMn6k%2FwsrLH8tPPgy4G20cI%2BAW4rYmfJRqcb2LojveJABEljwoeA%2BHkitjLpdiyRmMfOXnE6M77oZ8ObAvdhxw1FMp5vD%2BfyhR1HbLZQTZK0MFtQrhpkMe0BKganbBe3V00wzoiTzQY6pgGjQdXeNulDOktXSqpEG2Uz%2F6jxOajwIRCuwhiGObzhEG21lzPmXd1MLf%2FD1p6ZTxEmg6I2gf6%2B%2B6z19MLUGQmsXc40LkswJKjHzuOJbe3xpYcr4etgPw5fsbUOlwN3Yh60KtoKdfWKvTMZ6SNV0fFOhMxDDqfDIIsn4xojmUf29CIStLOpFRvaggRHLQyrKQK38n21Wj8wRR009%2BhAl7Xj70cAJ7CO&X-Amz-Signature=d30ee5e0c019aa5a3828e25bb8ce9dfe177edf25063de68a05748705161605db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDKQTIWE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhJO1ov0BHV4P65vXGztelMdj8Yvb37lMW0i0%2Ftpd6ZgIhAJpTuRuAa8ZAtLhXEYCqpQKjaSaW0d%2B2GSYuq18z1QxEKv8DCHgQABoMNjM3NDIzMTgzODA1IgyoG5%2BltNE%2FkJsoV%2FAq3ANR8cVWuoXQY%2BguOSS8tieigEsEXLtzBaEDyiFxPrcg2LmlQdC7PpxvTmd%2FNZDF2lWdhZuz%2BEhSM5sEdf0kkeKAsdLYQ5iLQ9%2FGKZG4lAlnhip1KbTGPefmj74PHzcGE2x3XoGAKYmjitolrBTKvrWWT7v%2BKA2DId%2BbG74thfZMtf6vWEDXwFvMzUTjfy04fd6A2vWSuvxGSIDmbznYLjKW1nXyE%2F5OYRRVMG8gtJg894wy7WkhzRbu27ObDfAZOPFiHCoaLvdswUS1breoX9DR73ZvNy%2F3S7Q%2BJGGB%2F1lJKFOHprLU1ufQ5TvVVgVwQT8Ddo8co4ivzdxHuhSrR93gl3cr9vJGvUIexxbsSpguAGPAXRKJ%2BVqt%2FUa6bL5ATFefwvGqas6KocgagoI8ClHffZMplcafyY6OGXoKL2zHvgw%2BggDVsOT6Telw1OMpfQGKW3jl%2BXaHejuxGqQffoRQXpvh9ToPsoMJ2qs6Q8hFgecLoXpkrMR9zuYj5h4fbug1cKL7E31RkeS30EFfk2D8%2BVxVobq8AmJaE7%2BZ9apUKCqSmgKpcQqNGv07Rj%2FdPc6VAiTwUgoM%2F%2BIf2cw7OPu55aBeByUG7kChVv9P623FaEPrKXIlJ%2FRAQmLqizDEiJPNBjqkAXXzuy%2BW1jZcSDNXUzEPgiaMx6mwNPPZAU62cGiNh%2BokM%2BB16UHz0tWvIBcfQa%2BGrWOK%2BrdyExXgG0%2FtI5sPtrv%2F8nSZJ1XkadtgBb1ciODdyjh5orzEM6Z13Ey04FEdnAMZnqPMB98XQtmkb4wcS4fOPsr64LHNpckp1V134R6cobrpX2LNUwDeJO%2Fk9HQQ4wJD17i7k6pOPCDphkaRWgnSTlR%2F&X-Amz-Signature=310b24b92511688cafb4c129ccbe63179c91e91822333f725ee876a596a8855a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDKQTIWE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhJO1ov0BHV4P65vXGztelMdj8Yvb37lMW0i0%2Ftpd6ZgIhAJpTuRuAa8ZAtLhXEYCqpQKjaSaW0d%2B2GSYuq18z1QxEKv8DCHgQABoMNjM3NDIzMTgzODA1IgyoG5%2BltNE%2FkJsoV%2FAq3ANR8cVWuoXQY%2BguOSS8tieigEsEXLtzBaEDyiFxPrcg2LmlQdC7PpxvTmd%2FNZDF2lWdhZuz%2BEhSM5sEdf0kkeKAsdLYQ5iLQ9%2FGKZG4lAlnhip1KbTGPefmj74PHzcGE2x3XoGAKYmjitolrBTKvrWWT7v%2BKA2DId%2BbG74thfZMtf6vWEDXwFvMzUTjfy04fd6A2vWSuvxGSIDmbznYLjKW1nXyE%2F5OYRRVMG8gtJg894wy7WkhzRbu27ObDfAZOPFiHCoaLvdswUS1breoX9DR73ZvNy%2F3S7Q%2BJGGB%2F1lJKFOHprLU1ufQ5TvVVgVwQT8Ddo8co4ivzdxHuhSrR93gl3cr9vJGvUIexxbsSpguAGPAXRKJ%2BVqt%2FUa6bL5ATFefwvGqas6KocgagoI8ClHffZMplcafyY6OGXoKL2zHvgw%2BggDVsOT6Telw1OMpfQGKW3jl%2BXaHejuxGqQffoRQXpvh9ToPsoMJ2qs6Q8hFgecLoXpkrMR9zuYj5h4fbug1cKL7E31RkeS30EFfk2D8%2BVxVobq8AmJaE7%2BZ9apUKCqSmgKpcQqNGv07Rj%2FdPc6VAiTwUgoM%2F%2BIf2cw7OPu55aBeByUG7kChVv9P623FaEPrKXIlJ%2FRAQmLqizDEiJPNBjqkAXXzuy%2BW1jZcSDNXUzEPgiaMx6mwNPPZAU62cGiNh%2BokM%2BB16UHz0tWvIBcfQa%2BGrWOK%2BrdyExXgG0%2FtI5sPtrv%2F8nSZJ1XkadtgBb1ciODdyjh5orzEM6Z13Ey04FEdnAMZnqPMB98XQtmkb4wcS4fOPsr64LHNpckp1V134R6cobrpX2LNUwDeJO%2Fk9HQQ4wJD17i7k6pOPCDphkaRWgnSTlR%2F&X-Amz-Signature=098505fd329299f39fafc3aadb1ae43cef222653d520adaf21aac2cd68c9f0b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GGSBXQC%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFv5FK5mAghSBsx4ck7JOmzmp8oy9d8owQyWHIWynUn0AiEAs1y%2Bsth%2FbLENDi4vNhniBwqTF6IlRXJ5re0VAM4Ms54q%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDO3qdEd%2BgCz6aWxdCCrcA5g5fzFVAifZ3dw8Fj4pgGd6pmkHG4eG5jYUL2FTvOcdD2qVX9MvQRpEvB2RaR61fW85SjKJkYIDtdxaPCrnzAmU3SgAoT9fajavIE4zD6Hl9%2FmbfYv7ZlBcSX8U0nmwIbkTpFLCfVxKKhpuj%2BvQkLg%2FAqN9NFfHYSl1RAYEQBc1zBTGtmLTCQDpdm6%2BomY6BdB2447KVBE6KZQN38oTVaIEKz3Aj5AR%2BVuBY2BvxTj9l59tVHTifb9aJSaN9UGYOJQHbpll5DIysevdevvt%2FnW3p6xBzkHCwbw1GiiNGpkZt2pnOa6SZ%2FvqvMLkAzfo3Wkth9f0E%2BCYnG63SGTefbex4ABHDJkEQzluEQ7Xi9%2FXjOhXaRXPUtqqyYHdtfKO6PEsxbVFCL7MoRtFVbkoWNT38xhwr7PwyjUwcWqrU5PQjLupfA0RLFBlDViTJUTzxI64ZPpea%2FEGtxf0KBK0sX7yyzh9EQz8pbgqGRA77hMYW1MiqR2kWd6ARgjYUQIjbHYMGsVGvY3%2FVs2P57Nr9rY9oRys3GJB3o%2B6aqzz2awpZzs5FkiLa%2B0AJNA62FPBV%2Fzck2W9%2FLEhbc97wwOc71gKoPWGXfjW%2Frhbc4bZLNdYo%2BYF3Z5%2B39kEyFqwMNKIk80GOqUBG5mziM5IqEZ8WK2zl9hPPUNZ%2Fg0%2FmhJy24olJU3gHLMRcJz9QG3mHFvR1JbKPeELqIrY8GzVIg59oKPRxG%2B%2FYBFh7TuqWJ6HIhVVd3OqKGCVSPQcUBpYcCBIDuRXylZP8yke2mv1ZBeSAAmvwDPoIBVGb9oRDHj8E%2FgYEgw%2FkebMqQoNcwrU4bCzcpTuZbRxUR8nQoflijT8Eh4lID6E8Y7Gc4YB&X-Amz-Signature=880d5aa725ab74fe48a8bed50574c572fa9b1a9cbdde3bcca543cdbb22de9781&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJU5CU47%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCtAttknMdqbI3Lbj6JvK6upyEaNb1M2QvIvbLqWLRcrAIgerLoTHdK%2FrfWPBQWyiM4DZ5OzkD2%2FoDt4nY%2F6kXEXUMq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDOQiWidBHwC5slixEircA5cMhy5SfyAhx5%2Bu09T6zs8EfN1EeD5rauXFOMZaRSS0LTTHJm9ISCnWOliJAidyQgm1%2F2XCskNQJJuuF4QxV%2B5iMNgBbWM4z3UszmASF%2B5%2FGP5zMq2gdkRxy5jhjKrYyzgKT63fT9xRqzvTo5u0plomVCy%2BS00Z8B16zfkFo8gvkpli%2FafgoDjHkr0bgK2xJYPfmAHuvSfseDa8Et0OVFIesm6uypqMX3RGrJ64IJp7uTxcoFW3B0QRpsUxPJcCo5fwZ3UR7Cg%2FQJ0GlPD%2BHj4qv5X3MdLmqxtftxV7r5kkg%2FpEzgNaUv8k5uUUg19VK8X973f%2FeIDr3hdegU7LBg2yEcQ2TPEHjSw9UujKSH1k%2F2kVw1k6w9%2FnGbC5rSg3jZv19dgdAJM2j0zxabcwc0B2xzRuCIvY7zPe974mTIquaDkG6R7L0%2BLlecse7AnWA%2F239al0hX8vnn0iRFmbJH550fba%2FG1HOThujFAXAPHFkuzyjkWHr3moyUeoXl2XphKHhlPWJNkxaDzbHPMdaKS2vBdmkAFs91CrTLmnqnB6JbUr38%2FDerREpHK2jJPAvBTPF9SUgU3NXlIbf9FeEvDGAGu%2FP%2FjGiTJv2I9XWRfQ3YfZxsY%2FcJQ2FtjaMPmIk80GOqUBnKltp%2Bi%2B7p8RpJhSMWKo0QK5cv%2BbtTdTrcrilICjRmna%2BiPq8MhOYR94OIjjPZ5e8OhIrfXnhJwkMJ%2F6KEgbs8%2F4DbjihM6tt6x%2FovUs9XRJ3TG1U6GeaJTD%2FrQQ9ly7Hc0SyWHy30mzb6f7uMwQoOecaLeU%2Bhq7%2BbkCPSlKoKNzqMrabITCXso3IVq9UyKboRBaHxzsd16mSj7pjD8LK5A6eXLg&X-Amz-Signature=d5e51c0a62a4985c5fca8950da750e67d028b01f3ce2c3ac4c1dc1ef1095610b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJU5CU47%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCtAttknMdqbI3Lbj6JvK6upyEaNb1M2QvIvbLqWLRcrAIgerLoTHdK%2FrfWPBQWyiM4DZ5OzkD2%2FoDt4nY%2F6kXEXUMq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDOQiWidBHwC5slixEircA5cMhy5SfyAhx5%2Bu09T6zs8EfN1EeD5rauXFOMZaRSS0LTTHJm9ISCnWOliJAidyQgm1%2F2XCskNQJJuuF4QxV%2B5iMNgBbWM4z3UszmASF%2B5%2FGP5zMq2gdkRxy5jhjKrYyzgKT63fT9xRqzvTo5u0plomVCy%2BS00Z8B16zfkFo8gvkpli%2FafgoDjHkr0bgK2xJYPfmAHuvSfseDa8Et0OVFIesm6uypqMX3RGrJ64IJp7uTxcoFW3B0QRpsUxPJcCo5fwZ3UR7Cg%2FQJ0GlPD%2BHj4qv5X3MdLmqxtftxV7r5kkg%2FpEzgNaUv8k5uUUg19VK8X973f%2FeIDr3hdegU7LBg2yEcQ2TPEHjSw9UujKSH1k%2F2kVw1k6w9%2FnGbC5rSg3jZv19dgdAJM2j0zxabcwc0B2xzRuCIvY7zPe974mTIquaDkG6R7L0%2BLlecse7AnWA%2F239al0hX8vnn0iRFmbJH550fba%2FG1HOThujFAXAPHFkuzyjkWHr3moyUeoXl2XphKHhlPWJNkxaDzbHPMdaKS2vBdmkAFs91CrTLmnqnB6JbUr38%2FDerREpHK2jJPAvBTPF9SUgU3NXlIbf9FeEvDGAGu%2FP%2FjGiTJv2I9XWRfQ3YfZxsY%2FcJQ2FtjaMPmIk80GOqUBnKltp%2Bi%2B7p8RpJhSMWKo0QK5cv%2BbtTdTrcrilICjRmna%2BiPq8MhOYR94OIjjPZ5e8OhIrfXnhJwkMJ%2F6KEgbs8%2F4DbjihM6tt6x%2FovUs9XRJ3TG1U6GeaJTD%2FrQQ9ly7Hc0SyWHy30mzb6f7uMwQoOecaLeU%2Bhq7%2BbkCPSlKoKNzqMrabITCXso3IVq9UyKboRBaHxzsd16mSj7pjD8LK5A6eXLg&X-Amz-Signature=d5e51c0a62a4985c5fca8950da750e67d028b01f3ce2c3ac4c1dc1ef1095610b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSQUJVT7%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T231143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCHy4wr%2FAwfewPpDznMkwCm4MM3T6uQRmuLYhfI7KPENgCIQCquveRhkxuMZt2LG02C4Yck2HPfhAGOHa09Y%2BeL2mFIir%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMX2D%2ByR%2BJiBfHa%2BhUKtwDMAaZoW%2BEORGrlaokLERpOGqujab3BLgVMtzeOHOxqsHMZuCd5KyGjDzEkm0qIGxtdSF%2B%2BMaVPlVzBjGSfrABmc0x4SJa0KMlr6JlFY0FeNq9G12Exp0zDciKs91%2BS4kQ3vdVZvkKfbB7VCbpES6A0KAQkiw0ng5W5pcgz%2B1iJ%2FvmDtzsIsokyubB0sLQy%2FAUJT%2Fp5KK7c63nqj1Xa0Av%2Fv0ocfssJRb6Kyn19Io%2BthDuYfBVA2DYqthJ2eMd5SGfiWgjJym77FA2Ns5rNGv%2BmFc8MWd0%2FMdDlA1p4CEN7L1ygkCCioIE00GnIbheTLTT60lNIsPNKZ4rqwFvfnSHOikewWThIrfi0m2n8SZ7qtTBrCvnxaizrDCfaIdIhitJ3rFcgkZZwBq88zHl5eyUZfLyWZ0G6fyYy8BxcT9aEID5a9Vu7VfIdT5wC3pAKWgMlE4qvwES5JZFoYqlDAJl7UKbD4gTCn%2FoVoDR1HBQemNemnp%2FB6HNJIG6AioEOmquPzjzJ7yhdLTW5VzaiCFGFuHFz2rwHptGXHvOKxvMlAApZhUG7qYDxaUtUgBCY5zt6zgRoLfaUbEnSSju4kj3fS1%2FSZNhKnXbxtxmqwYCloqmcghbB4II063DR7gwuIiTzQY6pgE%2FVYO2h5EtJVpM6Ry0%2FRKYWBD1%2B4a4CFQH4lh%2FXWbjA0rHeVProzL09swuYmL3CKvL6vgKXddYA2t3ERnrDnMCiSsEPZNZzSYh%2BNX0t7mWDEhjCrNITKvkTyTxzZ52Ty8qvYyzQONQiJlts1%2FN6HFoioWbSNGKxfH0gJgS5zWCCYugUZiYH%2BUcj5FUIKSjxCFXWMR0wlmFEVAtrG9KLYZ%2BdMF4rdij&X-Amz-Signature=803836aae55792e20cea73458562cc89531f985630314b9eab753998dcf05093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


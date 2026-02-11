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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DEUMOOZ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDt5T6iVV1I12wKf4QR5cUy1CZ9%2Fcu%2FWxhXtKdMONMOeQIhANYeBX4d6f%2F8LwRh%2FnXPZyvugBmfR6c7kPO6ZPMBJDCcKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz46SGABP449yz2UKUq3ANXx9H1dU6KLfRIko1a2mLvRfaZ2KKa5ZFP2qBCOzybxIKl%2FAjYrCV4ANvLKSwYzkYAghAyrYhzzWTg3FPJOJxcXv1WwRz6C%2F1rIwp5oy9D3hLTYp9bdu2rx1IZL0cLDRXnGiv988NcFnDI6h8%2F%2Fgv5as68XyUPOuddAiWtLfAfgq8NgKObszZINQoWiGh9AD4%2BQI6RwPyyv08Be3yMl9dXhUl2wzNBRD0%2BdX8JHrVzPuuAVsDc%2B5FRI3TmYJMV40woJDeydu1qOfhOSmnQCK4v%2FxyuHgHQohcxABDWke6lEoBsdbFu3OnHrlVuypxkmt6oL919gF3Hpogscsiy%2FNgEQtndTWG4bsopBk90nM9P44SybyIghmTCOSwsMaa9wLURbWuO4vUGceIZEBMkn0tssJbLTXFLV4B2nMrNlPUON9Mp8e3GKst7BO%2Bhdsntl12cdPaFxtHf8uEmLW%2B30xRn%2FKRdI%2FSl3aHhOvS7pThfU7j4Bidp0EW%2FJUG0hKCD45a%2BIXw0Z7LgUqB7dtvYZKOPm%2FQZIG88pExOJdFIXrrfYyukdRs%2FQ5kD7%2Fi5OAFCetIg6r3H%2F5o3fneZ1eywnMMoqxIwaDxI%2Fwo5jvnnf2%2BrFKZkKo01AsqnRnlg4jDXxLLMBjqkAZynj9d9J5D4uViuLOHYoWIWCIangEb1nbP5EhMY%2FAUo3XNWO5%2FcvC5Z9BXWNDO%2BEwWkpMXndgWKQxSFfV78Dq%2Fr4j2QCUF8lyOi%2BC%2FwJoZ5%2FLJLII9eOH4YPLot7Cxzb6E2b22XC6qn83hX14tC0TelMgzk%2FI5%2BXOa3XyIEaDnpadXTqNV9skIJ4epqRQDtKAiHAn3qQdAcypzzW1BsC89QGwpD&X-Amz-Signature=329bb845fbe0bed72dec1f01b159b85ad60078071c21f27130776a8479fac711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DEUMOOZ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDt5T6iVV1I12wKf4QR5cUy1CZ9%2Fcu%2FWxhXtKdMONMOeQIhANYeBX4d6f%2F8LwRh%2FnXPZyvugBmfR6c7kPO6ZPMBJDCcKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz46SGABP449yz2UKUq3ANXx9H1dU6KLfRIko1a2mLvRfaZ2KKa5ZFP2qBCOzybxIKl%2FAjYrCV4ANvLKSwYzkYAghAyrYhzzWTg3FPJOJxcXv1WwRz6C%2F1rIwp5oy9D3hLTYp9bdu2rx1IZL0cLDRXnGiv988NcFnDI6h8%2F%2Fgv5as68XyUPOuddAiWtLfAfgq8NgKObszZINQoWiGh9AD4%2BQI6RwPyyv08Be3yMl9dXhUl2wzNBRD0%2BdX8JHrVzPuuAVsDc%2B5FRI3TmYJMV40woJDeydu1qOfhOSmnQCK4v%2FxyuHgHQohcxABDWke6lEoBsdbFu3OnHrlVuypxkmt6oL919gF3Hpogscsiy%2FNgEQtndTWG4bsopBk90nM9P44SybyIghmTCOSwsMaa9wLURbWuO4vUGceIZEBMkn0tssJbLTXFLV4B2nMrNlPUON9Mp8e3GKst7BO%2Bhdsntl12cdPaFxtHf8uEmLW%2B30xRn%2FKRdI%2FSl3aHhOvS7pThfU7j4Bidp0EW%2FJUG0hKCD45a%2BIXw0Z7LgUqB7dtvYZKOPm%2FQZIG88pExOJdFIXrrfYyukdRs%2FQ5kD7%2Fi5OAFCetIg6r3H%2F5o3fneZ1eywnMMoqxIwaDxI%2Fwo5jvnnf2%2BrFKZkKo01AsqnRnlg4jDXxLLMBjqkAZynj9d9J5D4uViuLOHYoWIWCIangEb1nbP5EhMY%2FAUo3XNWO5%2FcvC5Z9BXWNDO%2BEwWkpMXndgWKQxSFfV78Dq%2Fr4j2QCUF8lyOi%2BC%2FwJoZ5%2FLJLII9eOH4YPLot7Cxzb6E2b22XC6qn83hX14tC0TelMgzk%2FI5%2BXOa3XyIEaDnpadXTqNV9skIJ4epqRQDtKAiHAn3qQdAcypzzW1BsC89QGwpD&X-Amz-Signature=329bb845fbe0bed72dec1f01b159b85ad60078071c21f27130776a8479fac711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4JA7OWP%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHffBhRgqpoRw85fRZMLWBdqlIsWMG21UNn83OeQvlGcAiA5CC3UAW%2B1b7Qek9n%2BUSiVsx1YTKfbkMjkltIuF7FGZCqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtRJZX2itOpqYSh1dKtwD4Rlpuow7QEVoTuGWzrHijRcmK6HNJFLcJw5l9JKoVeRuwBjcqfmtgO9bu013%2FuyHOcPTmfsJmzhK6g%2FchNb9ug%2Fy5e05YOgizYgxB2KKYgYFPbEpvzQWbNHxz43tTDT0RQsFXqNFIG60NZnO1pV1eaaa71T6kZzDxxf6kb1uEgQxOYNw%2FShZRpMd9x2CDtK0ebdbGnwn3nBl8q2KA2GeEHo8XbHM9LiwQ9%2FSm91nnrC0yg1HzDaX3%2BZBMD2C9b9N7FVF8wbjX0nR4FH0xRDwx1dVXylB0joCz3QRpIKOoIDKeyUbj9pMKCj68SBkpo4souLavNGdgHz2lMIuHTQpzgZZPywYNwjMEDnu9JYLpYafF2%2F3OJIf9qn8mQi3pFxlSQ2iLe7kkdpfxNoGXMY8bquxbHH99E%2BNW1dT12caznd3qM2pVsMBcwZyEBmm94cTSjZcgT%2FFOkxAcvok%2FoyG1gfsFmPyakmXfXc0PzX4Sb9Wdi46i2Yu0VpD4R8Ef7OWAsQ8%2ByIPmDTb2ou6QtyonpPxRLA4L4ud9ZZVRsQJ2BqwtEDhLrYf9%2B41qvOg9hwPOk%2Bp2auddiqvh2oV1Q6Az7mBX4Hh0LBJ4Dk1ZhVGZr9y1UYEPRJKiPMk%2F8owxsOyzAY6pgFiMVsEwqggB%2B1MeJItV%2BGr8N8FFOAoNyVJWI0CMurwPbozVQPGc%2BPZW6bavFwEwmo4FDhcIKIjl%2FnRuGxZptiR6LilTq6aUUNjG%2BI6GB3koezmWWzB7I0nB20A88gHWTkcQFU80%2FJOvuNahlZT2LEpwj%2FPYadlQHLV%2B2PUN5z97NtftTbfpDJpSnWn1EzNi35K7YlzhJiPqtPFyikLNyWifUIhLi%2BX&X-Amz-Signature=cd30a5c6f5fdc974a694ea6dc262e29ff52545285672aeb9fdfe4568d63b9125&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKISXQ3L%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFwrPdZ6krSJt9%2F1jpQIsExYcgNb9U8Yvh%2FwIzQYja3yAiBG6uc1CobTUK9tyQy%2FVQNF977Twf4SPUJZmP6wi3zn%2BCqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjwz6ruCaRmhHVTUjKtwDMJMtcxfIhZElQNZvh5uTqwXh3MUDWCHIHsTMBc7U73Me5Fy7PIVbcNlAACmVdEHW%2BieB17yqmH1u6anWLwt5Y8QZOkRNJMq42N2XPRU1iTLFdTtqYOAB1GsmYlGRBfB0jhkD9UnG4zNh1d1C0x8DzXHh8TpWjPil25AlTDF0aYw4zoZ%2BtXi%2BnvjMy%2Bt1EYXtLWgYvbCnVLqs0ITXnNwkhLG2JWmDc0jC9ME5ew2%2FjW7YE3hNvkfIPery5d0647lO5LEOH6wH42UUkaDbD5veM7cqZYktjvZQEeaQ1GqTfpE0nfN6FUsPKNpuNXCBHIx4lYvMIeSKt12o8weYKMI%2FkdGo4TYwqaHxCnbhMrIYKpsuYWPIEZnOAFCzd29f2V2H%2FJVYIHCvy5iQPJn1ODTfJAj94vZBE1ieKt26wT7GMFmpVc73YXQZtrVMzcu5dn%2BIvdlWW9x%2FUcB0FgGwqOBeUFc1%2BV1G0nlZObB7nsjUt3bp9UeIxPEJhCuTGU0q3gewY5DX8cge4rqNTnv6%2FZxAWs6O%2BFmhr%2B0pT%2FR%2B0Hb61HQAoPyE%2BM%2B9Wv7YeIEqhUm9pXVu9elzlLkB8oYyR6mM5%2BoAZZfP79gttwNAkS6%2FRJ8yACYBZiGdXlUjV%2FMwx8OyzAY6pgG0eVDQYuARuzN3cTMtqhijPq8iW%2BuvWq4hCnv6psNnnXFj%2FgdFazFICcG5hxYPd9ETqSdOmSKss3h1XDTwpIvhfqPhInYeFEgO3t40wdaUGGxKmTlU9fi7%2BpnQ2Byo7U%2FLQZQ9Yw1kzZW%2BCnef1%2FAOXcZmDSoMwK7ziB3ySxTppharmIRgSjEtdfEiosc1sX4Dk96R%2BI6WiT5N1uIJywQVy3ReSRV0&X-Amz-Signature=15a9c9ae8f4119de651aefff77335709c8dfd73c3fcd5cfb084ab91a06b37c64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKISXQ3L%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFwrPdZ6krSJt9%2F1jpQIsExYcgNb9U8Yvh%2FwIzQYja3yAiBG6uc1CobTUK9tyQy%2FVQNF977Twf4SPUJZmP6wi3zn%2BCqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjwz6ruCaRmhHVTUjKtwDMJMtcxfIhZElQNZvh5uTqwXh3MUDWCHIHsTMBc7U73Me5Fy7PIVbcNlAACmVdEHW%2BieB17yqmH1u6anWLwt5Y8QZOkRNJMq42N2XPRU1iTLFdTtqYOAB1GsmYlGRBfB0jhkD9UnG4zNh1d1C0x8DzXHh8TpWjPil25AlTDF0aYw4zoZ%2BtXi%2BnvjMy%2Bt1EYXtLWgYvbCnVLqs0ITXnNwkhLG2JWmDc0jC9ME5ew2%2FjW7YE3hNvkfIPery5d0647lO5LEOH6wH42UUkaDbD5veM7cqZYktjvZQEeaQ1GqTfpE0nfN6FUsPKNpuNXCBHIx4lYvMIeSKt12o8weYKMI%2FkdGo4TYwqaHxCnbhMrIYKpsuYWPIEZnOAFCzd29f2V2H%2FJVYIHCvy5iQPJn1ODTfJAj94vZBE1ieKt26wT7GMFmpVc73YXQZtrVMzcu5dn%2BIvdlWW9x%2FUcB0FgGwqOBeUFc1%2BV1G0nlZObB7nsjUt3bp9UeIxPEJhCuTGU0q3gewY5DX8cge4rqNTnv6%2FZxAWs6O%2BFmhr%2B0pT%2FR%2B0Hb61HQAoPyE%2BM%2B9Wv7YeIEqhUm9pXVu9elzlLkB8oYyR6mM5%2BoAZZfP79gttwNAkS6%2FRJ8yACYBZiGdXlUjV%2FMwx8OyzAY6pgG0eVDQYuARuzN3cTMtqhijPq8iW%2BuvWq4hCnv6psNnnXFj%2FgdFazFICcG5hxYPd9ETqSdOmSKss3h1XDTwpIvhfqPhInYeFEgO3t40wdaUGGxKmTlU9fi7%2BpnQ2Byo7U%2FLQZQ9Yw1kzZW%2BCnef1%2FAOXcZmDSoMwK7ziB3ySxTppharmIRgSjEtdfEiosc1sX4Dk96R%2BI6WiT5N1uIJywQVy3ReSRV0&X-Amz-Signature=17ba1668fa7025c17160a3446e28806ae906e88a2836a2dc518627a5fd15004c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FAY56ZZ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3wvmForqV41IRz4M6tqX%2B9%2BWM39R2YK%2FgtdYUnkrGuAIgKtNsXmUB%2BqdZdMNSege%2BbKids5eARvFIMx3QXue3EfQqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJPPbK%2FunBqfgwmX6CrcA2A2PaYnHc2XdmIav0zwN3hu68FOqegO%2BXzDw3%2BAiFw9dQic5WE00dSt59N0YDHWAM%2BoBXUFBWWbd0n7Q%2Bz2h2QAw%2BydAD3HVX%2BfbDgG4929ubvyV3I4qLmz8woqlHoKihzsijLgbmMChIQB4R%2FyR15mG4IbdsxAm%2BtruEmJKnJzWOZXl1ggkUAESXpg51r%2FddrV3qDVsXZ7%2B2lG9X2odobS4nHOMKnBYQEwvNp48ZivZrQBXwBHDZsHLajSmssv3BgB2i6hPwrO1VMjXZlnApO6t88FQMKl58%2FLwZzjfu2MjpKzdWBEObchhXepo9uumxBWrYh%2BVGhNaZbUcaBVBSDj%2BKjYBrFen8rko7f4AUtRX2m%2FEy30%2FVl5gLRTDniSKi5p0UbF%2Fi%2Fq41LvmuMC2D%2Fpi0JwgoyabKCBn9LggV6xQGYps6y2EqLeqdqT1LcIg25IAp0IRdJkQ3VTJKvRW5XRMyurfaib%2FzTDwt5bZI4lfkO8D3ZJo5HS47R0yYnO6SMfMT21CUhItuE0nmBDzLYxRtjCcHlACEIx0l6eTzIwpygIZE1w8xzAKKtLAcdZPP5qTZsEkbYc%2BxpayAKXao99%2BfyUxV1ijyK7Jel3rZwrtUfgmMJWv2DQlxTlMLTFsswGOqUBVi3okpuYXgTY2Z5EuPQdEP%2B%2BpOaJthFEX5Ig5%2BIo%2BAGqhYLjYUzMTrNl15OCv4j%2FChGlYl%2F4Ej7GOBlDufQpJkUrCawAsn9F8IzJZriZTAbrHr2byn5WD4FAtiSTQML%2Ft0JGB97gjl2%2F629%2FfLuvma0eCD9TrkCSyP4xjQTKxdsFMpWtcP90s05la31dN9WRPjMqWHC%2BGCOftHVAen2o%2B9TMbzdU&X-Amz-Signature=b222eb5a2f5069ff7f03c15bfc7aafa2c772af88285103d401f1397a9241b7ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QYU4NUQ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAiruOPoQJwVI4RFcUJtVrsldFeXC%2F%2B6AV6P2RhIockwIgP19SjXlY9ItGLp21ujnGq8yKHBngsUrMOOLKmtnySboqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNq3pvbUA5LG6hXiDCrcA9%2FfoebLV4uxWyc2sPrLd%2B6Tjb0ihWTptgyu%2BnaWOKHE4YxETem9F66Emhr2yxP1yv3OSJNxSoJTVFl1cL8qcXo7ACWoUoelhEjGeo9B2IqP4WwfSKrSorwe3Q6SQ2dci6kgAIaK3u3%2B%2Bn2iW%2B1BjZ3OiNWUeXBm2Q0qcjZCvSXN5YqHtqiSCfr3zuO%2FZ6SaOv4jhGSOfKMt5ocHEHEoYsdYkEWZ9QbrrBX4hDHmlV9o9XHXWXhwLP%2BZrOqkX550Axl4pYrgSqmphGghm23%2FI6XnpiEkYwMmWgI5tX%2Fgk%2F9ix3FNmvZfsvhJPwC0thFZAT3yWD5IyAg9fmPN6N1SuP0baSmmYQX2K5lx4aVJPRTWCKKi39Y7NvMe0QzkXfYJEJu1Y1FD6hdk47q3SwEutzzdmIynyZP%2Fp%2BT2hntqqDT7V55g3TYwXALerftL6Xq3U8V2qR7LWMXPkCxz2x4gYHddh7naR0%2FkoQroX6iWWlEL4Nerz3uxmghycutRIgS%2BTVCFFuZCUzEo9Wi3GdGGAW8fIWF%2BR8tb6bQuWroOgmSzl%2BPD7R2O9C65mep5JDidwz%2FWF9iRiqHiD%2BV3qnwdEQywAzFe24L0oAH8d%2BgtlpBEj%2BVEIfsILU3%2FWi8YMIHFsswGOqUB8lwEp6dW7uy6%2F09ZVvrr8Rzk%2F5ttNqdCXNSNkhQJ268BBNYKXUzhbOChAdMhGqKv%2B9UmeNGqNW%2Bci8wv1EE2%2BgR9Vw6SzB8sreY2jkGm%2FObkS8dysljFX3vIfKkFLiPupXDhmWjpSNvKA6R4WPLQN92alNidr92Gc0YPKJa5ig3j3d4o%2FpQwjAoz1OOL4DgA%2FIoPRIKy8KTl%2F2ACc9b7gugs9Tjk&X-Amz-Signature=a9769f197ccdb0a356b3c8ec065d0650589d15bd9da8d6d8681dadf6fb191b5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFHD76KB%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjlsrfZwXuD81qNedCqh5qQVQVUrMgY2NvCfZFFvJn5QIgSLofnjufF1zgknw3DuVbDvtVgYywLIlIyCxBpVR33mcqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG0B794GjjAE5aFc9yrcA7SyvnDEcE9cbycyxNeMqYv%2B112RTGtw%2BX%2Fzai9DJqjLDmXqrjW6xyntNwQCqnUv10ma8bc9Ucf%2F01ANmbN10pVVtApCwMYJ75ubh1h82W0ma7CN9%2BssT%2B3wpgeTcv7iZ%2F7ymd7DXCSIHIGc6m4qc2Q1kOVhc1v%2BKGqIvVk%2FJylS%2ForZ0jLzBuGM0vXokx5kIfkIai0bbE7nbIw2fIDNUyWBnh4iQNIbpmqFrdyvpjJzYpQqAo10212tYZtNDtA95mYmtp3q6pfpdFJQBjDz9kd3VdWUo2bsftuRr7Q6%2FBbZLjK0shlLDhv8pkcpq%2FQUTkcZpYELoi2qMmuxeK3hEg1Nv3bCAwrGER8xRFdHIzG2yFh4LIar2GWVWi87AmVfceAuA6Gvd2wdWXVyP0cXsFSEyywYkNqkomkCQzsGZKIjSR1gBcDvlIsPL%2BWbKVxMZKNcaD%2BF85xA1GSU758GCD1WEeT0ip5F%2FxQq4pWi6M3NskTPgE8Fi3EIuTnTZ8Nu1m%2Bgcn0y%2ByfUfRZznlo5wg%2BLB%2F6jikbxEIEvJc1A0IZCSSk3vWn6RTVgIvluohzGl3%2FRs9kN4XhB2OgsbXzu33mHG4CdCMXgu9d%2FDQKce7uM6PTFn1WxW7IwVCyqML3DsswGOqUBrHPg7pPQpPUBun3DBPa6DbX3LYaDkThn9%2FyCnEZh0RwA7iYeY0XG5WMGFOP%2Fc3reisGaUmnW8PixxUExwnx%2FvD1VaoID%2F7Mye3ymePb7oUEcXU%2Bxt6f2IgV%2Bsx0vnMzDoYsm8vDQueGrTutM7szBu9%2FMT7PIoIO5rZROW84zb2OCaVw3liOgGevVEHqpcBLUT0uZfD6NBS0pk4xZBBtyU3EX3fKH&X-Amz-Signature=cfbc1b799c4b9341a5221de83e63c0d4dbfb89db5e73c471dbb458f24aec94ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3E5FL5O%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDfmImXwA8Nl5uDsGYISB3PyCLGVTxH%2BYsoGMfJsFnXWAiBF946IODiBuU%2BK582%2BH6FBeqIcMIqY5XAKzHaYlEEMwSqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnkvjE27Oilp3C4NwKtwDLwjocI3c6fwKYsQVWd1K%2F1tHKrGzUkR4BP%2FhRRZUhk6HMvIKAbAlMnxPoyAWBNnk1j6vroJKOZYwgSx11c9RD%2FFc6i6ZGf3rIRXPAOM5W5fGptNPZ7cb3DpTUq2mgfAmCeIK%2BupPwkfI7rB47Nrz0brjPUOR%2FaiDn50gAwHjvn7xYjB9%2Bv026JlbB4wnQJ8WZAjn9I2Tiu4ZvPEgMrpMHJ6p3l4BaMY%2FoCZdYonznymfMOs1bRzHcFzNuRr6lJxb40IJk2hGP9Pi%2FhCZbQHx36S%2FnLplxgKHDghx%2FfENajBY2vG1eVNtXVoGdlSqfq%2BkvasQGuDt6mlxCavbZsK7HCst0S9aiJ30hSW1PEC7Eowqf4H%2BOJjyT0kP6AAYKXk175stUSOPELwl1XoVEpFQjnPVF7owKlloxOCKxtdKlGakH%2B76%2BSoKVRj5sOuj8JDvrS6XbDSsecVo2qBTRpGBHYJ%2FUajBbfdslxNVMSWUcAXOqkqyOT8IEyD%2BtC%2F7%2BanD36e31aK0OUxBmZ778Z9OTSA1yC%2FhcsJvkr49fQF5UN4IWFjWISnJjNwYg8vJvOw8YzzE%2FEAv8KCkggUOMTOSDCnfo4RgubiXe%2F5u%2B%2B34C8%2FuxaLiWRkf93vHqTEwj8SyzAY6pgEXlrho0Nlo4Im%2FmD6VoQ9D%2FBsEkC8eXQEHU65Fo6RGA5weOp16Wds22jU55y3vzBn3l%2BWHsDSuWOnJQ4idMfnvB6QzhhXL9G0XMwIvkbrEo%2Bjigvk0Dggzmi9VXRR6CSlbwiFj3Qmkeaq%2BIF0%2FrsQUa3htCn118ZVEuSH1Np3DlfaKJoLcpHTao0HvMQOk5w5fnrxqy7OF0BrhzgVgsG1QkOneFE4Y&X-Amz-Signature=1f1b558ecfe59c30784f16f74baaf380d9c7767bb6097a78b32bd50d9c522406&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3E5FL5O%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDfmImXwA8Nl5uDsGYISB3PyCLGVTxH%2BYsoGMfJsFnXWAiBF946IODiBuU%2BK582%2BH6FBeqIcMIqY5XAKzHaYlEEMwSqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnkvjE27Oilp3C4NwKtwDLwjocI3c6fwKYsQVWd1K%2F1tHKrGzUkR4BP%2FhRRZUhk6HMvIKAbAlMnxPoyAWBNnk1j6vroJKOZYwgSx11c9RD%2FFc6i6ZGf3rIRXPAOM5W5fGptNPZ7cb3DpTUq2mgfAmCeIK%2BupPwkfI7rB47Nrz0brjPUOR%2FaiDn50gAwHjvn7xYjB9%2Bv026JlbB4wnQJ8WZAjn9I2Tiu4ZvPEgMrpMHJ6p3l4BaMY%2FoCZdYonznymfMOs1bRzHcFzNuRr6lJxb40IJk2hGP9Pi%2FhCZbQHx36S%2FnLplxgKHDghx%2FfENajBY2vG1eVNtXVoGdlSqfq%2BkvasQGuDt6mlxCavbZsK7HCst0S9aiJ30hSW1PEC7Eowqf4H%2BOJjyT0kP6AAYKXk175stUSOPELwl1XoVEpFQjnPVF7owKlloxOCKxtdKlGakH%2B76%2BSoKVRj5sOuj8JDvrS6XbDSsecVo2qBTRpGBHYJ%2FUajBbfdslxNVMSWUcAXOqkqyOT8IEyD%2BtC%2F7%2BanD36e31aK0OUxBmZ778Z9OTSA1yC%2FhcsJvkr49fQF5UN4IWFjWISnJjNwYg8vJvOw8YzzE%2FEAv8KCkggUOMTOSDCnfo4RgubiXe%2F5u%2B%2B34C8%2FuxaLiWRkf93vHqTEwj8SyzAY6pgEXlrho0Nlo4Im%2FmD6VoQ9D%2FBsEkC8eXQEHU65Fo6RGA5weOp16Wds22jU55y3vzBn3l%2BWHsDSuWOnJQ4idMfnvB6QzhhXL9G0XMwIvkbrEo%2Bjigvk0Dggzmi9VXRR6CSlbwiFj3Qmkeaq%2BIF0%2FrsQUa3htCn118ZVEuSH1Np3DlfaKJoLcpHTao0HvMQOk5w5fnrxqy7OF0BrhzgVgsG1QkOneFE4Y&X-Amz-Signature=9f5d1b8c54755877aac674b36d7f3103ec9cab306eefe5f8806d2af3e8d2409e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665536TZM6%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDXTjCWHdg9J0s53aQO3GLy50BNeB9RvfqOVPIy%2BeQWdAiAIOv9WpFoN8FogOvyugpx%2FyV337f9dZeT5NM6mvMv5XSqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM70FSxIVtzf6erX%2FBKtwDcHyqGqTE%2FquH8InExpmlGqdL4qHPSudlxDwpa2uYg4b7y%2F3vvw%2FpR9T%2BGefCb%2FYDH4hEIbrGj2wzUgC73dbLlovq%2BMVb98%2Bsci3GadIVsLiKMWCNHGoDYmDRfiRhQ828UFLNzMyl61LgrB6DptOF6vvNIbKaqg5D1Jl2IKyJ%2BvdVuKDAMUDgu%2BrH%2F%2FJMcTiaUqHr0OETcENDmdc03tuaXfp7lZFTHRnYwFPbucsZqbcgz7Ct2COmYErR%2BrbAADIE27e%2Bn%2F557eLT%2BZ9WZSAYRm1HTIpPEP1u3j9Zy96%2BywG3yjFxv3ewjNuh4IuzgA3Kud8Beq3JzbfNUop1D%2F3fSD%2FB4ecFfOSEKfTXsNAqAZHNvMuOGr0IMYBwKQKC9iImuFzYqUq3ZnrVgp3mqTrlvimvRCuV7Zaog0Pn2tDHCqgTSXYroa5T3VExPlG2TmnLQ7M0VoiaVdqhIFZb4SueHt2sqSpM23djs0P9e2Jao%2B2GvvO45KY82V2VWIzPLmbcQdtNElcMNokcCZ5I4y6aDXBDcVDbq%2FJoe9w8UKQbNuMjSzyGVLDOGXP63xXouZFYckSmYRbV5ox7qolyNsaw3DhAyOmmH8HQd0wyyIfkUVHZzqyaVEtJ8oEsdfkwssWyzAY6pgFGBZu%2BlTKE6jHEF2ENR4NQT7dlPJ5y0TKe8RAME62XwUDCBS3UQWsK365XOFRtwQErMRZ2%2FUjoTQpzdin%2FLjVT%2F%2F0dHHIrIOrWv9yVYUyJxbezM5btDkCBW49afGknpmQ4a4lz3U4hEZkTV72pX4moVc0W1iX%2FtHeFrtq3ZNdEGdPRFDb9%2F3mK0GwyeW44hNUoeu%2BlWuSwQjyNxLOK3%2B7vkuAbZgZI&X-Amz-Signature=d066a30ff4fb7533b7540b0ec06ff59343a2d465a7fc1952286b1c29af36aa79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WX4MEELN%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEXOoRdRsV%2FMiRJG0PGv%2FTOeNoZ1lBRSGbX7J3Z1MkB9AiAu3N17HTwAqGqt37knboLdYQGj10xQWCQzHU5EA27pAiqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8DlddQDsY3fnZ7a%2BKtwDGPS5bMonKFoMXhAee9qJJyf53NLbeFeiM6PykHZEIhqVsjLvV9a2X0Rb3JHs4MFPyd9Qi%2FXh37oS1ztm2eV3FjOU901dt2Eg5DvVbXZ9wmwKIlDiin%2FJNg1ki3%2B0P4HDBzOBoo8DUYuw2mJBVKyRdpH%2B1foYmBr0IvG5Vg0ELes5hR%2BWmt59dOG1lxlECqgWpAoXm%2BZZDWaaRnleLZZJ0fnMNLsexJGb5GFVSgvzTPvxVZQO8b%2FPwZfWhmCRT2m4nSY4UNmvDwfR%2FzafRq0D48d8MljYJBneileamH%2FNGKg3vai0XSNDU1tRs3lxnycWl4QrISm81%2BgxwE4vNiO1ZHWKh32fgnT4nZK8w7P7adK2zlIz2TfA9AYA17RI4DkjxSulpzIMlaeq1uD8pLr7FSFFg15p895ZS0rLnGSs0BpcIvw%2BYrxGnwjgVZrn8N4f0i5H83FCv9sl0xdRtlMNA78QDuUPgdu5IAfi%2FF0ZWDmRXyGK86rCI9p1k8EKIo%2FwRJJQ4E1zlacdws1rDPMU4VhBc49zAIwICiP3BHbNgc20JXesaLDKnKMsl7RSXXDLWGWj7RTmqnDbj%2BE%2Bq1ZpvG5HwCVo4myD9ve%2BC1BcAJXtFDoxYm08G3gcOW4wqMSyzAY6pgEGBYvnDQMblTgb3ZF1WwrUNa6CbjO83jsXTC0wDMbSW5UYBS5UHq2TNjmu8K%2BVAfrEbwKs7WIHoJ1JPzZdY3NA3HxKn3HeAFKy9YjFynkCS1QmdF6poTVyPJ151THrKWQaSQkpXROrnPaor6aNRuQNSy0Zk3coSWRgPZDDSYz6ty%2BCWHXJiLg5tyzrIS998QxksidGzUUL54DC4YzWCoHXp2C61SUN&X-Amz-Signature=bcfa2108fdcb81c5bb00a1ffb8e9724c135ec311a7174a47acadb6f7b5ab9b73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WX4MEELN%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEXOoRdRsV%2FMiRJG0PGv%2FTOeNoZ1lBRSGbX7J3Z1MkB9AiAu3N17HTwAqGqt37knboLdYQGj10xQWCQzHU5EA27pAiqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8DlddQDsY3fnZ7a%2BKtwDGPS5bMonKFoMXhAee9qJJyf53NLbeFeiM6PykHZEIhqVsjLvV9a2X0Rb3JHs4MFPyd9Qi%2FXh37oS1ztm2eV3FjOU901dt2Eg5DvVbXZ9wmwKIlDiin%2FJNg1ki3%2B0P4HDBzOBoo8DUYuw2mJBVKyRdpH%2B1foYmBr0IvG5Vg0ELes5hR%2BWmt59dOG1lxlECqgWpAoXm%2BZZDWaaRnleLZZJ0fnMNLsexJGb5GFVSgvzTPvxVZQO8b%2FPwZfWhmCRT2m4nSY4UNmvDwfR%2FzafRq0D48d8MljYJBneileamH%2FNGKg3vai0XSNDU1tRs3lxnycWl4QrISm81%2BgxwE4vNiO1ZHWKh32fgnT4nZK8w7P7adK2zlIz2TfA9AYA17RI4DkjxSulpzIMlaeq1uD8pLr7FSFFg15p895ZS0rLnGSs0BpcIvw%2BYrxGnwjgVZrn8N4f0i5H83FCv9sl0xdRtlMNA78QDuUPgdu5IAfi%2FF0ZWDmRXyGK86rCI9p1k8EKIo%2FwRJJQ4E1zlacdws1rDPMU4VhBc49zAIwICiP3BHbNgc20JXesaLDKnKMsl7RSXXDLWGWj7RTmqnDbj%2BE%2Bq1ZpvG5HwCVo4myD9ve%2BC1BcAJXtFDoxYm08G3gcOW4wqMSyzAY6pgEGBYvnDQMblTgb3ZF1WwrUNa6CbjO83jsXTC0wDMbSW5UYBS5UHq2TNjmu8K%2BVAfrEbwKs7WIHoJ1JPzZdY3NA3HxKn3HeAFKy9YjFynkCS1QmdF6poTVyPJ151THrKWQaSQkpXROrnPaor6aNRuQNSy0Zk3coSWRgPZDDSYz6ty%2BCWHXJiLg5tyzrIS998QxksidGzUUL54DC4YzWCoHXp2C61SUN&X-Amz-Signature=bcfa2108fdcb81c5bb00a1ffb8e9724c135ec311a7174a47acadb6f7b5ab9b73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHA3RGF4%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T154530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDW0fmY9%2Feww4ZWEjgsufszNtxgsTzP3GQaGSSuRDb4tgIgPDeREY8vAJdqcKJ8VtL4xkFMDCsr9SvJYEEiTVqibVAqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOjkrmZBginWaoQ5yyrcA5NWoWL314S5t8titTHfY%2Br3Fv3JKgJkNMYHYZrunQQOQN7mh11vxCvq1KauBBILrwL%2BJK42Vz7tSBdRUqAbJ%2BaSYHZVxa6sXWgRIo17EbWTTaeYEH1cy9YscwGcmp2yqHp77ANOVwuOMH%2FYU5YiY%2B%2FVIJqo8T0piQ2%2Fm58a7MWHqfEgz59sV5FxQQ5Pe1wFwBdlyq77fCswo21S7Q30OiL%2BxisowJDwJSdJHo%2FpfsMCNI1sK1FbMqaZiPW671t4xI9PiV9YJ%2Fq99bJuNWoMz0ajZhbCMnTGLj0JFGjRrn9Fe%2BeOJp7saOv%2BmHJOTgRFhTxCeRulaDU6iAlZv6EXmlc7TcHXlxLXHivGen9a517WbKJFCwxjvzikvjICCuW19fOh2WrA3xVKcErZIVxUi5tGMvt61la%2B670ujGTmmyjkzxUjXAAhB90%2BRkCKphnz7CoO65k6UfLKO7Bd3qi0YGRKqrm2V0%2B4izNJbvbsFichGNOvKaCxRJLF9%2FNRaYardiMTPh%2BWEw0ByOe2XHV42tvwzvCvl7wDXYGCFvQlmiTmpDlD5NYy1nqdOhrNVI5cXCd9Cu6%2BC2ewl68L2npdfFy0%2Bd%2FgM1JZFM0l517lsbPRVcD536M%2BGx0gEBq8MNHDsswGOqUBbFMX8ML7oX0VOvAC7gnssIAhhQON9%2FDSgDtCxR9hpHtCE1aspc6fuGyKxqj8e2kWMMuKKdJGFA%2FKQoBn5TQ6AQ63BcFUkVt0hIQimRT7N2uv5MYIqm45Nd%2FxeBeRn%2FtGolUN%2FRw%2FbOTDjWVf6uaVihj%2FTo3jl3NWVVl1dQQnEdIHeCds%2BvHyTZF9n%2B1exWo49mrLgekg0K6lT4AWOjobvZfJ%2BLY%2B&X-Amz-Signature=45084cb6c504ae8364cd163d7ffcfb9febc84c8846ec9a3c3369b8975b86c6fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


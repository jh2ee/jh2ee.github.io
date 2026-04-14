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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G3Y6Z26%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDR%2FeO%2BSkmLBCrMzBIDlWTaAGscNH%2Fmhg5%2BJkvbrBjTYAIgIZbR9iruVJEazug5NmPVrFc0lyTa1N%2FgipTz4vOKj94qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEPBGf0BGKPB2E%2BfdircA0m6GCuZ2sQxQt9wEQfyw3VL%2F5b5gZL9sIhZk5XQp%2BIicPe2fAewLLHscwPMhI7v3%2BPVJSOIJJpn6J0Zln%2FRoWE66NP6dG7Bx29pKEiqlK2SzjoMj5DsUB7GRmnn6ZNk33KS3ilKAKtIrel2YFTXAmNe3iNjScJ%2F8WmJqimBAh6S4FAlfkE5t4Qom7jcuf6%2BqbLftaDOfF1lcDWPnCNLFK%2F9Zhp8sc3jjUDMhVmOAvgBsMheCLpy%2FUMVmFHRVUKL0RVyUZ8cyQ35JkXlTyT4JoJ6kA5BhWl5W7BqgbHPlKGpqytnVEk8IccnCYpRBLoNBrcjqCwua0mSWLF1N6Jscz4x%2BgzIupDZMPbgpDtJuWSaU0Lgr7FplgZeASPuEVyE6y%2BokFmvxtYthGqXRgH5xa2EqMa7LiyLavtSomQfyaEfYZRzZdAC%2FCbVQRI8S07bp8DEtQslZuMbnaK0os9NERsdEZUZBmIS5XTcET18AOKKa6upWIs7pQN6DEpobgvcaaMfoUPUTTGp2Nfjrh5pIKg%2F3XbuKQjNDaJm5dtKBpDoRop5p%2FhThthzLBHi9S9p2hDNOvoqi781kpn4y341WYFisam77KM9SJ9LGOdlMcjwQU2geeWbguVfVU6LMLyp%2Bc4GOqUBsAz%2FywwFLBwZ0Tsn6gAsrrvZ6bUlgJkDUUaTvX4vqwKILKgKF4K1RFsFkb8XqYAQ51ya8KtiQmluuIUGpig2dUfwhkFCWHlDEQTZwIvHuwg23FxuPmskUdnHHLup2FTJ7r%2FUkmidyhI00E0wGMvEDbc%2BG5QCD0gx8StTk6kimLiRcmBqtZoM8QtHUeULm86mGdpSH8QZYvmp8%2F%2Fez7MprjG8Pzog&X-Amz-Signature=738a89b167d6c05f17be628b8f8ec5567e3aa1629bbc3627330d258d2d63ea48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G3Y6Z26%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDR%2FeO%2BSkmLBCrMzBIDlWTaAGscNH%2Fmhg5%2BJkvbrBjTYAIgIZbR9iruVJEazug5NmPVrFc0lyTa1N%2FgipTz4vOKj94qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEPBGf0BGKPB2E%2BfdircA0m6GCuZ2sQxQt9wEQfyw3VL%2F5b5gZL9sIhZk5XQp%2BIicPe2fAewLLHscwPMhI7v3%2BPVJSOIJJpn6J0Zln%2FRoWE66NP6dG7Bx29pKEiqlK2SzjoMj5DsUB7GRmnn6ZNk33KS3ilKAKtIrel2YFTXAmNe3iNjScJ%2F8WmJqimBAh6S4FAlfkE5t4Qom7jcuf6%2BqbLftaDOfF1lcDWPnCNLFK%2F9Zhp8sc3jjUDMhVmOAvgBsMheCLpy%2FUMVmFHRVUKL0RVyUZ8cyQ35JkXlTyT4JoJ6kA5BhWl5W7BqgbHPlKGpqytnVEk8IccnCYpRBLoNBrcjqCwua0mSWLF1N6Jscz4x%2BgzIupDZMPbgpDtJuWSaU0Lgr7FplgZeASPuEVyE6y%2BokFmvxtYthGqXRgH5xa2EqMa7LiyLavtSomQfyaEfYZRzZdAC%2FCbVQRI8S07bp8DEtQslZuMbnaK0os9NERsdEZUZBmIS5XTcET18AOKKa6upWIs7pQN6DEpobgvcaaMfoUPUTTGp2Nfjrh5pIKg%2F3XbuKQjNDaJm5dtKBpDoRop5p%2FhThthzLBHi9S9p2hDNOvoqi781kpn4y341WYFisam77KM9SJ9LGOdlMcjwQU2geeWbguVfVU6LMLyp%2Bc4GOqUBsAz%2FywwFLBwZ0Tsn6gAsrrvZ6bUlgJkDUUaTvX4vqwKILKgKF4K1RFsFkb8XqYAQ51ya8KtiQmluuIUGpig2dUfwhkFCWHlDEQTZwIvHuwg23FxuPmskUdnHHLup2FTJ7r%2FUkmidyhI00E0wGMvEDbc%2BG5QCD0gx8StTk6kimLiRcmBqtZoM8QtHUeULm86mGdpSH8QZYvmp8%2F%2Fez7MprjG8Pzog&X-Amz-Signature=738a89b167d6c05f17be628b8f8ec5567e3aa1629bbc3627330d258d2d63ea48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OSZKMDD%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC7hv4Z%2B7XYxmImw%2FdnWHX8Fv2jmZfygyRvKV4MarN7qwIhAL%2BVS7%2B6A0JcEsyT%2BSnngycN9ZZJgWPUSW1Lf4vFWTRlKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxeFeY6rJ2gMfyiyUYq3ANxYammPKl2DcOF9SalKTxM4%2BxYqkSj%2B1xmraXdIDSiU8vMLXEgGjnv7uEzP0akBdbZh5IcmvkPc1YXHvK6edfsC1NRukj3dQH8O%2BlxY9crB%2Fiozh0DOQCca9d0BHFII3qvKu889hqFP4lBm49X1XBToIFyS60TuIb7Veo9cS3y3FyCt3g5uob%2BadIwAdQS2T1EkUc%2FUjtJs0Y%2FQhMGRrQlLeguEdWXT%2F76jqWdG4rd6DilchjcPhrm89G6biuIH%2BneOvTB4F1OtExNls9Zb5uepowAxKXgA9UjI0QbxLqmeUFAon2ixqC27CfZ1dAgVhYG6mHZXB46Mpfyc%2Fys96Pkh4L33K92wf0jFb7vwa6pmpIkLCg5SAP9l6XARsdCvLFGrLMmRX1jBseD8GE2CrCF2FO%2B6qObPvDbgeuRQJr%2BRiRQW3J7pm1G6oDiWJUruwc5SkjJVarTTH6h5%2BcKH13qNkvXCjZVtWYfL1G8CmGNRj%2B%2FLRd2HBZnqJipAjZ9hjGbDV%2FYKxEHfZESkIpy4Xs6wjr08LZOiaaob0qvG5VHtblBNcytsj%2FwCEminDie3wwm%2BJOv2%2Fz%2Bp27iJEKmQ5B1Gp66WgP7ii449tqwEMerS2d2mq%2FeSOHNq3zbxDCNqfnOBjqkAS5c06dWBwuHTkpQQckSOscQDvM%2F4RgAXD%2BdX4FcuQA8VII6SDCV8umgh1Io%2FAoOOuuRWrRyTmY%2FupR5eUd%2FFpe6LPoRWT3IYplFFW5PeRu1etl5o%2BI0lRftzWTl82qZfsLgCTe50gN37THcLgwFKD0gGgKNsJyHEo%2BsF%2BfscvhW5XtVsb4%2B546iyvI3Qe5GxTW0x2f88hnHZqxtOG3By3SS1m%2FZ&X-Amz-Signature=27c4299188bc1b654de795355ae8e89610e4c5cff5426a130b13029af30eb81d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647SECOJI%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDFMM2pVHyEg3SQLny6WSLjZKiUstIZYdeEttxfy%2Fy4qwIhAJSp8PjvFGFIetqwDThto8nhyjUFqCEofmW3DgYwLDXhKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy1ZIshL4CDUAXCY4Aq3APeAiYRWacuX1T3HE7csErTFGWkf%2FGBTh%2B89iWPqjkllK7vXClOmW6eLuB8g1LH2PRsEkGo2jFpirVHZYSMxh%2FhOK81XbQtko6B4z41S9oL%2B4F2SzcfvPjDYDgmQNnFLeNJ4S8ROT2oKc8GFpJNMWybWjWBWFOeavPGCsv%2BgvPESIuBg31bq3vYlOs%2Fwvg9g0V7JQL9EvvB2bHxBHAKez%2BhLS7OJUd%2B6y4wFNggM5lBTcwrpyJmai1DibdDP%2BeW5XDrlFvxS%2FO6JRxNcUomOSNN9D%2FE3lOhKQA6ikXypyjkxEWpsWdbijhabIC0hVSY5s%2FbrhNjLV7IYnMxEn88POsq13IcNxbU%2Bd6wGA8A0uhUUAbGNusKZv4sCZ75bigNjxAUxqCHupavoRU7DiqLZJefgh6PBw2k71TL3H%2FIbYZsWOEraRlijMJ0Ma4zNYETb4pdBcPDn%2BGELiAfEnPYlJr7xdXDjQazXDj0MbPSuwPr%2FXqhpF4g97fGDLki%2Fy%2BiEGxvBIPAMgdytxBe3C4Eb7GAsqy19JLaLcRXIh3sp5XhZuOeNvfYXbb6Yt8AafY9TLgh9QeX%2FJfjuW%2BCYcAs0ktPuONNYTIZRUayMqcAJwI3WPbx%2FgwWEnhGRRPPFzC8qfnOBjqkAUg0bO6FoKfzTifF2w0tzpbYzrdpTnvJeZyd8tl3aU%2BVUHhODDkupLmODu3zD%2BiUoos%2BR79mcaWo5NhSs%2B5X9oYcQEugNmzrcffk5pjsbg62McfivbPbURc%2FxGu42qo8Ut1RtXf7lB1WRJLkvpwJno1B9DeR6dVnIXh%2B2v4gum%2B9BjBDhoPtw5Ke67rTDLddpXyZw0x8s4QtFUNFlOmhTLSZgql9&X-Amz-Signature=ada2d84daa4374ed8d54aab2d70b60370c0cbf0a5d2b0c4bcd81706aea5df1c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647SECOJI%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDFMM2pVHyEg3SQLny6WSLjZKiUstIZYdeEttxfy%2Fy4qwIhAJSp8PjvFGFIetqwDThto8nhyjUFqCEofmW3DgYwLDXhKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy1ZIshL4CDUAXCY4Aq3APeAiYRWacuX1T3HE7csErTFGWkf%2FGBTh%2B89iWPqjkllK7vXClOmW6eLuB8g1LH2PRsEkGo2jFpirVHZYSMxh%2FhOK81XbQtko6B4z41S9oL%2B4F2SzcfvPjDYDgmQNnFLeNJ4S8ROT2oKc8GFpJNMWybWjWBWFOeavPGCsv%2BgvPESIuBg31bq3vYlOs%2Fwvg9g0V7JQL9EvvB2bHxBHAKez%2BhLS7OJUd%2B6y4wFNggM5lBTcwrpyJmai1DibdDP%2BeW5XDrlFvxS%2FO6JRxNcUomOSNN9D%2FE3lOhKQA6ikXypyjkxEWpsWdbijhabIC0hVSY5s%2FbrhNjLV7IYnMxEn88POsq13IcNxbU%2Bd6wGA8A0uhUUAbGNusKZv4sCZ75bigNjxAUxqCHupavoRU7DiqLZJefgh6PBw2k71TL3H%2FIbYZsWOEraRlijMJ0Ma4zNYETb4pdBcPDn%2BGELiAfEnPYlJr7xdXDjQazXDj0MbPSuwPr%2FXqhpF4g97fGDLki%2Fy%2BiEGxvBIPAMgdytxBe3C4Eb7GAsqy19JLaLcRXIh3sp5XhZuOeNvfYXbb6Yt8AafY9TLgh9QeX%2FJfjuW%2BCYcAs0ktPuONNYTIZRUayMqcAJwI3WPbx%2FgwWEnhGRRPPFzC8qfnOBjqkAUg0bO6FoKfzTifF2w0tzpbYzrdpTnvJeZyd8tl3aU%2BVUHhODDkupLmODu3zD%2BiUoos%2BR79mcaWo5NhSs%2B5X9oYcQEugNmzrcffk5pjsbg62McfivbPbURc%2FxGu42qo8Ut1RtXf7lB1WRJLkvpwJno1B9DeR6dVnIXh%2B2v4gum%2B9BjBDhoPtw5Ke67rTDLddpXyZw0x8s4QtFUNFlOmhTLSZgql9&X-Amz-Signature=6e74f2d43d339726e79e3c80c2852cc4dcc56c0a491435382839591cf4d846b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RL6AX7PN%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgsZOMhSz44N6hsl8ICxXf609TSZHkS4scRtE9%2FTumNQIgUlWDafsKiyjKgyyQZxxTAbUp0CCK9KDZPfqCLMIQrJ8qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaVfSrzY5QDxLQ3oCrcAz%2F8eNwWdNpQzQUAnheeh9qwBtkPvearS6nXA6%2FzTgEx3TCx2UBJIhW3e57HcP3eKq%2Bdyq%2BxSkE2B%2FvBZI2YjKJeVnpXANCKzDMzjCIG%2BM%2BW5nQ5M4eTR95ccU3Jyi%2Fd%2FnJjGDdLAfTLueGLDKx31QDKIi91CoWu%2FwMF9T2pudGMgFsRxHoAr%2FUwLDfQuCiKwGHfDtUyH9Pb2od7YqOsJebOf16eTqrZSwR1Ue8yF%2B7B9Ut1%2Bm%2Bg76ml9Gl9%2B1RwvsP8MdhGIOpnE5ezWLOb%2FbXeGC03whPoDsQav%2Fug2olsQyu6DeUDWq78jlWmRCwQlS%2FwFjVyOaQYgKzytT740U9mj8tObuqUD46s5WMMnq%2BqcR0wRd7BX8iUsWDJleLrePpNmhBWDsfrw5f5CLTBsZBDRoFrWIL1JAbKPomth4dpsRQIqH82GD4rZHqpC%2FO5BJvi0YEllVW9ZfIq0awZYZvFFBmwg6xnqA5aUsoYVopTAPlPHchn81gAQj9nQ%2FYqnw4kWsZTLFjNTfJ8R%2BZiKdybJsLSegrEhb7NTW%2Bmv2gEJW4M%2BAbqi7eC5hFA%2FvYbvd77GimzfgcBNypxIo9vrmBF5ZIUk%2FemPLVX%2FrrNTZry5iWZj6gpjmslyJtiMLmq%2Bc4GOqUBZkHrhNmmOV9wfqNFObM9a7fq0fPYSuxgQoNXX3ixSsFxU%2BRaDp1o1awzmfEQIGSKlcXUfDqP4lyPuFnMl31t9wdnBChwK6Ri5SJhwD7%2BwUrxoL8tEFNBS2DCwt59xi4RY02jYqbeBzaUZXXGFnVdJRl9%2BLFqRgFT1dlRFCYRTGvlrlg%2FhN3hXIjkz1%2BMsQwzUcA0M%2BW4E0wbfhHP9DTSolUIL%2BjE&X-Amz-Signature=a980bf5b225b14d21389976fc92dc2bb0cb1180cd2ae18ca27cf26d1a6cd14f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSFTBZLJ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbyTLkT1kZYRbvzFN1MoyCm8HRx6h02yYA3RLcXLgf5wIhAM7gxNyFZH1%2BLI29OaSR2b5ZqpbtfPHRIlgqkH%2BpYHAoKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzW3LO2Of24mDCRDRwq3ANzenl2EheWroQij0lHBTzK3l9XSKgPG35G%2FNAMwmiHW9ihF818j8t9BvWBj3I6Iny1DF7smHxl3BPw11V8CYW5Op3KAhrLpt%2Bq%2FwGyYVU7b%2BVD%2B6mWK7AqiP4vuVV%2FWG8DOg%2F4xlJg65%2Fz8pSKt144JGVqdBTw%2BG7TflX%2ByuTJ4eVXg5IX8UFt%2BZ%2F%2BiSGASGypwWxunwDXhkdESh%2Fg1FqZ7ElmE5QpMR6NNAtdAH0gXUVumFnR5ndkk6hzFZRzDKOIhQJRK5vs9zU5JvLNAr2Z2a7CyNF8btbavNk%2B2gaLlM6i4hgb5YnwX8mjaQKNw6lmmYfaBhE3DLyqaPbqb4nIMdPjM%2BDdDzjQOj%2BvCtr8V0cGLqy3o244s%2BMyfnkx6G7OkY2GbrdNILsXpkyQf8hY08IHPCIsRnvdNx7sWwGqLqFyheBq6Kuy%2Ft7SuM9%2Fv8fjR7%2BnUpzUpRQOr5Dh4W%2FuPR%2FkRHiRzBTrwERkjjt5dcA%2BNxamcAUoKxUbPY32E3P8UbQGQQqPbj3bztu5c3Mc%2FNlhfJyceNiy3vhg9dJF%2Fd7Jn1jTt9Imhog50cWj6u5OfV%2BPe9uglz2RsY5NZlxNWNRmB92jQMf0m9yBC1e4Kj011VDjRhnqhJCTkzDVqfnOBjqkAbgCUkJDduPw%2BRcHcdbDPRP9h5bAubhGJmOi9GrsWXVXDvVL%2FNhyQxk%2BDGlUiszlEu%2Bmb1wyJOzzCsfboV5drXi92cfBGwvy9wNSHjTzBOP8aElWBikx3e8HmHReFkZRHtGrtI8sYwBY6PLN8qYe5N2SihyCGa5f9R2QoWD5AEvY%2BV%2B%2Fl6OfaWxXI%2FHiFnO65Hg%2BYUibxWDo7Yxau6bWa%2F1e1nHS&X-Amz-Signature=82ce0edf11126f345479dbe4d2ae7fd440b455bd9543475424912c892747a88e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAWUREQX%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH6shWX6ITB2GWTp0%2B50uw2vZ0Q75KDqXCdbPVxr2RkhAiEAi00ovNOkW2R2s%2FjgFnjx8nkk7H6wpYsBAUMGDe%2BoNCUqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGIIHi%2FmytaEwYFy9yrcA4%2BONY2AeKIq1iXp63%2FkIGyExo0tEhTE2tmZ6cHAnNr9px2X%2FC0NOJRF62Zex%2B%2FHcigq1MZjblt9iA2isEIGhqWUUcREosR2%2FBtj%2BLPnTA9iwnKyl8AsygxZqdvHPapK%2Fb%2BvQQIC2EdiNGq9BmnCQ%2FS%2BGMW3AtEzyBmW74Er8VxQRb7rW0r4slqPKvjNQAmCGMT76KqYVgPUwDkn2jhX3uzah6KVbMkG9%2Fxxkdt0ToCQau07B3dFyaZMtvjyJFjMZGHi2ZlJRxTtP7wwznPuMAD15C9ySHoG9JNT1v8CIYwlv7Ldy%2Bm4d3RTuxKzcwWVPeBxapLkNxGE2uriVWWQLAodqKmtGODTDLVQ3Zaq4Zdb%2FLcvrIiR1N0ikptZgKYY1nYeTuJrmdLkltVq04%2BtbrQ4RXfiy2m7iseQbuB%2FC7kTrF1E1KuF6A69jI1LSgD7rSjGBwH70rjWUlMGtojIn9I01e0c0uefSSILV0VndhCF6jJrpO2QcgnM22LCOBQYHyD3vwbghu4Uy91lBckvcqTkMwfO1I%2F2GIW2RJqFppmNoRsoskzsSx4q8KiKPa3yBxCbhs1fnucv6roY6Kbwaz8yVutYxwQZ7Pajr%2FV8DiiQ3XNWqG26Qe0U9M03MI6q%2Bc4GOqUBPI06eKTTtrpnwp2sxltHBC7ySQWT%2BV5oHrDLuONuqv15jCzp2vEbPtYnVY5ShuymCNyzNPusiH%2BR9CBN1%2FJdw0seYhZMxfgwM6Q2wmoIq5yVnEBgG5aqs3QUHthng2HLyHEMVp%2F56dPlSGrHKWJmTMGMUVxD1o3hwKaiUg4t71BCU%2BnIY%2B6YSXawCuVKGDFlPC9EF64jiSGjIcBG23NXJlLedkN7&X-Amz-Signature=1882bb6bdd9b6ae1aef9f0678af1e249ef27e00f39ae4e20d7d93251c602c6e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR7C5DAC%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHBkXxEXiXuDFiJTSft3SLWknFFlSBFr7Fk37oSTSymSAiEA4R%2BDor7pL3RtQ1cS3Q%2BaK60SLiS1qTpYX%2Fre29QAN6EqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIVi3SoQzcK6nGDPVCrcAyU5ILutp5c1rZ4V%2BhBeLKpa041F1JkHpljBh7lp0YddcoUHvXvGdZinoZBrSym56GUYkEjiFeAky7h3PMw5zhEg%2FUgfZ0LCGIH4G0BsVKNkWNu9E38LPs4neH%2Bp0i66hjE7r8SoQdZYrw%2B8Hd%2FRutH5sUDnjGoWGL17tDxo1%2FP4rmKhu34e%2FFE0j33GTbyuT0KMxyvHbO8QyAQhCMji3mxZlXpQuJmmLFJZ%2F46HLdM6eXiw61W76zgSN6OOMxwDzyXOjHf2oKmHYdrieIe1vokqjWyQBHefoL1Snv7xUY0tk3AXkRC6Q1pjsceCDL9Lz44PcXhhYpbeUiDmPXUJQWbM6Hjc1vJAoOp0dny3KesqrQJPquOsypLOOczziVuT0cDXYCXbopYi770IFwkM1vqNU0GDjZmnPwrM7WlphhG2ONSOtKQ5Q1P%2Bw8rmZjTcv%2FtEOP%2FW3vc5QwvJ31fcDxE2qHx26ak%2FwY9dHvQikwsLQBcmmXaOAhXMvVlznWJXOH2MM13Ulbq51ND47XePzGEglEx%2BKpN1qfmZSLqalfe7xX1NDo1drWv0vQWIG1lDjJ4%2BErjuohk%2B9psreo%2F74snOgIeVJY%2BQGk%2FJ4eO7CkFL1GzGhrJJ7XtUT5tgMP2q%2Bc4GOqUBWn%2FrQrEjTFegZkg8X76naQfSJroGyexYJPhWwmDbBrcsWh%2FeGLsQ4jvVrDVxTr8yfN1B61pQoTkja8Z0vtzcrLz3X657ujjFToaLHydJNdUtbXa1kNxUbRuviKsfIReCAnHNU1NrMLogI9w7esxnI016CqTXQJ7xLkKkBpI6qRxi1YpntxONtYjvNi7fKDUOVqqSDkBAf9GTvXUjJOAY4zXV7fc7&X-Amz-Signature=2318488732401254777c6302512680814ba4ecc4d8074a95a79ac25e0b3c75dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR7C5DAC%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHBkXxEXiXuDFiJTSft3SLWknFFlSBFr7Fk37oSTSymSAiEA4R%2BDor7pL3RtQ1cS3Q%2BaK60SLiS1qTpYX%2Fre29QAN6EqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIVi3SoQzcK6nGDPVCrcAyU5ILutp5c1rZ4V%2BhBeLKpa041F1JkHpljBh7lp0YddcoUHvXvGdZinoZBrSym56GUYkEjiFeAky7h3PMw5zhEg%2FUgfZ0LCGIH4G0BsVKNkWNu9E38LPs4neH%2Bp0i66hjE7r8SoQdZYrw%2B8Hd%2FRutH5sUDnjGoWGL17tDxo1%2FP4rmKhu34e%2FFE0j33GTbyuT0KMxyvHbO8QyAQhCMji3mxZlXpQuJmmLFJZ%2F46HLdM6eXiw61W76zgSN6OOMxwDzyXOjHf2oKmHYdrieIe1vokqjWyQBHefoL1Snv7xUY0tk3AXkRC6Q1pjsceCDL9Lz44PcXhhYpbeUiDmPXUJQWbM6Hjc1vJAoOp0dny3KesqrQJPquOsypLOOczziVuT0cDXYCXbopYi770IFwkM1vqNU0GDjZmnPwrM7WlphhG2ONSOtKQ5Q1P%2Bw8rmZjTcv%2FtEOP%2FW3vc5QwvJ31fcDxE2qHx26ak%2FwY9dHvQikwsLQBcmmXaOAhXMvVlznWJXOH2MM13Ulbq51ND47XePzGEglEx%2BKpN1qfmZSLqalfe7xX1NDo1drWv0vQWIG1lDjJ4%2BErjuohk%2B9psreo%2F74snOgIeVJY%2BQGk%2FJ4eO7CkFL1GzGhrJJ7XtUT5tgMP2q%2Bc4GOqUBWn%2FrQrEjTFegZkg8X76naQfSJroGyexYJPhWwmDbBrcsWh%2FeGLsQ4jvVrDVxTr8yfN1B61pQoTkja8Z0vtzcrLz3X657ujjFToaLHydJNdUtbXa1kNxUbRuviKsfIReCAnHNU1NrMLogI9w7esxnI016CqTXQJ7xLkKkBpI6qRxi1YpntxONtYjvNi7fKDUOVqqSDkBAf9GTvXUjJOAY4zXV7fc7&X-Amz-Signature=b481be1682f5454e0ab853de7c077afd5cd4bd3760338c2f809a6fc782535d9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7DG42UL%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEJBzxIJDL89XOO1%2BiD8%2BEnczM5A2%2BHLQ8g%2B6IXnsMnQIgC7ajE5ha760fRnacvccslhjo%2FJCYNz2z0MEgifaQfLoqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMQQWCAVF7T3GGdsyrcA33sNwRhFsOhWW8ECn%2Fx7v93Nl7aRJ4ig8YJdAgUT3ZjXQlHydtK1jtbE9HPcm8t3MsR0B1sk6NflvP3MYHaanmbWgl%2Fta4qCLLfGUi4JdhLDH3uQwMExXXnCJTwlPrZGVYH%2FDv1FptGfW4bp3wVPgez1uLkIFLRuURMS5kZVyGnkOnYTfNNJBPHRah8hnARAkcouQHvLcJYIKENDp3y169CVbMXcRp9nskH1Pf0hsfnNAmAfdQbDZbsioGxLIzTEE7tvFjUYUySTjtE46JIFlI3Uk3nL%2BRCPBeAEvgAwG8w4Kt9T3xTzlydvTYA4IiDJu7i9dtznNlr4gxH8KgwNQ2LC2JG0k93PgY%2FYvXQTzVD0hKLkHEQ4jdeq%2FBAD9Aywf8V3Ipx2uSs7QYsrWGNGIyFKWhZYl19CCMreVwZU%2BbJ05TWprx7Xf7bkVstervX5oG486uA0qCJ9BM3KLf0geqLGwxS6NYZL3xdGQU%2FL96yDqCqXzckLaxxk%2F2%2F3qcvvKyjneqnRKHXLm7z2hps0zplzbu%2BGkxUa%2Bpz3aahS6TygsccX7obiV7Cbc%2FZFDfs3SN3x40BlXNdbjDHPJeU2WitPeywmIT4sGkRxenih96m%2F7heYai3hQTJ0ixtMKnH%2Bc4GOqUB6ePONzV2qEi3%2FG9MifW5i5NSpqP8TedQifCN%2FyP0MI5W87c%2By5mGIPha%2F2hW3bH0SSU3Z%2FuN%2FLN1nPz1JOCYxRdA2%2BmmHRPB5hUomfunhxBsRjRlFkYM05LmZ4flxAKHHE2HK6Qf8%2FbHBo2Om64oVLhLLB%2FszLaRl5XvjsSaDddbS7VsFwQu1KQ01gNmzuy0AoE76043b01g1baP8cqJYPolS8Xa&X-Amz-Signature=9b12cd92f8c8b05a4aff289674449c7a95e9bd79c1d8b1c9c3d58292cba29992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA5CF3EQ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBh7kjm8qIjnto92sA1fadAMCfePCUHfq3WtPx66LolzAiBpJIDCfz%2FEU0A%2B3UMTTfY4UE%2Fuy7mziLxQ2yTYQ16FGyqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZDTNava41%2Fv%2FhKZhKtwDSXLsH9%2BbBxuMBcg2OzaklmMxQPBUWCr5Ny0dDceHn5sJuwUocwHBwaCehWzW7YXLVm2uxQyv0ML%2FYuctEKCnOU5UNcWJk4oTMbNokB7ywuCLBFmZerU5RcrKBhn4G3JXDs2Hk3GuNILuG6otWhLfXAY2kicpEmpYQ9B0H2IKlzGxStFwNOA%2B7ln2iSUqLXRNk0tBHaWJqW6XcFnvtL3zDqmSMbPMGA8V2zpdOr3ZLa9CPxpk9paiYpiWtA2rfilrqZuHksAi4Jks%2Behr9YWJEhmRLI7i9%2F0HP2eDKewk33G7nIU8RTyonyQ3M6AZBsJO4KIKzP3HW1qzW0%2B%2FFGAS1iAwE5H1oABH6Xy4qqT%2BolKD4ybAJv8EYPjf5AK3IbF56fk%2FzuzvPpC02hb2f2v5KV06NqYbxkYD%2BrrGFlpKYv2M7xu50XNIUGirO4S0SIJeonyO5n1TOX2e9Ioi%2Fx%2Fw9xEVqCLkhhaWz02c5byQgUjR4PadsHyuwiMH%2FwZ1WdxK5U0ly4HzDGXdCakQ9Cy6Ek8mxvL9yP9NPLR9q8gMTJAFTmARrjrGgqkmAbW8Xc022gpOXmVfUhFMpdPU5PG%2BJn%2FmITb%2BQ0fAMfiBOu6L7Q0O2UEPvE9LjtGC8DQwvar5zgY6pgEtT8s22XNuth6Y%2BZKIzAw7WmWx7GTq6NvBwLiunU%2FnN5sBLYXIF%2FYPsfNASZQjdZCh6XPZQ%2FNwkQhQVaZMWaoslFk5k3Lh2KDOI0WaeleJXxM76uD%2BwYs%2BunzMe8Pf5JyxRWmOz6DcThNFyz14ZLgNEZEzQS%2FDJinsZNn4gfMZA5Xbl0wYcTjHpDU9p92U0RTE%2Bi3sqlmXhgB4B5%2BKBj7NEzUVAiws&X-Amz-Signature=124d06ccc0a9f9723d48e28a03e9fe470bb6bf5a58f3c3c5afb184cc6cdc3e35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA5CF3EQ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBh7kjm8qIjnto92sA1fadAMCfePCUHfq3WtPx66LolzAiBpJIDCfz%2FEU0A%2B3UMTTfY4UE%2Fuy7mziLxQ2yTYQ16FGyqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZDTNava41%2Fv%2FhKZhKtwDSXLsH9%2BbBxuMBcg2OzaklmMxQPBUWCr5Ny0dDceHn5sJuwUocwHBwaCehWzW7YXLVm2uxQyv0ML%2FYuctEKCnOU5UNcWJk4oTMbNokB7ywuCLBFmZerU5RcrKBhn4G3JXDs2Hk3GuNILuG6otWhLfXAY2kicpEmpYQ9B0H2IKlzGxStFwNOA%2B7ln2iSUqLXRNk0tBHaWJqW6XcFnvtL3zDqmSMbPMGA8V2zpdOr3ZLa9CPxpk9paiYpiWtA2rfilrqZuHksAi4Jks%2Behr9YWJEhmRLI7i9%2F0HP2eDKewk33G7nIU8RTyonyQ3M6AZBsJO4KIKzP3HW1qzW0%2B%2FFGAS1iAwE5H1oABH6Xy4qqT%2BolKD4ybAJv8EYPjf5AK3IbF56fk%2FzuzvPpC02hb2f2v5KV06NqYbxkYD%2BrrGFlpKYv2M7xu50XNIUGirO4S0SIJeonyO5n1TOX2e9Ioi%2Fx%2Fw9xEVqCLkhhaWz02c5byQgUjR4PadsHyuwiMH%2FwZ1WdxK5U0ly4HzDGXdCakQ9Cy6Ek8mxvL9yP9NPLR9q8gMTJAFTmARrjrGgqkmAbW8Xc022gpOXmVfUhFMpdPU5PG%2BJn%2FmITb%2BQ0fAMfiBOu6L7Q0O2UEPvE9LjtGC8DQwvar5zgY6pgEtT8s22XNuth6Y%2BZKIzAw7WmWx7GTq6NvBwLiunU%2FnN5sBLYXIF%2FYPsfNASZQjdZCh6XPZQ%2FNwkQhQVaZMWaoslFk5k3Lh2KDOI0WaeleJXxM76uD%2BwYs%2BunzMe8Pf5JyxRWmOz6DcThNFyz14ZLgNEZEzQS%2FDJinsZNn4gfMZA5Xbl0wYcTjHpDU9p92U0RTE%2Bi3sqlmXhgB4B5%2BKBj7NEzUVAiws&X-Amz-Signature=124d06ccc0a9f9723d48e28a03e9fe470bb6bf5a58f3c3c5afb184cc6cdc3e35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7GACSS5%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T155757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDaxjmTg99M9T0S3iQNR1RUjVbvcQ2UQ%2B6emJKSMoWhAIhALmZNT8uppQzJb2dlDA7k%2Bvm46YzmFBXiuTfgLm8X3r%2BKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwo37aZqvPJI01fMZEq3AO9B0V1o4rlpqQWs86umMiImkXBQ61KlF1Ng2ZZdWXYdZJ0NtgM%2Bn1vdgo5HhexJ3H5%2BoU1OuxCJ5SV%2FL6uwz4gIYR6kTjurUjOWEXcV1XB4Z7sRvWo2vIan%2BKIazkyKVa7w0IKyjuB8tBpjLLsliX8mFcSfZqx%2BUyokroPbRoHD5pWkhPBHH0T16ctqAaAkvXv4L%2BMEkrbRBZ7agqhQfTdFauzzpYTrQMmE%2B27fpVxmteUOTFhaJPPGq0fjeS524SPUhGC5w41eUY8%2BV9yscnNSzqhwMqb2ZQkmQRzJCYfDMkb48foISEAC8rgxR5o1vm6ZQK9IKxL6cditG12VhS8CdX4kBDO52uW6lOkIJzqYB9VkGt7EEgczRkMnh2pvku2QaA%2BA8Qq67rCmjCkpRrEf3OlAuz%2FojntbP6O6GZxRpDoAXL8AJvThYXCLCFMj%2B81DPXdpOL3RL78xjEZKczg9Si9SH5vFQpSX4kcET7qlH7cFzqaH4g%2BwHQoKF4fRGluHTPxgio2Yio61CDwkDQa1wHkMQIXzuedJBCUDLDOb5vPS6qeDO5p2Mb%2Bl9NQnTX65Usp%2FEsMBW%2FL2oeQQFgmz0J4iBtPsfFYgOVCYPTCkfFVbxvWZEbuvYU%2BKTDFqvnOBjqkAc%2BqZeR%2BhfgkiBANtmZoYUPSaJYmVeyT47iVc6Wa0aGMDxinYKV6ZDOVqfYp%2FSBzANssAZBrHMEu%2BX%2FUvo3GkfKnXO2zA7aK1JpDKOe9CFvfgv4hL8rx8oO0KYhjwJM%2Fu7WalQBue4MKI%2Fadxr6INlNS3aUvzsRYjMLoN8wPCyxLFM36CgiSTYzFea7dkQh9NJ8%2FduqMdJv7zRtJetMLfcL6V9Pr&X-Amz-Signature=9729d3c26aa628d25df697f45f5c8d1e2ab630fddb871399da21d226a81398a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


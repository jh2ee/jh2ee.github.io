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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXHO7XKP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFujWlADN123USzNQ6bwKqFTGlCWqspv1CcLGRjpvwM9AiEApmjfoiGfLgCYj7vgyrzhoztNqIx9EFLGwkPvvw8LS0oq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDKqE7nAtJQY9F%2F3XNSrcA%2BLSn60nT4Lo4DBSuIV0jiO99gSbwrJaUoMxnoWpRvFIekstRyJyFr6NeXx4dkt%2FSI48ruYIr9BjCNnZBE5qu3ho%2BBnRZjG%2BL2Qqu4F8XgxaPBNthr%2FvGc96%2FcbE%2FoxBgpJ5QtcM%2B5E29HOZlEaWKXL%2FjiZ9vRfENOZVcV1E8G%2BBtU2GFAfGVp80csh8cwFIimurMihrHEQ6uJPox9VZNqInJzSuYMqriKWRn9u8OUM%2BSZNjoP%2BVpIPldxvrumBkoiQZda4SLuIPDAAIO56dx%2Fgs%2FYp4N9MjFMMTd3l%2BdzIEedo1Bb0r9DisJVM6hFcUYXetUJYnRn%2Fyt%2FFGDAg2t1tWmpdatoSTuDRF9y17lahv%2BR4rxCe4s2jJmJCybBbDS0tLbniNEdGlt3KpiFkGWW5PPSFR47gNeHOE4SF3liHsmBHwCWp4kGe1Ktt8ARs6kX8gmOVBG%2Fs4VR8VvxJOgk5onnVr0x4s%2FuhV7Brli2V44Im6ugGTx1utyXO6ppvxskGxeIwmyuA7g%2B2QXMklSRW83VpXcSp4fXj0Pcr6GEuomDWDYQCbjbHJuMVaOl58lZxKcSkm6evyqxHrYpWYXXkg1QKIGbOP39SirBka%2FIgFu7cv2MC2SkWO%2BkI4MKW4k88GOqUB%2FDBt8Xr%2BNdwmIJhj4uxxSKuwEti7tlvG6%2F1IpSGEIsqBrffLlKrPhG7h1l7nOyD9C%2BQqylce7%2BaPtE20JFKusq4nnyJFt7DFoiu2zZIneSrnCeLgkbR9CUqVYTZIDyQYmRRDeLnZMqkOLZGF8RgAz7dPvLYP3AvONM8HUXlsiMw3%2BModuYpbeZLv2wgk%2B5pyawJRvySGDTACY5zUpkeUn4c4wpXc&X-Amz-Signature=11ef1af2a5305a95d025e64fe0beacfafabcd8b92bd9e915ae85f8ff17c34d24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXHO7XKP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFujWlADN123USzNQ6bwKqFTGlCWqspv1CcLGRjpvwM9AiEApmjfoiGfLgCYj7vgyrzhoztNqIx9EFLGwkPvvw8LS0oq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDKqE7nAtJQY9F%2F3XNSrcA%2BLSn60nT4Lo4DBSuIV0jiO99gSbwrJaUoMxnoWpRvFIekstRyJyFr6NeXx4dkt%2FSI48ruYIr9BjCNnZBE5qu3ho%2BBnRZjG%2BL2Qqu4F8XgxaPBNthr%2FvGc96%2FcbE%2FoxBgpJ5QtcM%2B5E29HOZlEaWKXL%2FjiZ9vRfENOZVcV1E8G%2BBtU2GFAfGVp80csh8cwFIimurMihrHEQ6uJPox9VZNqInJzSuYMqriKWRn9u8OUM%2BSZNjoP%2BVpIPldxvrumBkoiQZda4SLuIPDAAIO56dx%2Fgs%2FYp4N9MjFMMTd3l%2BdzIEedo1Bb0r9DisJVM6hFcUYXetUJYnRn%2Fyt%2FFGDAg2t1tWmpdatoSTuDRF9y17lahv%2BR4rxCe4s2jJmJCybBbDS0tLbniNEdGlt3KpiFkGWW5PPSFR47gNeHOE4SF3liHsmBHwCWp4kGe1Ktt8ARs6kX8gmOVBG%2Fs4VR8VvxJOgk5onnVr0x4s%2FuhV7Brli2V44Im6ugGTx1utyXO6ppvxskGxeIwmyuA7g%2B2QXMklSRW83VpXcSp4fXj0Pcr6GEuomDWDYQCbjbHJuMVaOl58lZxKcSkm6evyqxHrYpWYXXkg1QKIGbOP39SirBka%2FIgFu7cv2MC2SkWO%2BkI4MKW4k88GOqUB%2FDBt8Xr%2BNdwmIJhj4uxxSKuwEti7tlvG6%2F1IpSGEIsqBrffLlKrPhG7h1l7nOyD9C%2BQqylce7%2BaPtE20JFKusq4nnyJFt7DFoiu2zZIneSrnCeLgkbR9CUqVYTZIDyQYmRRDeLnZMqkOLZGF8RgAz7dPvLYP3AvONM8HUXlsiMw3%2BModuYpbeZLv2wgk%2B5pyawJRvySGDTACY5zUpkeUn4c4wpXc&X-Amz-Signature=11ef1af2a5305a95d025e64fe0beacfafabcd8b92bd9e915ae85f8ff17c34d24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665H4VF2B%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDhbjUCibpBnoRvdKxHDZXVu4i160U08qV8DmNKJZ2JlQIhAKfjlIFpJgFx91Uerfo6nedxdrMPvPuNsJwRqkdmsXogKv8DCAcQABoMNjM3NDIzMTgzODA1Igym3mnJ4a0aZ0Pm2VYq3AMIECuO5BB8HIKcnUU5f75enuN%2BszuWl1Vpo3B5dEsX8UdQ75cWgO0ThiLOAUQRqgCDIrU2Na%2FS5fr4jZ%2FCqgsWhqNl64ydmfVw%2BcMDcczidpqmTmq65VoajhqZcXtGYyRy%2BH%2FyFwAk7v88SeYRz6lr6RNY5Wsvjorf1lq3eLZ0kF8RDJ8pM%2BFZCViEThWbkKGIj%2FlXACzMKgKflVeF8RydQWK0zxW7HPSqYSbNzZHr6twJ5SW1%2BbHYEpAS%2BX9pd8Ml5SLXkUjJNRtQsKiJwCYVCgEsVC4T5uBDc%2BAzgRbB5gWwFs458FXwiXMWj6Fve09mCXkBqTjVBT3LaVahh5kbk3RbARVkzv%2FomXkEgvvkr3P9EvtgbOWJZM9pBj0Ei9uT5tS%2Fn6j2jN6SDmhhWZvyQlx64Tug%2BxhWRG1woV3VWVbEizoPNsBTqfvE%2BCo79yP6Cci%2BwWQcVT%2BnvkHpQC%2BXRX5TEiuuKAY3TcDAkgnXg93Im%2BXgJLQk7ttiG6Y747mR%2FAaxknsYAePkiQ0yZYRLLNmDFpvb6IG8xEEvN4grJhOI3Sq%2BxkpfEcqbQpjr2MnhypVyQns1kIyVRbzUBd8CQUh6jG8C3BKgTxYyuh6tiNLXdwgZiyelNfzfdDCMtpPPBjqkAYX7L0kQ4tVCQTa%2FHFZPSuhGXiNCsGQ9vhPpCO7oyu80ic6Z5O5%2Bx%2FX05YCXW1nUWaxLkYU8H2AFfuZ9IxqqcX9alUi5sFZAHbk0h1yIgS4DV2IFeNVP4LUBKhi5wIEXfIDCrIAii4yex5zWzwV6X%2BR6C2%2BMAxF4AhCDKOajCJGaxAcLnGZBwqGe%2Bzi3XKeYwWIEd9LSt9TITX0OGVPo3fdayYCx&X-Amz-Signature=db816e42453c75f7e464a5319ccc9c57fc8e6fed9c25788e1cf29b835a4e8d9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXZY2WYQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIG3dPuAVYvWLJoULLmjZSaHNHP2V1ze%2FNoWyYlyrrF40AiEArOVE17v5CXNyIZ5MmKxVCdhdlCb%2BguoO%2Fmkt4cr7UvIq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDBgjv5qz3Ta3yGyA7yrcA9kbz2EWNQfOtE7AegHoAKxi0IohmtM0MTwV7O16BCMT4z9tSNNx34NTgBHXn6GA%2FlzaZTVzFy1H%2FuNxLEqbX3BaQMmr7yZi2Hw%2BXdBIQWguug6dNY%2BoLRV7KryfuTBo0nClpB72zKuP6G2IDFirYRd8wwqRwkVxjhCv2L6d1nHlWRhoZlK5c4S5YKeTMZPBPMLh7s%2B9zpX%2FvksQeHXvFH1JGAtEI0TqDQJZIB%2BlX0J7B4A%2FxemXOnzqZRlxkaJXRffTQQCr%2F1YvBossdRLgtbOnV8hrvzx4X7l3vVQjSei5AxEucJqMSO7IyOveDwo6o%2BwBfJxLoRKx%2FCqgjQcDz7vXHesAIAMveW1wUDUgLc3t1MXgTgk1%2BilMWSw1q7HNlZ96QiiAk2m64tMLdI8zk6yem05KAhkcqrxadSkrFxofWQ%2BOvzJLLlfeR2IjCCUY2hUVuY38WgR%2BEyEuiwR0wpLLJSiljyjaRwersbLZIKbA7Ev5atPXxwACJk1dMmhCupppnIl%2BEEEc5l0vWRmijZ5QCLl5fKz2iA1cqTQBu0AJvx3URKfN%2F54BkPKWsZokQbYQBcvTyWSNEgdZFnO6u7is8XUma2ossLuFGUzbiFZNIMe8EWQD8w4BW25OMM21k88GOqUBTqYESLGzrazoXLBt%2BYQ53zZQMrPjFWNjTBO7GDzZZlWY7VbfMd5u0UXIdgjBibsD2e4hml5YLBt0eQwwzMb7cpAmRItO3ba6DcW0MF4uWQyf8zYMaoQLWxrgH%2Fetm26n4XgBrCdWGpidNsbEYSqmDiEeh6rYNLD39uqSS0aieSNotwP%2F73sF8tUIBJwZ6U90AXbR7ybsmpXllRPZxf5%2BcS2RZHmx&X-Amz-Signature=ca91d7363c33148c23491dd43d680469e51df34961781a7c40b7089b88e6c031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXZY2WYQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIG3dPuAVYvWLJoULLmjZSaHNHP2V1ze%2FNoWyYlyrrF40AiEArOVE17v5CXNyIZ5MmKxVCdhdlCb%2BguoO%2Fmkt4cr7UvIq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDBgjv5qz3Ta3yGyA7yrcA9kbz2EWNQfOtE7AegHoAKxi0IohmtM0MTwV7O16BCMT4z9tSNNx34NTgBHXn6GA%2FlzaZTVzFy1H%2FuNxLEqbX3BaQMmr7yZi2Hw%2BXdBIQWguug6dNY%2BoLRV7KryfuTBo0nClpB72zKuP6G2IDFirYRd8wwqRwkVxjhCv2L6d1nHlWRhoZlK5c4S5YKeTMZPBPMLh7s%2B9zpX%2FvksQeHXvFH1JGAtEI0TqDQJZIB%2BlX0J7B4A%2FxemXOnzqZRlxkaJXRffTQQCr%2F1YvBossdRLgtbOnV8hrvzx4X7l3vVQjSei5AxEucJqMSO7IyOveDwo6o%2BwBfJxLoRKx%2FCqgjQcDz7vXHesAIAMveW1wUDUgLc3t1MXgTgk1%2BilMWSw1q7HNlZ96QiiAk2m64tMLdI8zk6yem05KAhkcqrxadSkrFxofWQ%2BOvzJLLlfeR2IjCCUY2hUVuY38WgR%2BEyEuiwR0wpLLJSiljyjaRwersbLZIKbA7Ev5atPXxwACJk1dMmhCupppnIl%2BEEEc5l0vWRmijZ5QCLl5fKz2iA1cqTQBu0AJvx3URKfN%2F54BkPKWsZokQbYQBcvTyWSNEgdZFnO6u7is8XUma2ossLuFGUzbiFZNIMe8EWQD8w4BW25OMM21k88GOqUBTqYESLGzrazoXLBt%2BYQ53zZQMrPjFWNjTBO7GDzZZlWY7VbfMd5u0UXIdgjBibsD2e4hml5YLBt0eQwwzMb7cpAmRItO3ba6DcW0MF4uWQyf8zYMaoQLWxrgH%2Fetm26n4XgBrCdWGpidNsbEYSqmDiEeh6rYNLD39uqSS0aieSNotwP%2F73sF8tUIBJwZ6U90AXbR7ybsmpXllRPZxf5%2BcS2RZHmx&X-Amz-Signature=c262417fe5098e1ea028ba4cb305079b447cc2e4a506c2f23539b43fd2f24b95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U73DCX2F%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIBOHtE8NErq%2F2%2FwaAwDZ%2FH4qHybjs95CBj1hMFiq2ZnrAiEAn6W5%2B%2B5JCSaFF22F5AU1m%2BwvdHSXvYCMPkcm2zBKZTQq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDHQWzM94vgIyNRwh0yrcAxTWgVYD2WT2nKDkdYycT8P1kv68LHp8BArVQ7QLsbie6rqLOMu8zNHxy9JgpJ4NTQbj9ODEG6JWiXIFTGln7ogx7GIBM5ubb4Y6u04A23133%2B0pomAW8PchYvJ707REXNrcOxDlgvVvcBM%2BQ2s3hsh4W%2FJgWN72NjOmbBH5cSgJHf3ya31uj44R3X83LCNR9ASYawR0zYl1Y9D2wgIlZP2uOFGoseVDUfXtjVGpTtRJFIf57KRCLo43YOPJfER56ospnFuaQ9ZcdXRbsAccKeurL%2F2AlMXyOFZ5hCNeYBmedr6nkl%2FTwfG3gjZ3rXJgfrMjFJVh%2FjkTzDG37dFcawYwALaVfC10RQO1SUE15sA31PswnpZ7u3TXbGZkxAm2zTDhl5q6JryUSJM%2Bl1ueIHCCMLOAW5237LWDKhOtCXzbP3WS8AXwMPjGfj3xheEC4jAnrhYlB0GweB%2BqaWtGJqu2V2MqNyWjpC0i%2FDWpbLtWVzWWUCkBUkES6fsGS1pOwoA3qUqMQzs%2FW3l9rstzvtq4Yhw11lJ4eC8AdIS8p61oXVC0Ya3V5p789l62MybnIzR0deHhRssXf7bDwur7%2BxgCikNhyIh5kWUvsMuqRzq3XBVnuUvf9ZCol5ldMK68k88GOqUBkcDXL%2BffQObpkt66tHPm1Bk6hxDu9t3RWCJzwVbfTrN76kCA7Q9M%2BxgOaTvykExg%2FCdnem12xii1pH6hZXzF20IyaQf86yeIoTAhse%2FFdTo%2F2UyF6jHYAvqT46GDm2VQoLN558jLkv3MpAIIS8tZYT2nQTllx5T6YTi1FgsusJzZ6mjtJx1rbu5C5igoOyrHtLJQsKEicJUKAP%2FmjFDM08mTJdUD&X-Amz-Signature=b3c0dd5ee2183c5ef1caaef243cdfdc9a2c1f244e59723424d9e764bc2486768&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRLWT7HV%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCzXdmCBAsSdv9WYu7wpYcd9xlpGuKdYQhskpsMdQy7cAIhAMK3IBSHuYubCTBJg%2FXnlZIfDW05ZaMjtR4lstwNmZQiKv8DCAcQABoMNjM3NDIzMTgzODA1Igy7hogQA%2FIFX0Ts%2FtMq3AP5MYWPhnqWHR535C8Vm19SUNmueXeYTmUfpfyP5UqPKr9uI6nekwWA%2BDNlUZhq2pE1YRsxrkUCu2PsYvIexuf59xrn4knHJ0MI2nonfPNHNM8wxvsfK2lxs3QWfXBdjnP4sMPgf841Pnexr8eZk6HCVbOtqWX6l%2BgOONZGewa7WO3SFpGQB7OZBHHdVxylI29L6CfhUCPCl0toE%2FLVY2zxN%2BbTvYwHKdESaS1rkFqPvR0vuNRcRajqcEpXd2a0ExnNHQAkyoAedAwJrwdw%2BywQIb6uIYoK8joYu0nbvREAR6Pg0S3kwZCyorCk0Ik6NBxh0KzWomJWCsgMfj8Uh0eTiGEcB%2F%2FrssU7jJUMThBCWILU3EXwvM9El%2F6P8SE0AE5ujdKxEJRLn57SLZ%2FAqb2pg5rNVoxf5wjzohZROBfc2sXq97XSSbS0vvnD5yB%2ByJqQp5W%2FL%2Bi8ehNAQ7%2FO9l%2FDYmmTpMe%2Bu7Lq2%2BfD5tgol7f%2BZz1w%2FMEAG8Kb0Gy7c%2FmSoXf1t2aBOi%2F2Wye8s8c%2FGJvDM%2FXsSPgDOR2W6P3WyVuEHvXShYSKlhMPbwLcv3jhJ6pSRX3udkJTrIFZd6O3dljCkmqFRTv4H7S2uJEZr4QvX3s8S4%2Fr%2FzEoSTDWuJPPBjqkAean7qEiy6D%2Buc4cKJDxWlBXNzfBCBP9MxdoZUS%2BCtRExH%2B6kbg1PREqV8yRqxsRMxYO93gekLuar9X0y95xJ0c3M8iRS0yzFaiLGSyWstYK2iw5p645Ih6GMdlbQBZ8hnnLZZ2fJXSwDC2A5N%2BSPoDlkszgnKFDPYiGXzRx42ff4uEiK6MOhyxLnTbp5%2BNaftYFoRnmyDKixYXyJ%2FujkR%2B5MM3V&X-Amz-Signature=f9e9dbcbfcce648aeb699828512713489e381fcc952e358e8dc9dc4268a02487&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DTOZFNO%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDEv1n9FryhF9tfU1S40azFDE349FwTmtDkfqyfwtGpLwIhAMRjKNnuFf8Wkl9JIxxLMETRxMOHi%2B527N71XstWGSsYKv8DCAcQABoMNjM3NDIzMTgzODA1IgyanslJMbiYd8pzE0kq3AO9RkUvhqPHjFWX%2FJSG2g20iFt4dsiVvRxz05szxL0AIRfaZ3nUX6n6NrimHSuL9cZ4Sufb%2BUpIO2QvI1Z7NsFLRTIYTLQR%2FIMx%2F0EUbBQ8Z6JBEacx6m8IgPUY%2Fm3T%2FyqjSJJDxFjKpH5DQhXcICDtXFIdG8BUxm%2BrBtfc2UgnpeFEDTIDPGsrb4%2Fz34IeFkI4%2B8NL9l8TvCHwJcMFJTI389VAgeYalljOPithcAMB1z1QU%2BXZVYiynrO40xtjswYycUC3jQaV9xp6UfD%2BNVFyAzYlSMpywdAi516wdwFTlHawsl1Eosf0aBYPZyZYoZkrDeaa3zGFeiKG%2FbfcDRyiXPRkAmeNmzgic7YzkmRG1UTRVk0fqnB0yE7vOyIViM1bZ8o%2B3C0moZN7zIgJmSx3Iax2%2Fjk%2FyjOl1WTsJD9fvDPORWURR5hM0r6zmQ4zzojgb3Yz%2F%2Fi1mX5zTtIWmeIIvolU0YH42i7o32TtGky4uoXaxO089ITPfTeW5vBSx%2BX0fg1dhLecTvm%2Brz%2BGyoR%2FvwK%2FhQMCjJUuKbSgd0hOtArMJlg%2BUPyvkBoXofLvfZ29v3C2t0OeGpDoEwD3Ix9p7uPbYhAGy%2F0KokY9bwKxDSZKbd8KfwCRd%2FvGkDDZsJPPBjqkAcwzzQ6gaQRMy0lFAsIK7OgGe0tIM8Jpvol0I2BFBu%2FvfmVMeKENImvS%2B87DWcU3ExAADin4CG%2FHhyMf0tmPa22MhAo46VCV%2FWC1jDoSh%2By86AI%2BO27%2FCD3w4%2FOkgyPKbSb9MXJ6uaqxkmI0qMm2ucPKDiwq%2BcUTcaPgBewHDmGM1tVq%2FFqJPUTf85vHLqJ7geIiZzJHdc8V22RUJtEAUm875CLw&X-Amz-Signature=9ccdc74e7ed0b27adcae1d8d59bbde84afbf51e3a0ae614c9cbd072c2c96cceb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YAOWXVX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIAamjqBVrJil6jV9zFar3e7kRKOSFzE6NESgU8dpSMjQAiBZFzwDkvuMyfVIjVHZCl9MlQ1rhzFF3nnCu24JsTCFXCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMMs71QAl%2F3WD%2BvW%2BPKtwD0A%2BHmybsAlLMNm3YQzxqOw3spB9RzPPWFlxnsJt9BuMdoIO72SB2bd31R1d%2FJ51lwvHyVVcoCFETE6RTuleFcEdbqCIPXYAifWIMX0sH%2BJA0YKMC71IbD9Xrz6cuY1XBj8vhYcv3GH9XaSC0tar2jhFVHXYSEzeVX%2F8kvburSNlfEqQED6F4UDoGLORgwEgj7PULzsCHAybhh1ID9DzFuyZyzt7F%2FeMHekNGxSETV72JVFHUrABxl7X7hJaFv%2Fh2ottAfuJS57ahCSHqQ2cXxjDalFzybR51znQH6Jeq2I2F9%2FE5qboneeJfNXYteXOd%2FeVEPfwr0idCeKV%2FK1dEFKEtNnJvU3XaDc5WytFfe84MyW04XqCMSL9OXc5YqOxEek5SOi9zpYlCWBo9Mrg%2BQXyQDYFunnWYPi6QNrv4C1X9LbkWLIB05Q1H5j4w%2BfcfkNg8ajcQgXx6ghLVN%2F9l%2FZjoBsD%2BwxYvBaoDBglvmX7cnsFDy0w8xtvxiGKDT0LYDVhwLIldSmXkGiJvd7ndbLo4W8T%2FzztFI%2BMQXlM6POdIPV44sWyeVrlaMVe5SmBv0Z7YpHtEjOrEOwA0fsZxmMRGObWTx%2Boynu%2BJSsmlAxTMbWfP3lhkIKAu%2B04w2reTzwY6pgFgEKIyzdfyT%2BrZXUZD8HG7yiNOdjzsYUtaiUMmxScuqTlo8TglsESuhnTfAEx59OY0QUTAit8iKUlETr6pId7tkcQTtLC0G6zx2PyabIDyJ9Sp22Kv1VmKGEmF84i6eYERnCrQCEv9LXTx9G1WpX8OecydVPVp6WT%2BsH%2B9wUfKq2AlF0B0gp3GkbDKYr3IarIYMKPeuJVPvAvJH8xPQQQGiIxPO3LB&X-Amz-Signature=fa0eb7c8de3a74b12bcf3a97ebd87bd19249502c3c12918c85bf2fc5a20da3e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YAOWXVX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIAamjqBVrJil6jV9zFar3e7kRKOSFzE6NESgU8dpSMjQAiBZFzwDkvuMyfVIjVHZCl9MlQ1rhzFF3nnCu24JsTCFXCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMMs71QAl%2F3WD%2BvW%2BPKtwD0A%2BHmybsAlLMNm3YQzxqOw3spB9RzPPWFlxnsJt9BuMdoIO72SB2bd31R1d%2FJ51lwvHyVVcoCFETE6RTuleFcEdbqCIPXYAifWIMX0sH%2BJA0YKMC71IbD9Xrz6cuY1XBj8vhYcv3GH9XaSC0tar2jhFVHXYSEzeVX%2F8kvburSNlfEqQED6F4UDoGLORgwEgj7PULzsCHAybhh1ID9DzFuyZyzt7F%2FeMHekNGxSETV72JVFHUrABxl7X7hJaFv%2Fh2ottAfuJS57ahCSHqQ2cXxjDalFzybR51znQH6Jeq2I2F9%2FE5qboneeJfNXYteXOd%2FeVEPfwr0idCeKV%2FK1dEFKEtNnJvU3XaDc5WytFfe84MyW04XqCMSL9OXc5YqOxEek5SOi9zpYlCWBo9Mrg%2BQXyQDYFunnWYPi6QNrv4C1X9LbkWLIB05Q1H5j4w%2BfcfkNg8ajcQgXx6ghLVN%2F9l%2FZjoBsD%2BwxYvBaoDBglvmX7cnsFDy0w8xtvxiGKDT0LYDVhwLIldSmXkGiJvd7ndbLo4W8T%2FzztFI%2BMQXlM6POdIPV44sWyeVrlaMVe5SmBv0Z7YpHtEjOrEOwA0fsZxmMRGObWTx%2Boynu%2BJSsmlAxTMbWfP3lhkIKAu%2B04w2reTzwY6pgFgEKIyzdfyT%2BrZXUZD8HG7yiNOdjzsYUtaiUMmxScuqTlo8TglsESuhnTfAEx59OY0QUTAit8iKUlETr6pId7tkcQTtLC0G6zx2PyabIDyJ9Sp22Kv1VmKGEmF84i6eYERnCrQCEv9LXTx9G1WpX8OecydVPVp6WT%2BsH%2B9wUfKq2AlF0B0gp3GkbDKYr3IarIYMKPeuJVPvAvJH8xPQQQGiIxPO3LB&X-Amz-Signature=2d2b801026fcd8b696018fba0d216b2fc53e58f00729a45751383b1476c2365c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3FNJASJ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIHE0DhrsQLxny6hLeSgnvmlDmAur9Uyc3zespbmO%2FAzZAiEA1jwoBiv6055VvqPC3xiMf%2F5FuSKsgo3g1Z7ASl7n04Eq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDIxNMq%2FrcOb2qTuseircA%2Fcl4BwKbMK8iJ8iiyBNsvW%2BfegOwk76zqOXD6f9%2BPPSq2zPuUc6AnxhMBfQs9Ik4wn0f8DZQbu3qPmMzw%2FVlrMdfv5lopqEWtTQHYhmFtZxkxG%2BFN2Sv0tHLjLywPaFtImxYbd2FDAt8zNGi101LkHSnJ%2FIk7vC6Kiow0Bb870z3pqfV2hk1ODBedLTq%2B3anWzwWaOuuQz1NlzKnquhen8%2Bi8b12ZKQMnFXQUAaHoreiA2X%2Fj8tgIpvD5TpST7vCkO6Gyv2uRYKlRaaKttZgZIZmzpfczjRQfUabNDoF2FxoyBENkSNOOg8lEfaB4LJ5khNEytPobEgTdP8GYOkkXad7m8PPbfou6jIWhDwVbJzPXAXmtc5wE9R9CuUSZsYa2AdyuSRji3zw6hYGyLnle5OMmMe1wtLol51%2BcDFPUiW5Dr1e6M3DCwBJK7IYMEpSstt3kufR4PylIk21MJiNfAnpO7kwh3o2VNOIioPVZ9ephdGC%2BXR2aC5YrZOacbac%2F%2FuQi7cDr9nL2YlsY2W6OVbPY6YQkQDS2Z6SOwVSDRVjN1I4QaDOn9tObqbwCL0wc%2BBD531C4D88V%2F%2FZVsktrCpHyulLdUzY51XpMhemHDdBrs%2BlFIgZHB3qsQ7MMO6k88GOqUBAFqDkuj1o6p5P4Cv0AlOGX4UhvBAObopySN4p53D1r7jf%2BzhuTnp8mZUOZ8qEF4bjWLUuTCpr%2FisXFk3bI4q4TMK5xYJAX%2BhFloK8AgWMnSvnOnms4fGwpmEKi9eLMoDwvrY4hp%2FujXkpmhXJxhLsmezbi85oxeFysDXKqxQVJWQWzcKaPxe30qcXGBkG23tycDGbEVMjD1gLxmsxWop2MInDppD&X-Amz-Signature=2fe24e1d0a8d33ff33ec8c20450a34692fe75f8332e1e17fcb349f6310d85afd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSZJQUZT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDTG%2FU7t321jVtrT7UUhBI9hwtQ%2B7flNEEJFo2BJGIOCAIgRJ16yemW8eUjI7ZOeSGVEl0fddLKtm0X2pDxki1QjWYq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDFWVcuzfeAvtNxjRiSrcA1oI2U9mG51CkJ%2B5oGeuHZFWHznZ8N22ztQCdTL%2Fvmr5KEA%2FxIUOvVZElOgsNsqtA9YbPuw%2Fn2UIbwnt4efbC2AnxetyMntdfC7STrOMS2vooW6P24cgQeXTc7s5UVn7ODpxVnpDyWdiNgW4tKm6xebQSnpPYHwqSHdEeXMy6lBv0%2Foy5GE%2FOfZyvHqpnGuLv13%2BPpvqnkPh8mHLjmtacZUJQ0gAWAQJzPcIvPceqd0zY1sfBFJF3VawQg52h3FMrcCRRD9T9Rn6wVEtWjeoxgvDi52C3ZEel1dQzkRwzVFd9%2F%2BHohXQNOoL6dPtw3RHwPOTuS2lvoGckeUIKBmege%2Bdbfzmn6oAyeiJv%2FFV%2FtRAAymyYIw%2BVjpEFOom7QOtVDz99sKXFatFEivuB4KJG8chGSpfkeY8c05DWrX2ryFJEFv%2BVI73SV9gy58TxgzFOVU%2BNiHbDIdJSHd9AvyzowLxRpfa2Ui%2FR7xr6bOwUnq5MCjWWO9JheAkNKbz3pzinoQcv15Zkj96BSLcLHcshukBICLuAVzwdbLUOUsfPl%2BIvpvR4agkkqbh3idwklK2Y6sNjs8%2FkkaBVTJvmQDHghzWgBvbJ%2B0Upv1WeBND2LCFTahJo0S63PG%2B6gjhMI%2B2k88GOqUB4XziIasNkYHyBlrBus1jHTu%2BQ9VBOEkxrBARuuKp4sYjdoQRwtRgAicLErlyhDAIZDLGOlug9wLzyI5Zw%2FWZZ4X6oapDMbuCS%2FKZRl27dS5Fns2Ncg7%2F3%2BFm7VaOQdZSZMXxEp%2FyRRvt7YmnJFVDPor3OhKFD%2FnYxKm2JhUzectM9GpaocLMhVnfY6re20x92W83uUwaS9rG18aUd1IY449J02bp&X-Amz-Signature=ff99855b6b573b3920020d997c16f951e2fb2f9d25d54751ed0f1b03f184c79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSZJQUZT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDTG%2FU7t321jVtrT7UUhBI9hwtQ%2B7flNEEJFo2BJGIOCAIgRJ16yemW8eUjI7ZOeSGVEl0fddLKtm0X2pDxki1QjWYq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDFWVcuzfeAvtNxjRiSrcA1oI2U9mG51CkJ%2B5oGeuHZFWHznZ8N22ztQCdTL%2Fvmr5KEA%2FxIUOvVZElOgsNsqtA9YbPuw%2Fn2UIbwnt4efbC2AnxetyMntdfC7STrOMS2vooW6P24cgQeXTc7s5UVn7ODpxVnpDyWdiNgW4tKm6xebQSnpPYHwqSHdEeXMy6lBv0%2Foy5GE%2FOfZyvHqpnGuLv13%2BPpvqnkPh8mHLjmtacZUJQ0gAWAQJzPcIvPceqd0zY1sfBFJF3VawQg52h3FMrcCRRD9T9Rn6wVEtWjeoxgvDi52C3ZEel1dQzkRwzVFd9%2F%2BHohXQNOoL6dPtw3RHwPOTuS2lvoGckeUIKBmege%2Bdbfzmn6oAyeiJv%2FFV%2FtRAAymyYIw%2BVjpEFOom7QOtVDz99sKXFatFEivuB4KJG8chGSpfkeY8c05DWrX2ryFJEFv%2BVI73SV9gy58TxgzFOVU%2BNiHbDIdJSHd9AvyzowLxRpfa2Ui%2FR7xr6bOwUnq5MCjWWO9JheAkNKbz3pzinoQcv15Zkj96BSLcLHcshukBICLuAVzwdbLUOUsfPl%2BIvpvR4agkkqbh3idwklK2Y6sNjs8%2FkkaBVTJvmQDHghzWgBvbJ%2B0Upv1WeBND2LCFTahJo0S63PG%2B6gjhMI%2B2k88GOqUB4XziIasNkYHyBlrBus1jHTu%2BQ9VBOEkxrBARuuKp4sYjdoQRwtRgAicLErlyhDAIZDLGOlug9wLzyI5Zw%2FWZZ4X6oapDMbuCS%2FKZRl27dS5Fns2Ncg7%2F3%2BFm7VaOQdZSZMXxEp%2FyRRvt7YmnJFVDPor3OhKFD%2FnYxKm2JhUzectM9GpaocLMhVnfY6re20x92W83uUwaS9rG18aUd1IY449J02bp&X-Amz-Signature=ff99855b6b573b3920020d997c16f951e2fb2f9d25d54751ed0f1b03f184c79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFBHNHEA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T143052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFJz3JLmPNVJie15dc5sYvFYVGKavR8n8TEEVS4vW36uAiEA2sLYcMeSJ%2B4P2R6F8ia%2BDoceWcNP2kzJZRnS0up0pQEq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDBKD1jDObG1ebVc3%2FircAytnOQe2NQHkX6%2BRWh2%2Bo3yAJ9CvmQMpOpBIXDvOpOnc5HargZw4LK1zfllNSrL18xi6gJ8vub5%2B1h0pKIccXnLifYn7nFFGX%2Bglu6eB0lR8K91ZzEaJNqUTurmchC7EwqEIbQm%2BgMP%2F%2BEfIv1PATO6dgZl9jAGAKGXq6lq353%2BAPxvYjAPPQUytHiCCvu9x%2FML%2FkEGt28JVf%2BwiMk7asIncnBPGaKifqxhdtvYfYafl1EnLeBDURYyks%2Fa1e3%2FQTrJaY0yTPI8sAvMX62MdQQ4egFV%2BFA30zj%2FBN9Z4f9hw0qb1CeEZKda%2Bcs6ArTf8cEnFwym4xLBPYsE490hszLt7U7MgFo9tkOuzE8Vw4iH90wVKPMaVnEIBSCdPHKY7NaGYvpSwOmm6LZvFLcQyePBrxOxBqzaPOFgmNZZzDVTF73o6GMw7faG82Khd5JdkDyJ2Rvpt%2FlzLRZhwJleOCweBDzOdeWEVGRzCd4IEYsjwz6y7YBcdH9hfWt9bszaC9C2vG1Ie04Ov1dJr9II1ojlJ81P4d2GGbY0nBS%2BKsQE3KODELgO6iVFjRE6mYzyQgpprOkImwzM5iwy78R5y5VF%2B51PKDjmHyDQgXjUXL%2BEGsSfcSXDRsePfUeuJMIiwk88GOqUBkAAtGYe9zpmYDeoNN8YOSXeLG1MJo0XStL72an95WEG68Kzcx2lWCRB79UZtQDVO6JrPcdIYsLLqkDWQFc5vGW%2B7PazXICpbqYFfqrGL5ZYSbVymO%2BuvFkFlymzpk4KYrTtYpbRLdHsEWTpMnE7qyl6A5%2BLSJcjvmdbhieky2NSK7OhCH%2Bl64%2FFAKE6Qby3YBGkHjXEBVdJJuSTgKSL80qoHgzIO&X-Amz-Signature=629d3ed94b4b5d778c5e838f7743b3470638fbb76e86151c157ad9c08d0b0c2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


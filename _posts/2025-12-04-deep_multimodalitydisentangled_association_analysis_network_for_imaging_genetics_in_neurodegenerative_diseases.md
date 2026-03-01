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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JLEDB32%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDX4GaBZE1ZkVx4X2N739yrTGZdyAX19lXdvenDd2zUJAIhAOohj2rQ4gOjKfhun56MwEz%2BkBH%2FKlkBU5rIJyfzhXjRKv8DCHcQABoMNjM3NDIzMTgzODA1IgzFWYRQaaf42KX%2BK2Eq3AMYlmUK2myeAEFS5N6h%2BTjwZ8xuNGBpy7xgy07SRM8y%2BABkyZHcsYLnQOQZGs8jD2csbG%2FLFhkZbVBqn3sN99KYEzqJwxm5CESSiB0f8yzqo5cEcejSNY0HA5zJedpqfgEe4YEZqHaz2fD6A5jFLTqRyAIpmyCgHlx3KCHDrTiYI2%2BKm7Mo1qUdwhRFi9Nk0CRLakt7JD6eMD6aSIi%2BKp5a5nA%2F93Rht11LbHCA6XkTmiPP8c53bRI1LjAOJQlkTSa4yGGJAs7vsP9TvsxQw%2BnBnWwt16CMNKWX7G4vtUt5v3Wawcl9STl1%2BnlWT9P%2BVc0FOLfGiTAju5%2FckFSZ7hBV%2BSk9wc3LixnoCFGJglp%2FrVmSm5n7NW9SJYhPu0rlAoaQR74p%2BZDr%2FhVoMek5lEXsbNjWwwACZKIIat6nZ7pSoWbmhSlNQcvcpBqhenf5pXcRHmf9XWzeISzqgKa4BLydeIBK8DIF9KtAuBYvkhkS8m39WjQzjEnrI04Ld%2BHT59xc8Wc6xC6fjDlShrTzXCa71TtQA%2BNMbp1mC5qoGLH1SbHHaXink1BwbOIYVtIrBDGlOV2Jh0HF5VpxaMX%2FszaBZ3ILg2VMzJ2eoNWbDPlSCzWhhYEIvncQyTFe8TDZ45LNBjqkAf8bfqEO2RhmHV4%2FQfaREoYDbBYBF1QU%2FvvFOMlFSnh6BDPs437%2BGY62NW98Yx6y1MeO%2FBq0twdbeeo2ScKVLkcyO%2FkgF5aGIiAcArBT8GAGjvR2T84Kma7EMpVoUY87pY8MNh63FDtd3poTbNLGzTRmUjvlLJP7o0rjZZtL0qpDYefzuZjzu%2FqGhrXya%2F6UUw1KYVnzJGNr1cm1T%2FVf5YV6tDOx&X-Amz-Signature=70f2df8460215d5ab44a195e707f8b133686bd859436e60e9490a4150eb11d06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JLEDB32%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDX4GaBZE1ZkVx4X2N739yrTGZdyAX19lXdvenDd2zUJAIhAOohj2rQ4gOjKfhun56MwEz%2BkBH%2FKlkBU5rIJyfzhXjRKv8DCHcQABoMNjM3NDIzMTgzODA1IgzFWYRQaaf42KX%2BK2Eq3AMYlmUK2myeAEFS5N6h%2BTjwZ8xuNGBpy7xgy07SRM8y%2BABkyZHcsYLnQOQZGs8jD2csbG%2FLFhkZbVBqn3sN99KYEzqJwxm5CESSiB0f8yzqo5cEcejSNY0HA5zJedpqfgEe4YEZqHaz2fD6A5jFLTqRyAIpmyCgHlx3KCHDrTiYI2%2BKm7Mo1qUdwhRFi9Nk0CRLakt7JD6eMD6aSIi%2BKp5a5nA%2F93Rht11LbHCA6XkTmiPP8c53bRI1LjAOJQlkTSa4yGGJAs7vsP9TvsxQw%2BnBnWwt16CMNKWX7G4vtUt5v3Wawcl9STl1%2BnlWT9P%2BVc0FOLfGiTAju5%2FckFSZ7hBV%2BSk9wc3LixnoCFGJglp%2FrVmSm5n7NW9SJYhPu0rlAoaQR74p%2BZDr%2FhVoMek5lEXsbNjWwwACZKIIat6nZ7pSoWbmhSlNQcvcpBqhenf5pXcRHmf9XWzeISzqgKa4BLydeIBK8DIF9KtAuBYvkhkS8m39WjQzjEnrI04Ld%2BHT59xc8Wc6xC6fjDlShrTzXCa71TtQA%2BNMbp1mC5qoGLH1SbHHaXink1BwbOIYVtIrBDGlOV2Jh0HF5VpxaMX%2FszaBZ3ILg2VMzJ2eoNWbDPlSCzWhhYEIvncQyTFe8TDZ45LNBjqkAf8bfqEO2RhmHV4%2FQfaREoYDbBYBF1QU%2FvvFOMlFSnh6BDPs437%2BGY62NW98Yx6y1MeO%2FBq0twdbeeo2ScKVLkcyO%2FkgF5aGIiAcArBT8GAGjvR2T84Kma7EMpVoUY87pY8MNh63FDtd3poTbNLGzTRmUjvlLJP7o0rjZZtL0qpDYefzuZjzu%2FqGhrXya%2F6UUw1KYVnzJGNr1cm1T%2FVf5YV6tDOx&X-Amz-Signature=70f2df8460215d5ab44a195e707f8b133686bd859436e60e9490a4150eb11d06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XDVROMY%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGl5QfhZEgdqVOL6KOwQqcJ68eW%2FAwSf55d3XsDL1ByMAiEA3bM0ZtMGyKqX1bYuDo9dNCVzUzLVnWDWdGcipatSg2Iq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDBm9fOTZg7yUnugGPyrcA2vXSyNu6JnTmG2h1Zbdnt%2FoeazT7MI76%2Fc7BbnKIpJIUIbncyMy4SNZLcgLWDzmhk4fZW6eniJptbqZJKyLzvNmt2BQOCQvP1D2E5DQs9npP9XNehl2bHMr%2F%2FRUamBfzFxqOI2InJsGfVdpU1sDeeOG7%2BC0uWGyw4wi9qhv4IgaxNlIz1wTjfEYnjQKBdtqhfrGSegBJp3OnJYk7g0j0TGDHv%2BuHSzv5vJ%2FIuROyE28LSqOsjI41ftIREW3L7Iz6qgqaULHVg%2B%2FKPzKPmo54moAEAGedr20C6QpMMCmR54iDhpkzeXQ%2FtCN4COkjrXD39ZtcFrvqM9FSnQXmzIYo9n8ivserttKFREag0V%2FvYz29bxz45UxaLGN3PzFF7Lj59mnWWnY7QTHfiho17jj72GNIoeJb2sIgeLCmjZFwcOYKM1TAW6Zj1X%2BLMouIr06muw6LvWpyZSEYOP1SeabhbYVTk3jqtDofvHxR3IJmqYq%2Bb%2BvkwLNiyOyG86ATpMWpsDJTD4Ar6F%2FbEpz70Cldln%2FKqsEq25yS9peEK8Tn9Y3xoXAAYk%2FiGQOLK6jllLv8yIFVloydwv92RYRFfS2DcHbjFXJpZHBl5BTNapBYzgXVesBm608eHKjQAPNMM%2Fjks0GOqUB1I6um3fKM5vfNjH6YSWVko26sTNzabr1YEeWpx4tTFwWqGV7bWRQu4VWZILyIFvKA38FIVbluonfjQMz2Pi4n8QJD0%2FymXRho4bk8pfuWxNjf%2FUOrl%2B%2FegIHwiJeNzJQzKt1P97uf6LBNAHgHHZn4jcrHf3R4D8xVtezrGOLaoD6dtGuzrzCVBavpJ5kQ0u9gGdyWVygnUPEviyrzJDescR6VeKe&X-Amz-Signature=d464038de0708392e8fb70e5012dbda9ad68212e95479847d29cc3ad6dac8f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2D5I37I%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDpiyaUj8Fkn6HBLo%2F95MHPP4P6VOT%2BfQZraIq0HJcmkAIhALp2AWer4aE%2FGhiatnkheK7R7KqhV%2BJg9HmGHNpwLfNcKv8DCHcQABoMNjM3NDIzMTgzODA1IgzgEargnje7OhC6v6cq3APAoKGwkcSmBihyKiuPs3zjiVqIyZDZtrYFb4q%2FwFgXbuKDcXb02uz2%2BhPWli4%2FZS5EQUWnC1y0MJEWYG2C9f4cJIc5%2FSUHJDWgxnx75iTDTN2YOBOHUF7%2Bhgwz40v5dch%2FjC5nqHFqba%2F0Dh9LtbXwkrQmwhJHcS5vUa77cmuHdCVpuJgn6rVnGcIp6UwgT8npXm9OZ11HADdEMvTdy4fsPzxUfkhBG1H8KF6Ft9VgJPHl6%2FnylM1OAnqIMv4WUkFfwTH6RheC%2Fx76wphdG45gFN6thGWCvB8H%2FqN6EGwEeqeYnxxHDom%2FbyPk5jDSvKBvU%2BpilPUWnrOKbLxlHKj7sx8Kbm2ubfDSUOfB8B1peygys35YIkd7uB5gQtQ9x8VME4%2FgJZTvch0Z2TSOQGLIr4re4h7%2BiHZguSTm%2BLW9xR3X0%2BYTZ67UeyTnUty5qUQUBJZ3YBLC5%2BRjUwDStD3bwiLI%2F%2F0KYu0KvrpdsP%2FzGAQR2LOUyycpwTQojRKzV6UHBVwbB7SRBv3dNlR9W%2FQ231lyoc0PfayUcFw7PSM5JPwfVSim9CnZeNB5FJGm3AbaZdi8i1X0bHOdKr9EqPgmz9qDp8g1pba9BUmuZMjxVQ2a3ZGDZv9jHK%2BLBDD945LNBjqkAaGQeeR4WsJ1rsurE4S4oYRB2G2BIFTt4ViwKg4BXvz8%2FT02ouS9ekHrNQBUEbPvOb5SQv0QUO%2Fi6OLU38xDvZ67I0WXfxn1eiZezf%2BFfJapgm%2BkRo85BE2VdwIBIyoRxE1EYlLNqyW0oS9%2BMGUDhQmyCx%2BxNgnyloiHR2ECyxgQUf%2BSf7VM6tLOGpUkNmI9dh0hHHCWiJXmFEpM9AivI63uZ8fE&X-Amz-Signature=b4484c4ff2197a4c50b6c5e8e3466bff6b0d293fc5a3f2a8d52471d656397906&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2D5I37I%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDpiyaUj8Fkn6HBLo%2F95MHPP4P6VOT%2BfQZraIq0HJcmkAIhALp2AWer4aE%2FGhiatnkheK7R7KqhV%2BJg9HmGHNpwLfNcKv8DCHcQABoMNjM3NDIzMTgzODA1IgzgEargnje7OhC6v6cq3APAoKGwkcSmBihyKiuPs3zjiVqIyZDZtrYFb4q%2FwFgXbuKDcXb02uz2%2BhPWli4%2FZS5EQUWnC1y0MJEWYG2C9f4cJIc5%2FSUHJDWgxnx75iTDTN2YOBOHUF7%2Bhgwz40v5dch%2FjC5nqHFqba%2F0Dh9LtbXwkrQmwhJHcS5vUa77cmuHdCVpuJgn6rVnGcIp6UwgT8npXm9OZ11HADdEMvTdy4fsPzxUfkhBG1H8KF6Ft9VgJPHl6%2FnylM1OAnqIMv4WUkFfwTH6RheC%2Fx76wphdG45gFN6thGWCvB8H%2FqN6EGwEeqeYnxxHDom%2FbyPk5jDSvKBvU%2BpilPUWnrOKbLxlHKj7sx8Kbm2ubfDSUOfB8B1peygys35YIkd7uB5gQtQ9x8VME4%2FgJZTvch0Z2TSOQGLIr4re4h7%2BiHZguSTm%2BLW9xR3X0%2BYTZ67UeyTnUty5qUQUBJZ3YBLC5%2BRjUwDStD3bwiLI%2F%2F0KYu0KvrpdsP%2FzGAQR2LOUyycpwTQojRKzV6UHBVwbB7SRBv3dNlR9W%2FQ231lyoc0PfayUcFw7PSM5JPwfVSim9CnZeNB5FJGm3AbaZdi8i1X0bHOdKr9EqPgmz9qDp8g1pba9BUmuZMjxVQ2a3ZGDZv9jHK%2BLBDD945LNBjqkAaGQeeR4WsJ1rsurE4S4oYRB2G2BIFTt4ViwKg4BXvz8%2FT02ouS9ekHrNQBUEbPvOb5SQv0QUO%2Fi6OLU38xDvZ67I0WXfxn1eiZezf%2BFfJapgm%2BkRo85BE2VdwIBIyoRxE1EYlLNqyW0oS9%2BMGUDhQmyCx%2BxNgnyloiHR2ECyxgQUf%2BSf7VM6tLOGpUkNmI9dh0hHHCWiJXmFEpM9AivI63uZ8fE&X-Amz-Signature=0977873c73c05f8b14bb00c277e6ab5aaf9a35d99327731b7859077fbe9cc0ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Q57N7QA%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICx%2BfVBzk5UzlnLdspeUM%2Bf8vdNocxk7RrIAOPPEH%2BB5AiBvsolATEpdWOU2jNJrP%2BPn476inayG49BEin%2Bd71Jx7yr%2FAwh3EAAaDDYzNzQyMzE4MzgwNSIMP1b3ghbSBOo8eHFHKtwDnd8qUsKtEX5loNoOsLfHFGmgeKZvXW1uY1fZrewl%2BwR9x5WMisO14c3JrWt4ZvBFFW%2BG0XsXAsJ4o0GmlKiNlN%2BYdXfzvbo8SajdU%2BCOOvSjrTqw%2BZsaOYlZeAkdvM2d4oxWZJOtEifNGh3J1UqnuhtQAqHAhCPBUyIbG8SobaIFFmk7jqt2Q%2Bms1UUL3FcvZ34fymHxDCZl7XWrjlumnQrZGALg9Whr7xjb0nT6oKlsuB%2FYyaPfeGylT2huQRPaDmgWO3RyY6GhZpiXYT5KF944u6AW5NJJSTqnW9j%2FgPfPrw%2FyiBVXtLnsISGXMOMdGbJ%2F0tDyfngOzg%2B1we1HyOnGV6rNmgsm%2F5tdI3FXpheepyPyp9rB%2FypSpGoHtPrZlv8SwwAWROyDbDCQ1j3kks2jAfy%2BqgLZa92hCKozXvWsdNBHfczW0AqbbSe5ZvbVA8QW2v0XPDQnNOUxzqZTbp3NY9ruT3OrTbtrBgF0u%2B%2F6Mweobla8wQSFH4xs4nRpZmKRarBpWgaXLbHqSFbOYUDukJ3KfCSVgfAILcQe4vldTBFjP9fy3rmYr4Zd5ePNx%2FkzOTeEqa7E%2FeiyakUwKmd4f3VesYs1xB5yoUWkQCU51CQlg0%2Fpf2o%2F8Fowz%2BOSzQY6pgFJqh1J6Yh4QS0Ho0fU%2Fz0s7DEFKBBUg9DOZZik%2B8YuOc%2B6AylTgXJ0Jc7k94bdOQzjTOaBvdDXIh8naSdbiFY6RPiA6sBw1fvPwP0dZAoEnyRcTrZHI3lzzYlcDmBGAihiCECwB3ZdVLAlVbrD5HsckXlQJ%2BlHuP7%2BjSZNiYQE71PYz%2FmfjqBmHB%2FS4V8iZNwZKMlfJo3p43fupfMxX9C9%2BORz9wm4&X-Amz-Signature=ad5351c5448def9e6aff881cb382154926d0daffc90b3086956d1a2709670c1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663B34CZJ2%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHy4XoPwhrKJq8DQCQlvLHtG745u28EttdUsLGz3KgrSAiEA776hcBmiraIN2%2BXuIf%2B4hhP21pp7K9igiwz%2BZQi9XGoq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDFoPI8Z7IxQ2r2aTuCrcA7ld6ckg06yeICzLQgG6Js4fA1V%2B6SsgpZ1e8PlmYjtPZYrFswo%2FHAgXqUCXoYJPj1cnY5EBRt3q78hHCNxtA%2F44nVq4N9PGI%2BDkB73B3JIaCwFHTo72fRCQOVNf7IUYolXNoaxJ1eJXy2Ger974aViIl15idedUlLf7hpmaaNkISoeWfp%2FSCVMLFPa245u9DDwQjuJ3x0eBChfUuAMfb%2F7Vh3O%2Fpg670GmY1UGeWPzGyuewj7%2Bh8%2Bqk84Fn1esdrXoG4qBpeYvYXGTUr3k%2BkUXeySajP1WK6jP1eC0JmhjUp4vxl5jsylpavMukeF31FnABx6nz%2FB0vzlEsGVBwY%2F8OcVnMXZdSGDM%2BOazrBl3JACQJ1IJanGz71SuZ8BmBxjaGZAvbdk1XlR%2BDpLmA2GxsPAo9kGnAJAHf3QKHtSLaJ49rOtX1MyLW1GaNm7PUyliAhtMFdZOwfwklzs%2FbkchCyBnyh3nijAg%2FogBu0g52vxULDXUNOHnE8nvcYlR9dBiTtWtdAR617H34vHZ7%2FgDn6BTEibd5i6r9g%2Blv62wk7Ksr9d5wAIvsYaaAlvyC1m97rAkEn7%2BFJNXCUhQ4MzjIEoYBBWkd7V4rirPkSti2vjIQ9vv7N%2BD5qikFML3jks0GOqUBNGEeq4aiG1csAHkFYhBdP0PccpEby3DEZ1xIFlcavUt57M604Un0X3Z%2F1vNex3LCf%2BPkHBL5onGjud9Qrz1bR4%2BeRStAeZVJHYhMhFzY%2FaZZYWhiJDa60APjQrrDs7ELTRXVDQd7mBku7tiTagLgf8VgCrpBQpzWvnJNbjsqq%2Bge%2Fh7DHimT3l4QiFxz6IHgrgzg%2FOpq9TSEU0iBg9gkgOAaB09o&X-Amz-Signature=6be9b5eea97b9b1e9c58446425832af7b862c90ecbd47791761e186aafe0b760&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFX76DRH%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCOQgCp06BHhGeuOpKhIZEuW3ROwssA7fL8H%2B3QDiN6iAIgVx5W8bjRgE5UESrvn60z7MOvZeCpA7tvmDrgWpCOanQq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDO5PwkollQHKDNzpUyrcA%2FYLp5GlVWpP0YMG1QUEAyGNNuEDuHML8nOfrkuZsg97%2F%2BgZaDSlbKw4gBPwOvetOk4YSvBfy26ImKpPrkD5UwzLOoZsqykJcIFzOG8RcQddytiQi0BQQr0TnJUNzCIr98y%2FMCpqlTWTNq%2B6faW%2Bm%2Bs1H3xggmu5oB%2BdnDIIA%2FWIItqVfEUI3Vnj218a6ySOFLlcbZFhiVGuDCMe3Z79yUO6kouIXZnCJ8eyd9Y9cbVzFAczkV4H6gzRF0frDkGpLP7W8PpvXf9eNRUD0MRcfkhL2mMwtLv8wjm%2B5s8Otsg7VnrUr7ESLkU7yBu5CMnvKGE0vVAi8hJdMO9WNXW5j5yy01BxwEFiw%2F1d6w6cvx2OYf2DUerkZyFMHsuZFFovBdcT79CbeV%2FNNDS3mvm1QJHHeSxTeicL1Mw8IueKzNYQDLuXLM85hmiquGbXIuTgKmj2%2F2NloFnVniYLiwOL8vojL3DRSwdsKmmwjwSMFk5B4eTegAlwSpvjvugwNszw7fU5XurT3CgFYSy5yI3NvVK%2Fo43i2uEW1KkiPCipVe7HIC89%2BSwKIrYdNIQI8VgGHfQUGHeiaW1zhdQi6pxVoC%2BlhnGOGEKpIN8sH4JwMyFEEzApBPhQlNHBWte4MJzjks0GOqUBjthC4kdjhsw%2FBJ3bvRPs08X6k%2FtX3LPQ9BwEacnUR0%2Bb%2BBMOIaHjIA4dtlEwQtcrwGRxkexx4waKjhQnTSnJ28qKF591YQSyU4%2BCc%2F34yoxo%2FROpvHw9DSu%2FDOp660ms2rschdBsNHrwKOejhDIA842%2BJSBHr%2FuYA3TZZgmryRqhuP%2F4Mf0IqN1M%2FpBvfWFb2Y5PP6fFClepYwwEarFFH3tBqA%2BN&X-Amz-Signature=fda30b547431a2067271020ea41d6dee9104c9b4b0793aaa5941dc7da45613f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656Y2VPQB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnSzFtNkC2%2FEGn6s3dZvSar0CyeqBT6cEpyZ9birvl%2FwIgKy8xP3vMgVhw0i5LH4Y6%2F2%2BTfqSPiHO%2FE9J34yO%2BzrQq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDLeoEIfaHo8z9jN02SrcA8fTwG2pTPddYHtTYj68YSD0fk%2B0mczDDh%2FiFATUFGcR5O9vexap3FMWnBQ8gKdF6tt2jXe%2FyMMb1MDj8vNHMZJfxwcINdbiZS2%2BhuOBA93MoNr3OI9gQx7z9Tiq56ZazAMW%2BjWSJ4hpcerjB9t5dUSrZ0cqmEfx6qyMhV4T1CrnC%2B%2BobBWF7PzaBhQJOZk2ruSW1wnY8vSSlTST%2B0lPEaZkqiZ%2BQC%2FUpHTERRDGNkpQK%2FxrMdqxJDCglEdT9b4j1Y%2BVcYb1Gje3ENqvPJcqHMliPzhP3VShx7kuxuwPoE6fgauhsng9zbLJp9Y8r5JQ6p%2FW7UqLhYZRdBjW1X2RJI2Fl4SP1hZ7uISOKUY%2Ffo3UJRjWeKmYxWfO%2BfLv6ANbOVQA8QkGKXkYyhqkQX6ik6TU8BlhR8emV90VERL9esbnkEBUpBF0uEZExFARR47KKiMY%2BlfzqrJRXtMBVhDciJ4M9aj3ySzbnIXcqR3cUHOZQPyU2q3oPQkrB6h3gBVyijxiQCsD2h9jgpHZzPd22hv3dMT9bjNlrrBGN1EdmPX5vcwk7X2JdIMyJXEK0w9S7fr0bY1ra0KQyLVDIYOuT4%2FRXysDvotvu4SgLULYE6ZKVEhq8mY18bhwR5tHMN%2Fkks0GOqUByBIzQTE6TjWlHDfr8jtVpDywvW%2B%2FCpUe%2FawFiy8G8whMUD%2FZkgTYfFX3YP2Vkoq3HC%2FpgvpG0uPQiaBHpnraBjxaI0Wo51kuAOTDVrplXvriNF39gtdstV68DnV%2FpO%2FFjFlLFJjKax5qbLCYBp8urioeuXotew2wv2%2FWHWqHvrCb4dT0ZYuSULfHoD0k1NirMJ21m3VaLDUMRSQRZjF7qu0ecAJX&X-Amz-Signature=5bb2ded5a5dbc0a2304785d6d256d135deed7a6b08f57c14f0a6e99259ec566b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656Y2VPQB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnSzFtNkC2%2FEGn6s3dZvSar0CyeqBT6cEpyZ9birvl%2FwIgKy8xP3vMgVhw0i5LH4Y6%2F2%2BTfqSPiHO%2FE9J34yO%2BzrQq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDLeoEIfaHo8z9jN02SrcA8fTwG2pTPddYHtTYj68YSD0fk%2B0mczDDh%2FiFATUFGcR5O9vexap3FMWnBQ8gKdF6tt2jXe%2FyMMb1MDj8vNHMZJfxwcINdbiZS2%2BhuOBA93MoNr3OI9gQx7z9Tiq56ZazAMW%2BjWSJ4hpcerjB9t5dUSrZ0cqmEfx6qyMhV4T1CrnC%2B%2BobBWF7PzaBhQJOZk2ruSW1wnY8vSSlTST%2B0lPEaZkqiZ%2BQC%2FUpHTERRDGNkpQK%2FxrMdqxJDCglEdT9b4j1Y%2BVcYb1Gje3ENqvPJcqHMliPzhP3VShx7kuxuwPoE6fgauhsng9zbLJp9Y8r5JQ6p%2FW7UqLhYZRdBjW1X2RJI2Fl4SP1hZ7uISOKUY%2Ffo3UJRjWeKmYxWfO%2BfLv6ANbOVQA8QkGKXkYyhqkQX6ik6TU8BlhR8emV90VERL9esbnkEBUpBF0uEZExFARR47KKiMY%2BlfzqrJRXtMBVhDciJ4M9aj3ySzbnIXcqR3cUHOZQPyU2q3oPQkrB6h3gBVyijxiQCsD2h9jgpHZzPd22hv3dMT9bjNlrrBGN1EdmPX5vcwk7X2JdIMyJXEK0w9S7fr0bY1ra0KQyLVDIYOuT4%2FRXysDvotvu4SgLULYE6ZKVEhq8mY18bhwR5tHMN%2Fkks0GOqUByBIzQTE6TjWlHDfr8jtVpDywvW%2B%2FCpUe%2FawFiy8G8whMUD%2FZkgTYfFX3YP2Vkoq3HC%2FpgvpG0uPQiaBHpnraBjxaI0Wo51kuAOTDVrplXvriNF39gtdstV68DnV%2FpO%2FFjFlLFJjKax5qbLCYBp8urioeuXotew2wv2%2FWHWqHvrCb4dT0ZYuSULfHoD0k1NirMJ21m3VaLDUMRSQRZjF7qu0ecAJX&X-Amz-Signature=04ea5a59ae15f879a1e37f76dd2f0d4a21452e687bf08bfd38bda41ae4d7973d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6UV5MNU%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICooZTdjPRxE2QSw6IQDi0rtQX0GWDWJIyx4UFnb4d2AAiAvpyxjC3fcNXiTg%2BZ1zk3jlH86GMFwQ4HM07adZSUW7yr%2FAwh3EAAaDDYzNzQyMzE4MzgwNSIM4QGzeUM7a7tWw46FKtwD3bOX9wj0WK0OL1s%2FUO5QPHZxnM8hvLRIAvXajtwDn7ErPKBRaqT%2BwrMjbp4ggv7LQs7Kw5wHtzChPuQYBAI42aLluz2jJlsX1QO1KQgoWJAPNEjj%2BWYpMhMEvp3lKd0A6XFrqqEBaMWbMKyeVV6COq0d6HvYuCgmwjgD%2Bb5Fw3jDPXhCpunXCccXTiL2cGzWAfr%2B%2F4HS%2BjaenPIYmVE%2FQdk4XDx2dGaMLO04yvw8LYfGWWrH5AAbQxZbxsvuG%2FnSpIgN%2F%2BLPkE4WtAULzUNY%2BDedA5yIkUWhvte0%2FYzcBawkxLng%2FWuMgBVpICGo17lu6Qs%2B8zmbQuWWgzJNCfNRqrjjveCgExftv2ATTXkxQaOi8DKOFHU4qkxUxCMWoIm67gcujQPXALJ8R%2BNLYpDje5eXhHCGaXqs9%2BkBVHsWOFkuEPDWkrZ%2FcgKUqAqluKd3kTwGTCjoqADX%2BUzpXzmFntizErySolRqcoqqryXHFtF1mZAgcYGFmu76FG9Jk2Y%2B3va9RAFA%2F3O7K71SjRrvUcRzj4%2F7fIhhKEW41jvm6qqz6sf9jTONR4tdcQkWgEERbrnyelDJpQapdDINzWug%2BccPyH%2F6FracK90uJygUok%2F2DGHIiOV2bJ2FQHYwruOSzQY6pgFOWNp0iOUGdge%2BMhnQyiyMVm6h1fcQcJAhaWEAPSkRbncDkUfdWu0G0Q4N8%2Bf%2Fsv0YpW9dBfvAiYbF0R3IPI6wX80d59HWgrGaX1cr5FL3vkkz7SsE01bHuxyf9%2BNlB1JcO1L%2F5Jq36agGHqR2eq85pBt%2BcwoMugsJ%2FUGrPCRZgcFQO4DP%2ByJvcuZ8RyjQaSAz7DkWGwPe8WKlNoKtpfqJGxAeF8Iy&X-Amz-Signature=37e57c98cfa26d06cde67df9d3a08168b917d986f8a1b40d74c13bfdd08d107d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5OZAKPS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICWSJg0b2tShZpmK%2BxZtRx%2BUlh2W4DZS%2BP1A5x8Z32MUAiEA3a2VabF5Xc1T9iThHcvbscmOEQeVlMH6gl9GBU0ICSAq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDD7kZGKk09w9x%2BGm6yrcAwP%2BkssId0V8TAiZr63W5eSQEvob%2BF57LpGAlst7cum8dSmK6x7k8h6gFXcYgjYd2JGUJ7p2a0Dfr0S7X9o6WTpuh%2FHKMtRlm%2Fdu9vLcvyx8h6%2Be8N7yPXkVewqIbDV0A2dw%2FNaGpKJjLldctUuqKQGdQjBNXqqE%2BzHS5MAZiB8g%2Bn%2FarxHEwMPMBzK3D8v7fT5HY2BU95244UE4jbCUeIDbfk1vAW6ysvnqtkrbHV16uY1wcb5J8DXMENi21pguG6wlon37F5Q23f2p0ap858dYyYbBgYAoN8x5hhB1iq1qanbrivFp0HPCRYLEFH6Cbq4FB8mR3%2F3IQz8JQlBFWmS0kjkh8hKTy%2FYEHKuLfmFrwox4WXb6X7ITDQe1S1BpKvuZHefmIOSazye2guvQjuixvbkKvYt9RlorE2xvsqeIJSs%2BKYXp0GFrZ9rBceafKlgmYv4MoNyvaSVapB8JAv5NXNvtfnpRwhVvWA4QtYRqkr%2FWnXUWCLXFmL3R1TSfLY3gVRyM83o%2BS9lm4BX01CYi497j5vJ79duI2Wmzr6qEu2gDRsZFkxPLa1xJ27jMKgymFgzguSMDKdBxB6Gmy8HHO0STi7kxi9s3mykzHwgn502jjxtgTnXdfr4YMNHjks0GOqUBAogGxWUb90O7KbCaoExE6ENdDd5sJTgvO1x1cK23e9ByrKwpwqnBcSaz%2BS6Ft0doqcVZRdUh6QzoXV%2BafMl8SoIoYMrZuEshYcAZqafT1bk14cESd6xNJ1YHG3fv3RzeJDs7BTRmfXh9WYaKMqW6cuup9Kr6KwYcMZWGEydl1XrmQLb6leAO%2BsQzydkOsKEUNym4qLGeBJZiid7xrOYrbKBdEjiF&X-Amz-Signature=cfb55ec2454c1e39f5a4e19363e5b4e9223b436ca314e6ba681c7e88f79c6a3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5OZAKPS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICWSJg0b2tShZpmK%2BxZtRx%2BUlh2W4DZS%2BP1A5x8Z32MUAiEA3a2VabF5Xc1T9iThHcvbscmOEQeVlMH6gl9GBU0ICSAq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDD7kZGKk09w9x%2BGm6yrcAwP%2BkssId0V8TAiZr63W5eSQEvob%2BF57LpGAlst7cum8dSmK6x7k8h6gFXcYgjYd2JGUJ7p2a0Dfr0S7X9o6WTpuh%2FHKMtRlm%2Fdu9vLcvyx8h6%2Be8N7yPXkVewqIbDV0A2dw%2FNaGpKJjLldctUuqKQGdQjBNXqqE%2BzHS5MAZiB8g%2Bn%2FarxHEwMPMBzK3D8v7fT5HY2BU95244UE4jbCUeIDbfk1vAW6ysvnqtkrbHV16uY1wcb5J8DXMENi21pguG6wlon37F5Q23f2p0ap858dYyYbBgYAoN8x5hhB1iq1qanbrivFp0HPCRYLEFH6Cbq4FB8mR3%2F3IQz8JQlBFWmS0kjkh8hKTy%2FYEHKuLfmFrwox4WXb6X7ITDQe1S1BpKvuZHefmIOSazye2guvQjuixvbkKvYt9RlorE2xvsqeIJSs%2BKYXp0GFrZ9rBceafKlgmYv4MoNyvaSVapB8JAv5NXNvtfnpRwhVvWA4QtYRqkr%2FWnXUWCLXFmL3R1TSfLY3gVRyM83o%2BS9lm4BX01CYi497j5vJ79duI2Wmzr6qEu2gDRsZFkxPLa1xJ27jMKgymFgzguSMDKdBxB6Gmy8HHO0STi7kxi9s3mykzHwgn502jjxtgTnXdfr4YMNHjks0GOqUBAogGxWUb90O7KbCaoExE6ENdDd5sJTgvO1x1cK23e9ByrKwpwqnBcSaz%2BS6Ft0doqcVZRdUh6QzoXV%2BafMl8SoIoYMrZuEshYcAZqafT1bk14cESd6xNJ1YHG3fv3RzeJDs7BTRmfXh9WYaKMqW6cuup9Kr6KwYcMZWGEydl1XrmQLb6leAO%2BsQzydkOsKEUNym4qLGeBJZiid7xrOYrbKBdEjiF&X-Amz-Signature=cfb55ec2454c1e39f5a4e19363e5b4e9223b436ca314e6ba681c7e88f79c6a3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BU4VBUX%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T221025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIALpVR4wzwpAvlx8gPaS4R%2BZ1j2TQgDSlQQSiG74jrfSAiEA2zjLg99K8p%2FA5UsinJkS6Xor6w%2BUFT06rPoulodW0tgq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDGTQ0iq5g0vljZa8MircA6NXlt2lUnwqYz4biXUGXZnZrGET8yQwcN2%2BWZUR5m12w0vKEex%2FUYtGcJJIyqyBZ9o8l%2BGYcmeNSuxG3snr7Nrxffvdphrc82qY2cW8BpFJvPg%2BJbFzoKtI5dpQUz3SgkmMPjSTLUq2V%2F%2FS9TaNCK84bJEQI4a83NYsXxC2E4N8p5isjk7rW8lEIQm5%2FBaa8C5EFFPHn7%2F2tlmFBLKwMFlfP3I7DI6dajP6FtZFJvzedwwSPGPrr40L7Svw1dil20jA6kRdIDWKUwrMRKDhFhc0qqoWuqpMMg77zkvQ6v9nSjlLaVZCWe0HP7KL2pqZPCmWqZlsvcycu%2B8iC9Xq%2FB7euKypW2lDQoEGk94p7FeAI6qR6mK%2BlulfUauI4W%2BOzP2szJR4OzfneXonI4W1%2FZnJtblcPWgOCvB3LqvstLKn1ixDmQ785saP73zkz7OURWP8Pa15jRt%2BreFrm45vxF9RIM1Yq7sOKmzgc6bOGHRfWKBBRGDfdeFg3FlfCZpwiko3SLYtxoj1qnT1WsxmXhnx3j4K%2BkGZI6BzFRZviJ8%2FzBbw5t7AzMjBEBICVjtQtB15s%2BM8qknZOc3n0w7piOg3mgR9BBQlP%2FtZxH%2BoBMZjXJFE2Z9khcS4X%2Bo7MNLkks0GOqUBm8j0XACWELA6Vvbo%2F033g31%2FMSojyrVp1l4zuqSbUqQxIhyqjKR%2FgfOJLPdRBFGa9AafPZmc11BnV%2BEjGC1Bil7URwuS2GRSbOg4E%2BKzQifRgwVolxmS9HW1MjvQRoUhxqyFwKTOloRPPI1HKFZssxM%2BCwe5jjglbNeJEM5W2dWNEvRO%2FJ%2BW%2BjVhQKWvCXiL6d4hO%2B8pzpR7E5sXhKMiUN5NEgq4&X-Amz-Signature=3a78d1a77929e291de653eb1841c9ce58665f6a1ad48d36a5b3324ec9fea09a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


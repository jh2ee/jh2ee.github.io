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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MRXCVUS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCwfN8mHoIlZIeGaakAtcwp0BnfeExO5dF7V3uYKqTifAIhAIqBLkmTx1Icr33r7MqYs8WZRGoIbPp1M0qnNZOaV1S7Kv8DCBYQABoMNjM3NDIzMTgzODA1IgxfrAvVY1N8M2mW%2Be8q3ANhZnQzvTLrsvC3oKa0VUZ65%2F%2FaT7E7RETvFjZz7fyjUae9%2B92Or7EbVGIdt1XrENxai3dVV2ZCwE7tF%2FzgZUDuxQTpkOepEEibuVznIg3sx0O5tlAcAnKg39xsuA5Xp57wHEkKG7N%2BdTrkccxFkGq6NOrC32pthhnCPMza472A1UIvYjIxHb0Q54FMQqYHMXBa5mtnLDfz2pWXW4V3hiUnoWg01dANntaVUx2wqGoMLdhiaM5ZUN03wTbpXU%2BYE%2FEeSPYZv3oHDpuakEY%2BS5CS9%2Fg3uayXDB1GX6EA%2BmLArxlGIpLj1kv7YINoH6IuPLinPMA6TQ%2FsgzY4iqmJJiQb4lAISUAH0aT5%2BiVeT3mu2WOFuqfcUrEdV2ZeHhnqUIgVn2byqiqKcJ5I2wlcGT66IEvbkPqMw0v2UPyYyfPET0Ou%2FI%2BGLVTRKCU8lmNE%2BR%2FGQnwODDt8pU74W6H4a4tkW6vbzguB1CZG7b%2B%2B%2BjvqADWU0pm6wgysm73Lbwmxpl2nr8HhmotenufJ9BLKSScPeWpT4T7pH1MvUPyiGIY%2BBxYee3sL0HDSG7%2BHkt20zLkdrIP7OSEYkTUktx0CPHQ%2BPmQWyAl%2BrpKo6jOM2N1JNfNGd001buRqt0wX2jD1h%2B7NBjqkAZHdWPTUvZuVJ0wK65F%2BTCmVxNefdzArGgVI%2FieVWc455ezV%2BriIQLL%2BvzJJvNFCs%2BzIELoh1dmZwrWeYuMHNQg1MF%2BhKxgg4tSQjtVtY06o9aX%2BI7GtPrhymncdzvhej4RhtXXUQe0wcrTJaPfWDtORHkNrbptzGPPeGpI57MsR77d6c68gnYHRqOL4aY8ox8QA%2Feze0KlisW%2FtwlWzoRj9Gjc9&X-Amz-Signature=5d63880802cb3110076929b8019c199c33993bf1eb086dc058c732e4340b9854&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MRXCVUS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCwfN8mHoIlZIeGaakAtcwp0BnfeExO5dF7V3uYKqTifAIhAIqBLkmTx1Icr33r7MqYs8WZRGoIbPp1M0qnNZOaV1S7Kv8DCBYQABoMNjM3NDIzMTgzODA1IgxfrAvVY1N8M2mW%2Be8q3ANhZnQzvTLrsvC3oKa0VUZ65%2F%2FaT7E7RETvFjZz7fyjUae9%2B92Or7EbVGIdt1XrENxai3dVV2ZCwE7tF%2FzgZUDuxQTpkOepEEibuVznIg3sx0O5tlAcAnKg39xsuA5Xp57wHEkKG7N%2BdTrkccxFkGq6NOrC32pthhnCPMza472A1UIvYjIxHb0Q54FMQqYHMXBa5mtnLDfz2pWXW4V3hiUnoWg01dANntaVUx2wqGoMLdhiaM5ZUN03wTbpXU%2BYE%2FEeSPYZv3oHDpuakEY%2BS5CS9%2Fg3uayXDB1GX6EA%2BmLArxlGIpLj1kv7YINoH6IuPLinPMA6TQ%2FsgzY4iqmJJiQb4lAISUAH0aT5%2BiVeT3mu2WOFuqfcUrEdV2ZeHhnqUIgVn2byqiqKcJ5I2wlcGT66IEvbkPqMw0v2UPyYyfPET0Ou%2FI%2BGLVTRKCU8lmNE%2BR%2FGQnwODDt8pU74W6H4a4tkW6vbzguB1CZG7b%2B%2B%2BjvqADWU0pm6wgysm73Lbwmxpl2nr8HhmotenufJ9BLKSScPeWpT4T7pH1MvUPyiGIY%2BBxYee3sL0HDSG7%2BHkt20zLkdrIP7OSEYkTUktx0CPHQ%2BPmQWyAl%2BrpKo6jOM2N1JNfNGd001buRqt0wX2jD1h%2B7NBjqkAZHdWPTUvZuVJ0wK65F%2BTCmVxNefdzArGgVI%2FieVWc455ezV%2BriIQLL%2BvzJJvNFCs%2BzIELoh1dmZwrWeYuMHNQg1MF%2BhKxgg4tSQjtVtY06o9aX%2BI7GtPrhymncdzvhej4RhtXXUQe0wcrTJaPfWDtORHkNrbptzGPPeGpI57MsR77d6c68gnYHRqOL4aY8ox8QA%2Feze0KlisW%2FtwlWzoRj9Gjc9&X-Amz-Signature=5d63880802cb3110076929b8019c199c33993bf1eb086dc058c732e4340b9854&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YXN5JOJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQC8UaG8F3W9sUpLQA3OufOwKd7KKyz33R0zW0CuFvqAAwIhAI4FqpbKOTKzrRoKJVslH901kuUn6ghvjK8KZLVJwPC7Kv8DCBYQABoMNjM3NDIzMTgzODA1IgywoRCEFVqTQ%2FJNDzwq3ANUq9g3X%2F471Hit8xFRlILf35bKkXTD%2FwOXRzNgh3zbW5FdBRWjyQhSHlySZSRQ%2FkM32DezczPWuasaQVOVRIq2XMBuF5DbcmWCxVORqtHLzN1TQRQrQEMVRT9KkWmei4bLOujDbufYrtmuCfURkVK3zrrmzfVvHrBqmJ8kg3Xk%2FgE3H5s7N8Y5qBol%2F1%2F2beiKdE09M1RW1V5K4qSYpVOHy36oSBfWkDkU1M4tWgs40RfAHH8QxX342bq9QWuM0lyZbQPlEIkrDbfLfvahfV8nRmGUbTkf%2Budk2Z6K0TIw6rALSriB1d9GPRFwO%2FutDn0FY4LUbIXyJFzNzPMBXijnLalVuBomJxF35tH8VIbzZGbjK0dF%2BPB%2BDDSC8U0zCFRUcUrkEs%2Ba1Lou5X%2FqvBtAdCRDYcXQ7ShFzdWb%2Fi9uJDP65wEaOyNvwJ28esq5P%2BYOdS%2BApaB5A4rGX5VCUCRDH7LL9pLA4Wcb1lj37NEXJqM%2FlhRJswN0VCI9k34ZjbfWguk%2FL2hNg9rV2s2WFxqTscEZkaRifpq2tig6Wb6c4BBHNdi49Ugu4QOdh675f12zwZJs0qW1vX%2B4s%2FBHKAoxWJWRagW2HiCtCOuap9HykBiI1DAR85CWcbNoIDDEiO7NBjqkAXTasfyRt2QYuAiYDEwI5S68qxZvx%2BpWutj%2B4scy1h5saSstiXTnNuSbpS4xllTxefJfHgDVGDKBjqo2RO1SjlMNN3h5%2FM5JqhEI2vtHnRVkYk7RqfOkat7rwZASCzuCTxjRdfh8UXe%2F11sPDJQs3yZUs27IVpdxjd51MCVP8wL5OMxN%2FF57P0S2vZ2xTsPD%2BCxzu89UmiBieMaWM%2FZ4TIOOpIuS&X-Amz-Signature=69492c40b8f1cf61a027200adb94a19efe377149bb71f59be6703deb345fa609&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SLJI7KU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAHi2o3JZDEtmwEPay5RmDISGhl8%2BiCTHHePYU3jt9sgAiAtNwyX%2FLiRXoufqww0ixPzE%2FMn3V9vrUfIggNz0Is5uCr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMzYwhgnee465%2FeTzDKtwD9UP86D29RsYpB9IZnhDDeUu1jwyyepuDZ5bO6hhUdGIRQfTKYhM3zcyvCEaPq9OgFrNOTNfIFB2mftzVKyZIhs3qbSne%2FJjL0oJ6pH2QA31Zn2AUdZx66u2OsAdi9awEDUMrhrNalvdvUkmGSto17lgftNCE11D32fMgKtsxGChf4iIEp%2Fg7xYK9HZBdvl4XrdLqOORY848xxTVjEHfNTAvMVhJR%2FlRzUWZQ0u%2Fj%2F%2FqhmqQsE%2F91pJgU%2FduQVGMFQpazbzt%2F6GKb84uL7RURRr%2BkZkFfYdvHbEFCrrR6C%2F9QIVUufomxX22xpV%2B6ux5c1i0yDm33skCFATrfWBIWVW3D%2BbPabn5NwH8TNvgMl3L%2Bxe4rMvPMUqIUOeE3G3Fr64VZKEuquk09L7%2FvBRNFOBzEa%2B7IdYUZzAkr3hA07pWEADpAcSZX7m1OtqcG8LezPSZb3K0tu%2FDEC7RrQWvzX1hRwiuMtl4%2FiOZg%2BonBBkjLk%2FTjRn2rKD%2F%2Fv9v8GWRn7WIGOiN4upTGmkz%2BDaPYD4ULZWPplGK1LZYft02y9LaYVRxxUSaMc3FE3AEuT%2BstDxvSThCdjezz9g76xRXubjHpCrEBHJOLp6VzmSh1glO0gVgm6XErSOZI0jEwgIjuzQY6pgEuESsKmW%2BiWYSjq2iqTy9oouJ6nmHyc4%2F%2BjmbWsH51KRnzLYdgDwXxn5%2BuxwzBWLy7AB0A1mWInUcltY3REIzZPkaKYMZzjdxilTg7adJjb59r5MIPxojT8f1RkskfsCA8vKCfMV7zgxxef16h%2F5n%2FcOgtyDZYT9ZtgVKByeWccOvTgZ23hwSLMgf5yaWpd5U%2FRbnBpgBHkVe%2BfGnv57h2gKGIu%2BpU&X-Amz-Signature=3492e6fb9debad8d7bf7f54243434fe7edf91ef3b8543c9b832462b08eca4689&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SLJI7KU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAHi2o3JZDEtmwEPay5RmDISGhl8%2BiCTHHePYU3jt9sgAiAtNwyX%2FLiRXoufqww0ixPzE%2FMn3V9vrUfIggNz0Is5uCr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMzYwhgnee465%2FeTzDKtwD9UP86D29RsYpB9IZnhDDeUu1jwyyepuDZ5bO6hhUdGIRQfTKYhM3zcyvCEaPq9OgFrNOTNfIFB2mftzVKyZIhs3qbSne%2FJjL0oJ6pH2QA31Zn2AUdZx66u2OsAdi9awEDUMrhrNalvdvUkmGSto17lgftNCE11D32fMgKtsxGChf4iIEp%2Fg7xYK9HZBdvl4XrdLqOORY848xxTVjEHfNTAvMVhJR%2FlRzUWZQ0u%2Fj%2F%2FqhmqQsE%2F91pJgU%2FduQVGMFQpazbzt%2F6GKb84uL7RURRr%2BkZkFfYdvHbEFCrrR6C%2F9QIVUufomxX22xpV%2B6ux5c1i0yDm33skCFATrfWBIWVW3D%2BbPabn5NwH8TNvgMl3L%2Bxe4rMvPMUqIUOeE3G3Fr64VZKEuquk09L7%2FvBRNFOBzEa%2B7IdYUZzAkr3hA07pWEADpAcSZX7m1OtqcG8LezPSZb3K0tu%2FDEC7RrQWvzX1hRwiuMtl4%2FiOZg%2BonBBkjLk%2FTjRn2rKD%2F%2Fv9v8GWRn7WIGOiN4upTGmkz%2BDaPYD4ULZWPplGK1LZYft02y9LaYVRxxUSaMc3FE3AEuT%2BstDxvSThCdjezz9g76xRXubjHpCrEBHJOLp6VzmSh1glO0gVgm6XErSOZI0jEwgIjuzQY6pgEuESsKmW%2BiWYSjq2iqTy9oouJ6nmHyc4%2F%2BjmbWsH51KRnzLYdgDwXxn5%2BuxwzBWLy7AB0A1mWInUcltY3REIzZPkaKYMZzjdxilTg7adJjb59r5MIPxojT8f1RkskfsCA8vKCfMV7zgxxef16h%2F5n%2FcOgtyDZYT9ZtgVKByeWccOvTgZ23hwSLMgf5yaWpd5U%2FRbnBpgBHkVe%2BfGnv57h2gKGIu%2BpU&X-Amz-Signature=1816878f913c758aa821e4b3e5c6d31290d569104c9adc473266d36aed9e0a69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3UTMP4U%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAZYLrGm0WK%2FFPahkOl9qghceApcBpNq982Riu7vgZEEAiAMdOaKVwDY8yIQ%2BUsA7Qa9reUqYRiR9BF3eqh7OJPFgSr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMRbloFUJeLN%2BVE6dpKtwD45gS4n3wTFb8V7zpNrGfpHqYWctcf7d3V3WSka94VJpZv67HZ9r2J3wl8B9bTAZVBUZc2zOlTUnbdz1whEOihU6cwgxgCujxmpsnXOg8wco0jRcUotcZxpy6PLmxbLJYuAZSg2XCH53mZtcLUJ%2FbGwG1%2Fj40WRF0cV6Kj6cBV0%2BaL5bCULUyHwQt%2FfiLS01cvgxjrQtIC9vh%2BCzA2xuZwjmXb2rqvzr0%2FWybuTbOxUq9H1mcP5V6NVP50k%2Fw%2BBIuhM0isBuEjRSOuO0LdzQgfZR7EhjQbqPGC%2BZsWA6AdtoOgk7ZgjmEky7IcDMj6C%2F9ZNR%2F6dnYxkDitIzgRw%2BKZZizNKfoR100DFW6An0gn0qG%2FlBoBl2cp87C9t5J6WZQZNDg6vnqlSIKl%2BOUv5Fqv7G9LhbNOwFptZS8yYtQs6RXw33PFVYF8WxwqiXqxxLpT0%2B7gWY3I6GGbs%2FAlopnY0lJSWCcfpemLGL2r6VjoRTP8d2ANR%2BvBopA3FNPeKE3g61vbnz3k6J5QLpoYqve8ZaM6cgOsSFnff02d0V85a6SFePWPOsV5SGo9We04oGj5HOAsK3DnhThCHe4ep6m6Iu7QWy2hgz5tpdD8ogfOBf%2BzLZJJd6atp8ruTcw9IfuzQY6pgGJZo%2BbxTrOiYCqcd0h1oJX2UIgOoFtD1%2BGucMGf86R9abSJJUDFZzN0oUn9i7vxIdFAfLQus76ns70a3KGmvsVTaDebOowLkF1h%2FvpVmDMGeidwuZcQjn0HDbCvK97oFHdi4gAh8NgE%2BTYMM3Kq2jiyNPDwMhRrWjpqOW2vTyqtmPpGS4HKIBpIaevo5AI2AnVO97wWCrTykSMF9ENUd6Awsgd7PFk&X-Amz-Signature=28bb09fbd2be52bee76f09e1160037b223317ed3e0c1411f750ec0c7392820eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB6PH4RN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDRIKLYM21ZXLznJAy1EaEzzrXxqwEcupjQj9MvIfHxoQIhAJ8Pm0b53JKgtXz%2BFZn%2BdGA7MnPRadpTw60XX0wzqY4FKv8DCBYQABoMNjM3NDIzMTgzODA1IgxA38Y2csewjnTvehAq3AOKFcVW2kTOrLgwQ1dOvQbpdBCj1rYC1hAMRpf0UY%2BulW7QaR6pxCZ2m%2FjIDToOTdGfD0FwWmFHTxByCdogylkqlxXzU5xGbbDO76teSgRoxgS8sJ1UcpZdoFj26mv3%2FJe1nJiCRHVp0rdrhfbmHH2%2FjiqGXPsgx5VLDVxDTEkQiAtdSnFsY0X8ykjf4WwEjq8EfQf7%2FcGncdnug%2FaVp%2FCCGE2Ev%2F2Z5hi4wVVi%2FfhMDIZSLyQCo7hAXNWCP4FmXm9abY%2BAVeVpgrIx41sU9Ew%2Ffm4CUC%2Fu7V6CGn4wtXeJbXLqbsnSmLLmM7%2F1y%2B76q2z3mprQB6UZ19Kq7ZMx%2BHIbf8ujquSM3W%2FeYrBNW5E%2FxtFU89T%2BgJumxXpspJNpgK3zL9YI%2FPUQGNhKcsI03vrPm1VFdSYhUdaqoLTriK%2BGob8EXylywR3to6DpUsvmtCVmo3Jv6EyCNmMyVNpbnPJRRshPfq64VUs6aLI2%2FeIlIQsh3wMl3Qe%2Fs69b2jlqUU2e2AYESVXSJotBZNTNhMgI4LW3825GVncTrpeztgTa2lzme8tJWnr6YGnUktKPoJ9vDYBfjiRIH74KIRdD5XXlfQ%2BAniaiRCmei5rBSs3YmVtB4nc%2BnOdgmyvFJjDIiO7NBjqkAasPhWo0mVD5P69dFvJH3Fcv8u1rNvMhva8Wz%2BdJmWJtxPN78RCRiG4gojT41PQt%2F107l0dCfD1ronE8WgghpVsLoitulgRtfALKSSETXHMWUg9AmnfeL%2FpdAmVkRo5nKyDVUbTJdk1P5fb%2FtdgEU6F%2FeIP4cOiI%2FZBEiGLSl4Y7xKvTJCfv35FLyT57lXq8nOuAdQnwJNxeiUckAwDA%2BS6SQseC&X-Amz-Signature=299eb05d5ab3a375fb294b9b45cd065d72ff185999a86bd39aa7b623a7051a57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YP7ETCHL%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCnnKNTxHf0NBk1C1vUAsIxvca4UykFOxdde62y%2BtYC0wIgVKeia23saxMykON0hqu%2Fjh46ULvhycB3qn2evzsjoWQq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDH6a5IWzBRfZrupAMCrcA7ccknqaeRHffM0a0Hg665Dogq%2BKLx2JWIjvtT5Wzgcnbb3%2F%2BMoOzrwcB%2FRe8u%2B4KxKJuOnulOVsjt%2B4qYQDVgMVf1s3RXo14wwK5dC9jIxQdDyw8sPvX7iZLxFkNf0vLyZvL7iRHW8s56aNLfI9D0NLiM0DST%2FI7IoAK2EO7pahQmx6LhRWYvalWd%2FghrmipzSINL3fZtbk00wOpuAaShDzDQT4HrXkJ%2FIRhuvN8Jejjb7Cz7U1B8yn9vWQnuyQ6AX6qefN8dvFj6xyr9irieKJiqqPh4CsXcrYFBcMbLmqQRrSXMT%2Bwt0xOV3cypke3wPxpj2IUxusr6gVu%2BkVe1PAcPQJDUwL%2BZtbXCY51OcH9z3qWyrZOd%2FHrIY7Kr8u0nyx1WSqv5joGtuZF1p2TOZLy%2BP%2FbdRFkrkYki7%2BbZjl0LdFgJvHg179C7IExF4wNYxd8XfyJAciGPBVS0%2BoDMHVfmXQu8EwF3bSuVJcbBNGlZ9Uz68EEbby4MJTHfw2yT6YqAX4COvv%2BLJH8aelbsnZykiLM6zoGYrDdnsrkXgocol4I228WPWPomILq4KBfaMbWqob232naI4zFMskgEijZk9FnBDKwTO9nt1wN%2FWdnmTnJ3NX43R2oExAMPWH7s0GOqUBH1Lz8oOkGSCkyBwZSD8ELSOZGKCLx%2F%2BofeDsnAVLnVD2KNmGXp5bMvJLmsT5Sk%2F3%2Bqp9it6OmwtAzCByUMkTjxInhRa%2FMlVDgf5by9DLUYIts2hngkLQB9WBDabc7b2ZQVSOI2Bryuc0X8RhiIQus36SMuj3OnU3EHH%2FjzNKa2T72JZBPuCgcB4lwKdSr5Z2bjU3I2L7IbVHn4DYicTMB%2FYStxs%2F&X-Amz-Signature=8a1340e49b163c9efdf71750ca51b77fa515bbf4b92166ed6aa0b891c8aa819c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WI37AXRR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCICBz7Xh4NuY9fgZlCtaacZZU2jsBM1JozTmr%2FsGNKtcSAiEA7DXuQEi2PM%2BLMzl8175EspH%2BeGnLop43cObM0mN%2Bwxwq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDJ4gvVoZXLr9rcLmWyrcAyNahj40uoK%2FlQ2S5PeysdX9yhmtLTR5gUCPCbuH6yqO2hfZZTx1DqdQjNA6x6eWv0P2YYzyx0p2CnJXAM%2Ff%2BcySxtFS%2BUu9AexEsLLEXZ6yUFWPOFV8eiNyWloiTerKtEiByhXpCtTmbzxHm5fOhlD%2BcSrRZLYF%2F0uCsKJmTFfhTrz%2BWKOyghd%2Bh%2Fs7XeZOFwusGV41mOeEVXnWn1TE0d%2BGjC1U27EjAsKpDenfoa7JNfaIcgfDeIGvyWSQ5YQrhVM3ucB3XnneI%2BZKKsyi1FpHFMIfaq0qPtjPZCjwdo11RlEf0g8AuqtMPHP4xvVinWXLfBXrCDb9%2Fu0RMJYOiy1%2FjtPmRZjYchcwfXk%2F3e0cBGlQPy5e%2FAcw4G%2FPytb0bNi%2BI3LCll6KjDveTEZxziyy5a9Hl3En0sKC%2FljGdYQiNJ2lBrBAqdwcGN2Dq2kfi5%2B0PL9RBT00PnSuMuO2SwWzy2%2FYO2Kcs3I8hRculouOo%2BMb5Vvx2J2iTgi%2FzdColq0bLeccAFaJbSff3UQidJ827hckQ7QCHpr%2FJYpvpmJGwPaOTtgeBA1e%2BKLtFaTIUQLl%2BWxPQJnw4lgj9Zwa02IzTltrQ7jBwsYPSPdEZre0iAkM1fbDCKPWGroaMK6I7s0GOqUBpGGpE7QsE9en3QCVin7znNgu%2BkY%2Ba2WTV0tSU4oh5Qu5IyVswjZoMlILISbBwhVNX53FbLl6NggfmeBYkAr5%2F3GTgfzZYKu6pgxCm2eQ5kfA3mUQELJNbyLiQ40EOBWytT%2BVxxTwOwo9XBBx6wvdYjxMT0V6pqRwBtsT8DHnJx4y9UB0ApTBLkWAQuvC6gJ0%2F98o1KaHBP%2BbfyHF2xswSVUZgId2&X-Amz-Signature=959236fa3ace9430e7ab4e80df9676e463c0b8574b5da1d8084f9841fbfd50f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WI37AXRR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCICBz7Xh4NuY9fgZlCtaacZZU2jsBM1JozTmr%2FsGNKtcSAiEA7DXuQEi2PM%2BLMzl8175EspH%2BeGnLop43cObM0mN%2Bwxwq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDJ4gvVoZXLr9rcLmWyrcAyNahj40uoK%2FlQ2S5PeysdX9yhmtLTR5gUCPCbuH6yqO2hfZZTx1DqdQjNA6x6eWv0P2YYzyx0p2CnJXAM%2Ff%2BcySxtFS%2BUu9AexEsLLEXZ6yUFWPOFV8eiNyWloiTerKtEiByhXpCtTmbzxHm5fOhlD%2BcSrRZLYF%2F0uCsKJmTFfhTrz%2BWKOyghd%2Bh%2Fs7XeZOFwusGV41mOeEVXnWn1TE0d%2BGjC1U27EjAsKpDenfoa7JNfaIcgfDeIGvyWSQ5YQrhVM3ucB3XnneI%2BZKKsyi1FpHFMIfaq0qPtjPZCjwdo11RlEf0g8AuqtMPHP4xvVinWXLfBXrCDb9%2Fu0RMJYOiy1%2FjtPmRZjYchcwfXk%2F3e0cBGlQPy5e%2FAcw4G%2FPytb0bNi%2BI3LCll6KjDveTEZxziyy5a9Hl3En0sKC%2FljGdYQiNJ2lBrBAqdwcGN2Dq2kfi5%2B0PL9RBT00PnSuMuO2SwWzy2%2FYO2Kcs3I8hRculouOo%2BMb5Vvx2J2iTgi%2FzdColq0bLeccAFaJbSff3UQidJ827hckQ7QCHpr%2FJYpvpmJGwPaOTtgeBA1e%2BKLtFaTIUQLl%2BWxPQJnw4lgj9Zwa02IzTltrQ7jBwsYPSPdEZre0iAkM1fbDCKPWGroaMK6I7s0GOqUBpGGpE7QsE9en3QCVin7znNgu%2BkY%2Ba2WTV0tSU4oh5Qu5IyVswjZoMlILISbBwhVNX53FbLl6NggfmeBYkAr5%2F3GTgfzZYKu6pgxCm2eQ5kfA3mUQELJNbyLiQ40EOBWytT%2BVxxTwOwo9XBBx6wvdYjxMT0V6pqRwBtsT8DHnJx4y9UB0ApTBLkWAQuvC6gJ0%2F98o1KaHBP%2BbfyHF2xswSVUZgId2&X-Amz-Signature=2e88319821a918cd673f097c65f42cb09fb5538ed79e2fac47211be27ecba1b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XP457TTX%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCPVBH443hD4JZ%2FyRHAoYe9uSXoG6jz8TEJxkQYojP3QQIhAMXu%2B2CZmq%2BFtPCwhgMqUa4CyhsqoaJaacji1QN2R0qDKv8DCBYQABoMNjM3NDIzMTgzODA1IgxIUOaC2hOGhKWC5WAq3ANeIjAmhMVmsxFc9cflBSl7VYM1jpsm1pAx8KjDMaS47f2%2Ffil%2FcXDcJ%2BmE%2B8QIIVRco82owWiCEMCynsgqiw2vd5PmSotwKHKnsPvKK4rGxLro%2FH4dyBTWsSq1fXAlN8x7Aupxgu9P0e1wvEpCdNiDdA5X4VuvtDKmOIiyufV%2F4EXG5acEO6m%2BrfLOBRfKIzm7mmh4dcjlqyfo%2F4OpoC4IBgEnwgz3AOoZs85iNvBFlduAUEBewGEtA%2B8%2BjrZZgKMdzWuCae6BkRULVEP82ohojOVqHE8%2Fpnm2TUiuWXu%2F18f%2BHOztOpi12Q4FGIkJu4%2FLJtYplN%2BvPm5RAW%2FNn8tSCorklmQxoBjwDsqKAN7lzpk6%2BfpcyR6CkcnTriLWx0GDU9ojwoJMPvUAEcbORHkiGjU7G8ZWs2NmQJp00PL%2F%2BBWG1wQ6mYv2aTRVS0PlD3HUVf%2BAyrj3d730EeYtBWXoABezrVP9ZziKPf01Gy%2B%2Fo%2Bp23ENtmpTuAHs8my0bn%2Fwr%2FOfEJaZJTGCsyBv2fwXQW9aTcHsCZL0sj8FjbZKua3y4SjYLkEO5Ve%2FjpCWE15zk7z6QndRbALirNBCa3ypLYqLHD0XnIWOaCWybXHjIpOOAyJ2K8pADwS5uXzDgh%2B7NBjqkAY%2BJVFqG%2FOCD0CzJISWgUSspJJV1gVD2k%2B5lbWQcAEG2kGHgOb%2FLyum%2Bp0uhOd3Uz5HuZJIhReIU06d6awmaHZY17YXawkuUgF%2BztzJaDBY0lJ81pdXPMvIz94KrLQWhOetVQPHz4nGspu35WBnu6BHONA5Kmdmfbg1zlFnM9Ypx2SDSoX8UcTmbDlrfOw9OD147F1f1mKYIoifJnzVAenO9Zv5f&X-Amz-Signature=a55db8fc4313431b35f0fb2311684e82ee7058c1faf42416c490561ccec8815e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X55XRYO%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIHpPBjVfPG7Jp5p21ZQV3IlijSTyy67WJVzaDhOHvHv4AiEAicyldWmT43uNySXySrTqy3IXjCKjTdVnH6gNfwQUGvsq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDK97C8IDClzyFaU%2BOircA43VCAGCfgBB5Ff1Sk%2FECnysG4%2B%2BywqoISwBIY7kMfWhVazHzfg8%2B%2BHuaCwVmlh8Q7ceCtzN1Ncw9hIpPNiWaagrdhlwUBxVUKWUiAv90QNF%2BhLA159%2BpTmMzKCVJHTCYW01%2BhqUUuxgkTLWoG%2BJulZLPEPLhZIjZuIhZzZckc9nhynBiGAbxC278dTeF%2B4OhHX2q92EnbS6IJJVQKM4hx%2Fp3rcrfBgI6nqbqBzY7Bslj%2B3PYuXX79jcrtAbFwG8etXGG3Mgclk22bUwbHHwv%2BRNUvsi2X1ekQYsk%2B1mJtk3cToLLpxkwOfSRKcKE6z%2FKkzeT7b8ywCov4HvBHhzf9pKY5h2gdblclb4fheSzkMb1rz7RzSifzKbygf3L06FFlydbxP5j2w5ooEXuGXsZ2p8kG9oQKcpKKr20bSAP6M3T7jWrP2baWVJynMtB9Pn%2FPSDsU%2FPAEsEP2I8Ixv6emm8j%2FmBbIT05%2FxHSiBGVglDPe0mM%2F3pz%2FkRvur2fOqc75Rn9aCSzh9DnhJQRr4pw3iPDvrZb4Go2TMwUQRDSRkuckhP1iCTZ2bt2TfCGPa0x5wvQdBMegA5r3Qi42iFqxys2b8jJpLzjl%2FAXU2AaWemM8Rizq97JjuxHK%2BcMPeH7s0GOqUBDc5hQZ0d%2FEhG%2BzUEMQzpjwg8bV%2BKq3DO7W%2FT7tQwfWR13%2Bmldh8qRbBO9LGcooPEYmWj%2Bb0EV7p7nSEX%2BZ8DbsMIoE6v0u0UYkv6tpoeO7lU6CtgHGAHdJo31VVrn49MvTaK9l3bFZfMtEo4a42U1uYmKI3k9gH46BM6tIlE0CTVhrbKTj2E%2B0S9lWQRwrb4PfcRE7%2BpxeSPtnv0MdlGXdwIxlUP&X-Amz-Signature=109652cf559c1c0ffda36b2f2755997a84dbff1ea9192475b3153584251b4cf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X55XRYO%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIHpPBjVfPG7Jp5p21ZQV3IlijSTyy67WJVzaDhOHvHv4AiEAicyldWmT43uNySXySrTqy3IXjCKjTdVnH6gNfwQUGvsq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDK97C8IDClzyFaU%2BOircA43VCAGCfgBB5Ff1Sk%2FECnysG4%2B%2BywqoISwBIY7kMfWhVazHzfg8%2B%2BHuaCwVmlh8Q7ceCtzN1Ncw9hIpPNiWaagrdhlwUBxVUKWUiAv90QNF%2BhLA159%2BpTmMzKCVJHTCYW01%2BhqUUuxgkTLWoG%2BJulZLPEPLhZIjZuIhZzZckc9nhynBiGAbxC278dTeF%2B4OhHX2q92EnbS6IJJVQKM4hx%2Fp3rcrfBgI6nqbqBzY7Bslj%2B3PYuXX79jcrtAbFwG8etXGG3Mgclk22bUwbHHwv%2BRNUvsi2X1ekQYsk%2B1mJtk3cToLLpxkwOfSRKcKE6z%2FKkzeT7b8ywCov4HvBHhzf9pKY5h2gdblclb4fheSzkMb1rz7RzSifzKbygf3L06FFlydbxP5j2w5ooEXuGXsZ2p8kG9oQKcpKKr20bSAP6M3T7jWrP2baWVJynMtB9Pn%2FPSDsU%2FPAEsEP2I8Ixv6emm8j%2FmBbIT05%2FxHSiBGVglDPe0mM%2F3pz%2FkRvur2fOqc75Rn9aCSzh9DnhJQRr4pw3iPDvrZb4Go2TMwUQRDSRkuckhP1iCTZ2bt2TfCGPa0x5wvQdBMegA5r3Qi42iFqxys2b8jJpLzjl%2FAXU2AaWemM8Rizq97JjuxHK%2BcMPeH7s0GOqUBDc5hQZ0d%2FEhG%2BzUEMQzpjwg8bV%2BKq3DO7W%2FT7tQwfWR13%2Bmldh8qRbBO9LGcooPEYmWj%2Bb0EV7p7nSEX%2BZ8DbsMIoE6v0u0UYkv6tpoeO7lU6CtgHGAHdJo31VVrn49MvTaK9l3bFZfMtEo4a42U1uYmKI3k9gH46BM6tIlE0CTVhrbKTj2E%2B0S9lWQRwrb4PfcRE7%2BpxeSPtnv0MdlGXdwIxlUP&X-Amz-Signature=109652cf559c1c0ffda36b2f2755997a84dbff1ea9192475b3153584251b4cf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP7CX43I%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T064047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIGnEPDAoVfa8BEQcEXvv9sJ1lBW86%2FAwY6YuLm9mcz3GAiEAwW4jFAnwqiSBz79PlKp2yQomdl%2BQCJgtEC8NuyqFdsMq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDJ5N7b%2F4HXn7hAAPeSrcA%2BXdkzU79B2Lx9CpeLwOdJ2jkxQQEX4oNXT11wymMmAvNeGRk6Ui7ujUL1Ci7t%2FdAJiaL9Ai20HY1oYDkNUvWYYk84hjCPF9t66PgYE7Tj9KgbWFEhGECCUI%2BFPbwbeLq50T6rjNkNA0TrNwkkqerxyl3N59sRPFEjNFA79DGufQrsTexxuzK3V2P2y%2FrIEAqaml%2BqCUBkMiX4BnoCegqRz%2BBG6kLuAYOGnDmjViqEoyGTiMvxEhnIjJ%2FI0sfDHZToRGZevnHS3f8x%2FYZiJOhXeIVXPCCPbuydwb1cV%2FHnX956GcecLXlykvTB%2BsQgXd7uBUiwV6rTmb1mTjlnuUlY1baUyaoS3knFFWpYRTXPW8PTctVtlP%2FBrw7dyskAcniMOn%2FEpDqR%2FhaxngHDkipr21kKWr1gSM8ObM34ylz3O1sk9JUY5dRCMD%2BfjuUA4CE6oJPJxbE8WiIcxbqhZxtOegf56dmz%2Fw7WtQ9%2FsX02ixekFkwFzsHwwfFCYKAJJfOkjCeuxRqfPgmzAXcoP3uo5HKC5o7R%2FNKC54f3XhmP5IXpY35idjTuWidqpPzPGaaMxqIBQ36VbsvW1re9xeHgtQKLcVx4j8XFz9tX4kYcSCvx6u70mqwSlS5aaCMI6J7s0GOqUBmcsmuWtxfLw3P49D1fxKBZJ4hUglRSIu1I93RQHxBx5wXhgJoceGl9rPKh5lcePX3ML6lOU1%2FJpz7hHSGEWHTi2BYLcSnvMWkzA1ZUtBNrBSSmhb6CBbfJEGG5lEW%2BuZSSXnhtmYREI0WR6Yb8L4%2F6ZXZmHbopi553Fi9Hpkibhl3doE0VFfpQ6QEKYUK0DYUtH7ZUtoDLJbFFjiLrla8q7YUD17&X-Amz-Signature=001d0c335097290f848c11cf4c22aaae1279c658a6f04ef08c68ede7814faa06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


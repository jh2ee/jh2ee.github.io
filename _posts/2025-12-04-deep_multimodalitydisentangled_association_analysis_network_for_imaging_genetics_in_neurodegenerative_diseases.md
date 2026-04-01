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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULPYKYWN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDedwRRqbP9W8FfUu0fnZBs8Mh7I5EzfVnGr1Qjxj5%2FvwIgNG0jLs6rWsG7H1E4zIWzneT5y5xEBkvFLEa3f2M7Ho0q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDEBLAJ6RUwoHqasFnyrcA8y5fXbaDWpNz13JdWQJJVsh8tAjdwIrQTXDUfhVown7GBT0BURjmuiCkDy0HJ3VIPMRHNSV9gBKh2SJyoziQQw72JdzOZPfQfoVIED73P46LalJNWLOeGkkNA543xB29ZRfPjwcPscVXQxwv7aaz64q68MpH1RIs%2Bz4ysnmwch7xfGjUpHrIJNfjSSTqd1HaSoXlZU%2BMFXOd8oysSCO9ck7i0eT9qgQCdkM0NopZBDXeKrmdl9WkrgRXkZYTz1pECBBYd9WuHTIL84qTHS8PtAm%2BTMaycKw4EZdmYUPYoc2j%2Fjd4zMjTjjnfCynvrv6YmhSqdqAwSTSnZ3N1paXSGWgI9DfiTeiko9M6z%2FssFE6it0WSY%2BpnpVPcqD5yvhxIJt1kvGXqi1Bqy43WjPH85wHz6OLbhrT2g589s6L9D7Cu%2B1HmyuCeTeJwgoxZd%2ByAtg3yuX8LSWmIHasY1dbeMzLNUiS3SoIOr5E6N7KIS0OjECHbRKsCTkXwx5kGctMhuJPRDK1YHnknqHEgGIxfKATyY819VFffMQC7y%2FNvSPtaQMBppct8jEB%2BPrfN4cI%2FoaZMOXdpCPNnIbq%2BTrYdDChp1UtWUDZDh1P0WwfPANuqyWQrzaHz%2BvTpW3zMMCwss4GOqUByWSF%2BMDY13FwF0AwbeFW2Z89RXM2KHhWgdr6A1OYHfq7Ss9fRaE09huPP%2BOEzIr1rm0z3TYLn4PQQnbf3%2FOdBEusfsFtxhLcAbTrgbXUDKbRR1zKuOQpmsn0n999LOdrbiayRcQSBhx7891ke1APf029LyYON0EmguLR3Qjtm3z8cjVI4oZqVw7oh9%2FzJVxIGEX7F2FHCLNaOsSNxf8Y8NtEZ%2Bpt&X-Amz-Signature=628d131ed5514903561487669f07b29effc7cf1f5ed96467145842e6f009ede3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULPYKYWN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDedwRRqbP9W8FfUu0fnZBs8Mh7I5EzfVnGr1Qjxj5%2FvwIgNG0jLs6rWsG7H1E4zIWzneT5y5xEBkvFLEa3f2M7Ho0q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDEBLAJ6RUwoHqasFnyrcA8y5fXbaDWpNz13JdWQJJVsh8tAjdwIrQTXDUfhVown7GBT0BURjmuiCkDy0HJ3VIPMRHNSV9gBKh2SJyoziQQw72JdzOZPfQfoVIED73P46LalJNWLOeGkkNA543xB29ZRfPjwcPscVXQxwv7aaz64q68MpH1RIs%2Bz4ysnmwch7xfGjUpHrIJNfjSSTqd1HaSoXlZU%2BMFXOd8oysSCO9ck7i0eT9qgQCdkM0NopZBDXeKrmdl9WkrgRXkZYTz1pECBBYd9WuHTIL84qTHS8PtAm%2BTMaycKw4EZdmYUPYoc2j%2Fjd4zMjTjjnfCynvrv6YmhSqdqAwSTSnZ3N1paXSGWgI9DfiTeiko9M6z%2FssFE6it0WSY%2BpnpVPcqD5yvhxIJt1kvGXqi1Bqy43WjPH85wHz6OLbhrT2g589s6L9D7Cu%2B1HmyuCeTeJwgoxZd%2ByAtg3yuX8LSWmIHasY1dbeMzLNUiS3SoIOr5E6N7KIS0OjECHbRKsCTkXwx5kGctMhuJPRDK1YHnknqHEgGIxfKATyY819VFffMQC7y%2FNvSPtaQMBppct8jEB%2BPrfN4cI%2FoaZMOXdpCPNnIbq%2BTrYdDChp1UtWUDZDh1P0WwfPANuqyWQrzaHz%2BvTpW3zMMCwss4GOqUByWSF%2BMDY13FwF0AwbeFW2Z89RXM2KHhWgdr6A1OYHfq7Ss9fRaE09huPP%2BOEzIr1rm0z3TYLn4PQQnbf3%2FOdBEusfsFtxhLcAbTrgbXUDKbRR1zKuOQpmsn0n999LOdrbiayRcQSBhx7891ke1APf029LyYON0EmguLR3Qjtm3z8cjVI4oZqVw7oh9%2FzJVxIGEX7F2FHCLNaOsSNxf8Y8NtEZ%2Bpt&X-Amz-Signature=628d131ed5514903561487669f07b29effc7cf1f5ed96467145842e6f009ede3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOUUYKVY%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjSqjSyaIOLlhO1QaNNOeFIGUlJ%2Fc3y8u9SkkgnI3qtwIhAOQgMHmdwyXHkITIyMvFlx64GyRJ4ebHXdP4RCvFk0ZNKv8DCE0QABoMNjM3NDIzMTgzODA1Igw0KcEcTWXCZeKZmGYq3AM9OA%2BbyGV8DFSZA0cO7WSTq51DDW%2FqqcPpukY7SAc%2FLFJHOe1l7P0zkr8poGsRFAQ8y3W%2BylKlkMXcFjhRtp5h6uKf%2FZAkAJg3cxEdcRrUevIHRd4S2l3sshXsYX3PU%2FMaTXyMlTELW7ju9P%2FGkkFbaRwJ8sK5DOpMArXEW9i4Vj5SAX7cC5VuyLoOc4wGsbNC%2BzQlAI44dl7%2Fsqajvi7MxEjRd1M%2BtSEcwuEis0qses1lFDWTiJDUcgKN1qUihyXPmZqYwsX0ov69D0f29BDAKRpqyPdsTCX63wNaB8nM21vQDj8g44TOXaTWIfSlC4kDjpiekTj5ngjN3qb1eNPJ5NNLwwVwCovY6ywvOWZseVSa%2FJUtk6GgXsSJUhKrIzUHiiJLwr1TigU8%2B8jh%2FznYT1W2%2F6y4A0VXjoaVGINQe7Un5WNxKK3q78xIcs%2BVc8ArZ1irBBYyLTGdDonnTLLoOWqXE62PdLCzlKJX%2BYVOt1yGBKMlONRCm7MsZGNtOeoOGWujlMt9jkSsvJXrYkokNZ2cvHPc986X2uUFyGEHCWdnPI6WkO%2FdE0YWIB0RNKR2qQ09Je%2FnNixr1NLwAWatqw1DtB07zUsXq%2Bv%2FdSKoLax31amSXTuCaNppdDCVsLLOBjqkAQTnWTRDtKKAJFEBhSmEQPYH0jMPVSkgqIvYkG6xbBq48BCvfvW7EnhnRMAOvBylliDFEtNoOEsx7bcm6i5n1Nr%2BzWR%2Fb86rTfvozsNsoLY1Ydjztps6llnA07y3jhRDzm50Eh%2FymP2FwrmclcnW%2B1mlIHjwjHpeHwX9GcFGHiRTokjfnDnWmeaCx1rd00C%2FO7q%2BAhtfp9jnqbLr9Ku51xgF0E5R&X-Amz-Signature=615e66b2fe55667fc21057df4f543c6389d569808bb75273ab591faf6e816782&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQ75CPMC%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDKgHhgIs9BYGbfBIXHdU%2BtMW1LYmD00zhfRpFcF8bq5wIhAIagGtqzfPfRD3XOZBpSRakomR%2BUMorUMYLk5S6VrF%2FKKv8DCE0QABoMNjM3NDIzMTgzODA1IgxVxrZZcNJCviCtqaIq3AO99X%2Bh9hZ%2FyUzUfAQfxmYSw8h%2BASPNafiZZlFJcPvvkrJnSci4cnGpAnkcR%2B486qsi1eMHtgxic7qi4DP3H7yuVUpa3Mr%2Fv3z7afHhPtQtqPdfkIuwduTwxGr2g%2F7sS%2FLO9wXg5UqVrin88jJQUBdV4H6sLv9xHA5j7YTo5St5uwbwcAgVgXFoBuOBmUfgRzYofMpdJN7PEISAPFUqT6dibhOYyHGj0IVlqLThfe2TNyohvTLqnTWGxNgqxjdscRmFppE3P0BAsZiED7PUgdxrDp0aZS7RU1WS7HMtlsAMyQJflWY2OcLHLxQ8S5JayCJ0zGrRoc50f8M3MvQzCS0qAOijfNdZx5SxYo%2BrrXHfEsj166jQUIltPk4x8JoykcIwwZ573YzUyFisevUJdByJyWXG2jdKLRbE2eMjdPI%2F3tYzMRFcvmNIlFbgliJUCIqPZEiZ9jxRLUo1zaRpp4qQccZKCG2z9MO9HrQhwvJs3XWQMHQ07sLkt4a1j3pJ9X%2BfPIJ5m414%2BCU0FiI%2Biuw3CRvbK6%2FZ9J3BLB%2FDb%2FVfinfeT5kJXDoe5LK3ffCHR1FfgukZT%2BfV0K0qseTua8KEQGDotS3EXor0bi8MExqXnSh8Q28pmmPbMAMB1zDIr7LOBjqkAZoCvwTrt22bZyAhUV4v1GXZnohNfeXzFDvRXs9zHnmWuI64hPmkpoIrH0ZYYcCKyoiREpnR7Ck1SFGm7OzHs96%2BJiWEPLXRpkAMIZuk4JYXr%2BNkHD4TPRASPyni1MKi22R%2F9BMMSPInrx4lSkYhfu0sSlkaopgffa0EJHE%2BvM6N9LiteHPXP5cGvqHk1J36d8mZsN5DaVnLL71OUIUhNNAB3%2FIP&X-Amz-Signature=7d5de6cc9a49983e1321f1f224ecf56a12e8dbffbbcf2209e53c0bd8d9dacb29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQ75CPMC%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDKgHhgIs9BYGbfBIXHdU%2BtMW1LYmD00zhfRpFcF8bq5wIhAIagGtqzfPfRD3XOZBpSRakomR%2BUMorUMYLk5S6VrF%2FKKv8DCE0QABoMNjM3NDIzMTgzODA1IgxVxrZZcNJCviCtqaIq3AO99X%2Bh9hZ%2FyUzUfAQfxmYSw8h%2BASPNafiZZlFJcPvvkrJnSci4cnGpAnkcR%2B486qsi1eMHtgxic7qi4DP3H7yuVUpa3Mr%2Fv3z7afHhPtQtqPdfkIuwduTwxGr2g%2F7sS%2FLO9wXg5UqVrin88jJQUBdV4H6sLv9xHA5j7YTo5St5uwbwcAgVgXFoBuOBmUfgRzYofMpdJN7PEISAPFUqT6dibhOYyHGj0IVlqLThfe2TNyohvTLqnTWGxNgqxjdscRmFppE3P0BAsZiED7PUgdxrDp0aZS7RU1WS7HMtlsAMyQJflWY2OcLHLxQ8S5JayCJ0zGrRoc50f8M3MvQzCS0qAOijfNdZx5SxYo%2BrrXHfEsj166jQUIltPk4x8JoykcIwwZ573YzUyFisevUJdByJyWXG2jdKLRbE2eMjdPI%2F3tYzMRFcvmNIlFbgliJUCIqPZEiZ9jxRLUo1zaRpp4qQccZKCG2z9MO9HrQhwvJs3XWQMHQ07sLkt4a1j3pJ9X%2BfPIJ5m414%2BCU0FiI%2Biuw3CRvbK6%2FZ9J3BLB%2FDb%2FVfinfeT5kJXDoe5LK3ffCHR1FfgukZT%2BfV0K0qseTua8KEQGDotS3EXor0bi8MExqXnSh8Q28pmmPbMAMB1zDIr7LOBjqkAZoCvwTrt22bZyAhUV4v1GXZnohNfeXzFDvRXs9zHnmWuI64hPmkpoIrH0ZYYcCKyoiREpnR7Ck1SFGm7OzHs96%2BJiWEPLXRpkAMIZuk4JYXr%2BNkHD4TPRASPyni1MKi22R%2F9BMMSPInrx4lSkYhfu0sSlkaopgffa0EJHE%2BvM6N9LiteHPXP5cGvqHk1J36d8mZsN5DaVnLL71OUIUhNNAB3%2FIP&X-Amz-Signature=302590c1f8b5edd67d06bb4b6d2905bf50d95278e29cd075f208508da19067f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAGWBGRZ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB00M5I8B1rcRy9X2JJmjfBXLkJVOR6aNxqjUdXJHtYpAiAyQfELNxncHXgOGvyURQj88bCtfipPa8bDwgwAjN7YBir%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMb076m5fs6%2BjRCkFlKtwDqDvC9G6P1bzcG%2BkmI21cgiiTcW0I3wdhQ%2BwSLf%2FrVNX6uuno3YYb%2FKesMBOUf633oYOGL7A8hbA8edNiZIUVRKJQ1IU3KGn0CMsK4b2uKIKgVoRoMF8Hlv1Ke%2BiW3K7an1GAkFIjPv%2BOx9A1%2BpSoqRrgyKyEQ%2BM1DRm05ysvunWngsjB6yOVntHiDPAkP9VayFBwMiY1UiTVchmS7Q8w8vmDGu4kD1EYvl4eQRvrU3gioPhVBBcy7OGdPceuKOxk84N0HM8n9GsrNhUfBEUAlgD2syVm%2FiCkJ6QJIeJGgdCpmoq%2F3NbAQ2DCe%2BSoqrrycddTRt34O6IXOuishE0BHSBoTahudNCJGdPb1ZWmkfP1Bjl8LJZ6YNBuGEuLHGF6D2kFbsx5kDJckDCJmUql5OFEd2IoWLafT9xErfu2pf3ELlLrHjnP4CU5bH%2BIBCUvJDkXrtdqAcKmiMRjG0NSXbYad0mNnLvX2rPQXG%2B9Tfbti11HDO1hFEpG%2Bh9tinl3ffTNntBYpubn10EOp4Y5ouZewTqxkS%2FhdvZNwdffYlmKFVoRcBXkXsDuRNDHYzRSdMh7%2BQmivsT5gdhNDJHZtWsoyW3zLz5B6EZb8qmMFljoQT%2B48ukcz4BoHKMwhbGyzgY6pgF11Eu9d6tEwGahe1R0lOVSy1d3MJ8BsHNCeYc58ltjdtb9dkSN1CYyrztPpkx1TG4BVM%2BRC8mc%2BgZBajucBYZvE0hc%2FjijC21Xz7Z7lCIDf%2BNX2L9AxEzWCf3ujQBxNeOBSm2PcKMluqtERw2PtjTLy80YllgicKjYSUtae%2FftlVAwDM43xiR5ozFzoAUZ4NTIsME0geCi7vmt7jujV6RpAUxXRCXv&X-Amz-Signature=57959a9c3231e80d3bd12bbf4283f66be106838611b076dae422c11078c97a97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWMOIJAN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiqMDrgYz3w%2BGuMCKQjBoBtP5nbqnsLFt1Cv72u5Y3xwIgf8SDVOjoAmgfFL2jAi12w98E1koicRfS3QCnkxpY8kEq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDIwxWlhZqVyxbeNnRircA9aXBgiSt9WJF%2BYJPD4z0YO4dr919GckEmxACr8q5aO%2FtgVsudHZZl1GKMpptaSkVEcq6vKq5Y6t8koABtlAwlg1ydhrNeifnTsShNGcML7Coam8auTzMpg1NuEQeNxO9zXiey8H2CqHekwel%2FUHNaSIBE0BauILVRAsKS7C0FjKOrkwQAJdBlgS%2FAVpPgyL56ZE9YQlNLuHQRFGDU3BFpaq%2Ba0GPsAWija1D5y2HZW0MhToH6SqTKYmwzLQXvT5%2BQqzAACsD51VnoecI8dwdQwu6CLM0zvssMMHiUu93sKs4UxEU7vvkuWEG0xM%2F%2F1q%2F6IA1TQK7gu5u9ioldOdBStgDmcdOAui41LcUYpgLZ%2FbVpqhKDTa1OaJ5MBku3H%2F2JivasHrK%2BQbdE%2BXQ54MOdUVk%2B%2BoSapDmsC3FFftWZZqNYX%2Fa%2FE2v3WQm3GfoZfe605PDcrooFSICNe7kE2BWX5uLetetFiXSxmweUh9peIwn%2BRd9q8tqBbWXG6dBsy3WjyKSQ4a9K4DIH8i8TtZBqG33xFIlUOSmTJOfz%2BSbvSFoXQCkwy0JT1pS1JOsZGCA%2F7hEvhFMq0MdeXb5Hebimou4CPvirgCVV68mTn32jAsOyVGtglPIralzRH9MPSvss4GOqUB8WG0RDS7N7ngOpAie85fagX4MBj6FkEECqS2%2F4YJYZpQUmty0HWnCcJVTYcpXqZ8Wk4l3A%2FrEkzX5Qh7xsf%2F3KEqlmH6iUebE5kCUJp3DgaVmLAlAuRvue5qzujufYlTqxD1Ssmkw357D6gRg8lIiRX7%2BZEK0ZmMyP1kfKSD8SFYuDT1FH6DEFeG5TwKaEt7vFDujJqxoMuR0e8C9j31IgceqGbb&X-Amz-Signature=06e572a796fcdce8176ab8db1371ff83b312cb5cabec1843bdd8a13750ae00a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G53YHTQ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBauVKrd6qYVgxRhVZa1cDijq5smMP4M%2BWDL%2BJYGD2tMAiEAnzcwU0Hhe0dcb0%2FUUbmFUBIoDB9nOAE%2FvT4QByUDCVIq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDFFu2eBCmLRNfdpGkircA0rximAAG%2Br7u6J9EW4sM93M2T%2FSeFZWSzIOsHVrhK98LHHzzK6OIpMOOWR76y%2FB8Q6%2BxbJ2O7eLcoU%2BC6HYnb%2Fn%2B1Ar8XnMHsEmkjgurldzWQwKXL%2B4CHd8GVF7IYhOOF4HIbNWoYAw%2Bi%2BFilM%2Fsx0GJOJMU30sM06p%2FyZ27SU7ILbRRkQ0ZdlLajP64ribZLJl75GbHGDLL6BFMHm6coIIo0B0J2IE1lhuiGc57E2JmYxMAjLI4aim1dlt3%2FC7K8nQ5cv5AJ%2FvXh2VdkhgkQx%2F4az%2ByN0rFZ10cbm1sXnWuNpqbqBdXlKsQEUl6QdCCZWaRpjnWgjs5JNclJEKFoSaPRVU3%2BStqH4gLSDaNfxKbs7HkxeiB8skrtyiQDEVBFvJ25LxwbH5WvjWxsJgxVB0LJMuT%2FWFpk1SwnAT%2FXbFBHZ8a%2FdK23KWYDlCSCfhKiPddnv0kWzkyM2EW1sjYh0TvvWCjByvDgerxdhiAwUmfauTlufU0bD7HQby6BpxACip7CaS5J52zELTn27Zu3Hz3gn2jSZYdwxLEvnYs6%2FuWcQSYea8ljxgb34HJw2Rz13rKRD89B8D2kfGMZzqOG3TP3yzTzIB2wRdoOnP36nVMyNMdsZHiJTtdcokMMuvss4GOqUBcitPxJxa94ztn9S%2BFCUjA6HPT2geDDgVctZpLS%2Fhx62RB2rOVFM%2FU3My4hRMcewD55wGu%2BIufkqB0hpXdXquczUsfGW6JIA2NeXhjUSehCFoQ7VIZ9S6A18WxULQpB9QPfz2XyCQkxFP8JgoAbU6eTDYSu1wBMoCo1zsKC%2Fhtv0xij79923CEEYD%2BWUaRuOBUgHzbw6LXmgzZ3%2FS2U1PP99seeFj&X-Amz-Signature=4d998e0a7ff8d6cb06b9ad048c4dd914ea749c133ca42b0ff8e28ef8a11da6f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QK4HQVSS%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043605Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGV1or63GzBOo%2FsSQhb2YDnlvTfi1vCb5ILzEizg7rxZAiAv%2BRYutzvYIKf35EV32Zu7nWCw8wnNhbV7EwTe%2Fd0bfir%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMNQiwVChC3wHC%2BQb3KtwD5pRPO4XJNVbWCMqFfkirCc56xYhlExeZTI2bTsYUbWMtKbj6QrhmuSMcWRglasLI4Hkp0KcCNyipJLeZGWo%2BpOBC1JwnzRaFxeAW41ktoTI6yk%2BZ6qd3VphcPkjs7ANQE%2BaS29F8y%2FNtggXE3tUESHAzvaLiqW0P127w2HZSKInTYJaTtqQFGM9ia7K3dpduDEi%2FUjL%2B%2FD7HyPY5qiolWsWQwUomvENPbhAJ29LI0c80Aq3hxJyJ9m2t%2BCMslRrKipkfb6zLTVPPiBJTWY7v%2FpNHa4Eescxo10Pm2a7VZxkNZ4Uq0gKtBjDlUQ8dM1EVOtvZo8vJmjnSbL7k5O7yW1rvlG6QhBUF0eAa77e%2FOB%2BjvGUgHEd2GBr2ZktPenGp5ZflocYA4Lt7%2FQmBkcXQliJPaSoV2widhRGKAYBdYcH74YQMnL7ee9TibuZ69pEjbd0bGfVHep97vn5YLXAMnt7J9LmSSde7drd1Tcvi%2BZXz2O6h0Y9VIjPiLFAD9g9wA%2Bna8dFo3s%2BScfj1YWYE93%2FPPKXWP6xPyQDHR19GSsLH%2F74FN1MFaZIGdrUqgObBO9qCrb%2FFhpShdoZRXR2jCV84nn58FI7QMeMHiYEDSAHst2UKLCWFAkwdO68w9K%2ByzgY6pgElFuTnCzzwTW3%2F2dPk5zhLZhp7usxfNKTg6DdUSNELWO6OSBdolrKeRybkJxYvRkied2vwK2TSwGfoMsydP5dhkIuknmpFR2avjXM7UbzbaJzX41pCIotGd3f297ScYVshwDBhS73v8xoAf6HqywVjTTQgV4M40%2FV9IBypvX5RcG5jjrMKt4FbEulI1%2B%2FxXLqmpjrUB8bvxa%2BL4zmAoXIgdEW1z7Sn&X-Amz-Signature=e9870743134f344a98f638064f71b60dcd6cb51dd180e2e9cb87213f39d74f41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QK4HQVSS%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043605Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGV1or63GzBOo%2FsSQhb2YDnlvTfi1vCb5ILzEizg7rxZAiAv%2BRYutzvYIKf35EV32Zu7nWCw8wnNhbV7EwTe%2Fd0bfir%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMNQiwVChC3wHC%2BQb3KtwD5pRPO4XJNVbWCMqFfkirCc56xYhlExeZTI2bTsYUbWMtKbj6QrhmuSMcWRglasLI4Hkp0KcCNyipJLeZGWo%2BpOBC1JwnzRaFxeAW41ktoTI6yk%2BZ6qd3VphcPkjs7ANQE%2BaS29F8y%2FNtggXE3tUESHAzvaLiqW0P127w2HZSKInTYJaTtqQFGM9ia7K3dpduDEi%2FUjL%2B%2FD7HyPY5qiolWsWQwUomvENPbhAJ29LI0c80Aq3hxJyJ9m2t%2BCMslRrKipkfb6zLTVPPiBJTWY7v%2FpNHa4Eescxo10Pm2a7VZxkNZ4Uq0gKtBjDlUQ8dM1EVOtvZo8vJmjnSbL7k5O7yW1rvlG6QhBUF0eAa77e%2FOB%2BjvGUgHEd2GBr2ZktPenGp5ZflocYA4Lt7%2FQmBkcXQliJPaSoV2widhRGKAYBdYcH74YQMnL7ee9TibuZ69pEjbd0bGfVHep97vn5YLXAMnt7J9LmSSde7drd1Tcvi%2BZXz2O6h0Y9VIjPiLFAD9g9wA%2Bna8dFo3s%2BScfj1YWYE93%2FPPKXWP6xPyQDHR19GSsLH%2F74FN1MFaZIGdrUqgObBO9qCrb%2FFhpShdoZRXR2jCV84nn58FI7QMeMHiYEDSAHst2UKLCWFAkwdO68w9K%2ByzgY6pgElFuTnCzzwTW3%2F2dPk5zhLZhp7usxfNKTg6DdUSNELWO6OSBdolrKeRybkJxYvRkied2vwK2TSwGfoMsydP5dhkIuknmpFR2avjXM7UbzbaJzX41pCIotGd3f297ScYVshwDBhS73v8xoAf6HqywVjTTQgV4M40%2FV9IBypvX5RcG5jjrMKt4FbEulI1%2B%2FxXLqmpjrUB8bvxa%2BL4zmAoXIgdEW1z7Sn&X-Amz-Signature=902f7430239af98f0adc936be2237551a2cf9805a9e035f24f98c12276583874&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KSJJ7GE%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGMFvheCT201hz5IRMkHuoGtPzFw6zZWA27mZJlW4kXiAiEA7ujoc%2FG6FGAs4Bi%2BUE61N1lfW6tBch8XHWFo%2BBMYJw8q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDGc%2FlAZu4EfSASuR4CrcAx4fZHdRF8AxlLzwRbk0RmdWXPTkYmLUdFtcIoLifvFTwGXIlzk69mr2rjDPK3uLPSe%2FzXuvcxhIBHb7A12U%2F0vaT%2FPvy84rqaoyD8jJZlyUDpPihLQFI5Z3NYP6PDMhRHYGbyap427HYeVa7mWNyi5oJZAfwZUI7%2BIx1XK8DoqxkGx1ayNI4vklLq%2BZNxgU3WrwybA7wD6h1FTK9Jry%2B7IgBW0q%2BvHtVrkC%2F3k01xSr5BciQfjVOg0tqQ%2BOKWkZ%2F56u%2FDP9nIKl6ZZQ2yhfA%2FLKbWR9AHZL3LCIM6sVLX0T5SralfhxknqouvW9mBzp2IBKwAVVgfJTHqCKSY3Z4Gt72R1byvoci0dA9w7iIB%2Bo%2FfiZAeseqhIUS5oSQYuJlVYT0v%2FTYdZscKo5u%2FUWV8Zco1CYkTXKzO%2BZF3zK1LypxrhAG%2FsxMOlQqcoNQdMbyW3Ce5nug2p43knxO1VzIsWFEaKyAQARLLI5SsqHhI6LywuqJkRozPDxYWvoKvX6GOeWOJTl0PvZc%2BC9QqeQocq9tgHazT6npREER2el15AUrb2bkDI%2BYy%2FTxOOKh7eCMTVBflwzcRi0SSXIw8F%2BidpkMTCj96HZJYVfHkaUqsWcgqNFd0X%2FH9yYDMIqMIyyss4GOqUBRIWuZghiBbwPJnW2X5fxnOOp7rtF8eb3Np5p9BI0DmQbtbrYdAKKdkXiWXxy%2FmwtdAkouy7vQLLoCiZyryUax061XA2Xo6fBXkfkCu2EmY6ye5DV5F%2BhTb7R%2FCYgPs12MoCVIg688RyzRr53ZaQDSM470S8%2BmoFe3owjulN%2F2Uz%2Fm4DbkNF4hgcJxIxnzbY4kIDT8CmcQcdZuccHdk%2FK9tlH3nNQ&X-Amz-Signature=9b08576ca389fa436de3cd5f8ebb1bbcdca0b4e57ce2c7d80d11e44d969d25ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPX7OLCD%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaMGXF7clmu36AhWys46y9DCAs%2FlSV0bak1TATAe%2FH8QIhAIrGKWzy75GIS5w6Ca5n%2FsCc0NnqHFrwaOoe1KqW9UWkKv8DCE0QABoMNjM3NDIzMTgzODA1IgyMzkbJB38FmmGRUm8q3ANtvZnHvf6BGMrunC6idRyHmuFx8O13sHD4fGNTiQoJ77f7dRDcSuON37ckApvQDuEj0TAV5%2BVHdUcz%2BT1hH2W%2FYmCzgK%2BVVuvrcUpkMu0aCBgF7QhJcm1qEaG%2FihO%2BMHMEUQ5Tjpw56mpAS8cxJwh1LcVEpR%2BziMCLYonUirdT9EiBqlVOBIJoHfzfPDQmbvQQ8nJgUa7vTcDH1bqkDH3H33ccRCBN1nC0yuBUiHYQuDJy%2FpUCFC4fHv8kxjvEimWdHmY22hcylVQ%2Fy%2BY5Nq6Nof9MqpvDFoxEFtrSu%2FN%2BmiGOgNl8vR1pBVkLMheIqgqcEMlDUsmDuo7Ge3aO4cRjIUtMObalMPU5PHWckZfUnwnhDTHZndXVrhyJTW337I5DuVR5uOPoHNxJHaBUlO971DHtwKc2Pi80H1SsDa2hIbEJ5O2RWDeR5%2F7ACdx6kuMRb6EocUlq38l2k2rDRdSZGBpKRXNF5nWSio1qC0f9WjnNNtvS%2F9dxhH5l7m7FcKJtVIz%2B%2B3Oq2QObcfRx8GH2YRi0r3p%2BEKOiHAeC6tIGT8tbzfFm9FnzSVj%2BSKbGnz21Az8mr4H9IAadxhVZtC5qQ1PHDqi9ZUliOZ2Q3vKNatHR%2FWfhzSk9xvwdOzCJsLLOBjqkAT06yddGBYJh9gUvJ4xouSlzyBhazk8EVFeVbns97LNGww78TlRV78ahWM7IrSINfjEb6N6N8HfZ1GeAGf659MxvO6OaDNMcvrXAEaTj%2BmgJdkw24JjMZH5KOedNDVoK1nUSqQrxM8%2FuZzIjKCAJfbXczjv7zETEcUnYKvf6mgepiUL%2F8hYLPbgo8EFmdCYalwI9xYO524%2BmWSb3rUoWy5mb4uog&X-Amz-Signature=824e3637eec94e2ecea3619b0c2ff53cc5d3d1a868e3ee415f9f0f9c9edec1f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPX7OLCD%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaMGXF7clmu36AhWys46y9DCAs%2FlSV0bak1TATAe%2FH8QIhAIrGKWzy75GIS5w6Ca5n%2FsCc0NnqHFrwaOoe1KqW9UWkKv8DCE0QABoMNjM3NDIzMTgzODA1IgyMzkbJB38FmmGRUm8q3ANtvZnHvf6BGMrunC6idRyHmuFx8O13sHD4fGNTiQoJ77f7dRDcSuON37ckApvQDuEj0TAV5%2BVHdUcz%2BT1hH2W%2FYmCzgK%2BVVuvrcUpkMu0aCBgF7QhJcm1qEaG%2FihO%2BMHMEUQ5Tjpw56mpAS8cxJwh1LcVEpR%2BziMCLYonUirdT9EiBqlVOBIJoHfzfPDQmbvQQ8nJgUa7vTcDH1bqkDH3H33ccRCBN1nC0yuBUiHYQuDJy%2FpUCFC4fHv8kxjvEimWdHmY22hcylVQ%2Fy%2BY5Nq6Nof9MqpvDFoxEFtrSu%2FN%2BmiGOgNl8vR1pBVkLMheIqgqcEMlDUsmDuo7Ge3aO4cRjIUtMObalMPU5PHWckZfUnwnhDTHZndXVrhyJTW337I5DuVR5uOPoHNxJHaBUlO971DHtwKc2Pi80H1SsDa2hIbEJ5O2RWDeR5%2F7ACdx6kuMRb6EocUlq38l2k2rDRdSZGBpKRXNF5nWSio1qC0f9WjnNNtvS%2F9dxhH5l7m7FcKJtVIz%2B%2B3Oq2QObcfRx8GH2YRi0r3p%2BEKOiHAeC6tIGT8tbzfFm9FnzSVj%2BSKbGnz21Az8mr4H9IAadxhVZtC5qQ1PHDqi9ZUliOZ2Q3vKNatHR%2FWfhzSk9xvwdOzCJsLLOBjqkAT06yddGBYJh9gUvJ4xouSlzyBhazk8EVFeVbns97LNGww78TlRV78ahWM7IrSINfjEb6N6N8HfZ1GeAGf659MxvO6OaDNMcvrXAEaTj%2BmgJdkw24JjMZH5KOedNDVoK1nUSqQrxM8%2FuZzIjKCAJfbXczjv7zETEcUnYKvf6mgepiUL%2F8hYLPbgo8EFmdCYalwI9xYO524%2BmWSb3rUoWy5mb4uog&X-Amz-Signature=824e3637eec94e2ecea3619b0c2ff53cc5d3d1a868e3ee415f9f0f9c9edec1f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HQCASZL%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T043609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBwP7%2B1YtL31Dxm4pmbBpQlkZEWOi2b7hdp%2BK8rGk3ICAiAuXMC2nLoRV%2FjK1wL41NCp6rjPXM9tYNV2jOURgno7lSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMaVPERxouwObFUliaKtwDrlkWg1oPezCcqASYZHiAtgo010LPt4cHoC76DFwl9wiRpUfICgMRWvYThwS0ahalsJY0ccXC%2F7xqtDdC5QjDjXtmSY%2Fe%2FDCuZER6HuJLlP06bAe%2B6aoGdKbIzGHMa3O9cFddLD9B2nmRsOsb4yRUhFPIdoq%2FLVV6iQFHyAeJRrFdtHR1OSh%2BI5VhDO59MzvICyztd130hMPwysROmoIk6lYYYCSWkvetSIWRyEsmzqYYihsCstaf%2FlaqQiNz8%2FlUNkMM13wF4TZR3GrDgvXkfpadjb2D%2B3jsuxGCjzvsYCApvHSAnMJmseDSNE2HFUddu4rqVvmfoTRpGn5WfHiXRzhRef712bMZ3dSPgkxmPxlSbHXU1MBI8zBDHNAp7cZOQQXtxu7X0I6ACFBHntp%2Bnad6%2BGU39l19LYq547H%2FsGNsuBzuR%2BDmC%2Btcee1iHAf1gn53bGukFrlcqDHBlzr2aWh6WplME7cO6RJMxuK%2Frl10tlf9aKzzbgIiINrnrNppI%2Bejmng7uMCkerM3spaS4dXo0AduF4vytPT9H0hqMIwTyG%2BnyAsL%2BALEF0bFkKKghpauB6Q9YgpOQ4ocEb66FGctyuQU2jL%2F01ZFRvms6iTzMeasSZGArUeO8cIwirCyzgY6pgEUESwHKmN2HHKt1YoiFik6S1KXGwIH4V0BDvimxDkmCZmYigjrt2B8RC20mL%2BKxZ7cXIpL0hRWZU5mX%2FcW%2BiwSfgCkCcbbsZP3JJ9BPpjyq18i4vi9hSD8H07i5FTT2dPehMlpKRLLbkv3%2BrJquYTYHVs%2FY0QN312Xbo5vnqXCeljJ4JEQ3XBKad6%2BxGsuT6MZ9MKaxAfvzFGPCfJGD9EjtxYKcUyZ&X-Amz-Signature=96e659d22e5abba8083e06b256d5d22fa766c1295904eae6ac41b464cee19843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


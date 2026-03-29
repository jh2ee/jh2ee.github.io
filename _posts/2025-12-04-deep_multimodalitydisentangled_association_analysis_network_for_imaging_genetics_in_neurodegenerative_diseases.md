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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXAINVQW%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQD05yaZmx988VXILQO%2FLg0%2Bo%2B6inq9FanDfpA6kf%2Fe%2BOQIgKMbLvxGHLsSCAykbh6zGvLkWDFIqJLswjz4y2EuGT%2Bsq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDCiQmHe3UlhKmuZfpCrcA5JlTDI6v8WYX%2Bsjj7V9ajZd6%2FrBiU9tSKh0g8jKmWPWwTnTcGPPmhP2CdgqGuvnNtK7W28ibaVo%2FrdYX9hMRg%2BBC5C%2BqC%2F1AvbhlUi7GKqGebt296RkTOvXxU%2BkjX6gdbEQ6x2AhlJ%2FAQZJIozgKYA4CE1UrTgbgumU8uQFmhJ3w1erU9McIkOsG7kuqgHgnk1fujXpxqn6z4wCVnPIVSkdSL%2BmUCjzxxuZdMxxnFVQtXAczhrHd0AdLG4Yh%2BmgAUewQzFuEmHHr2R5hiSgDCVDTpO0ncKd7j9XSwWlFK99PSzYbH%2BVCh806FkdlHUHG5iTXwM9Z0CWydb%2BvLiu3AcxO8pDLuQOpp7ze7MHEAY9E77yFgW47GPq0pro8%2FwTCXz3EHWa814xhnhJjqRO8yY4ST0U56%2BNxKk7HpNsA5QUv%2F0tGzJHUnCKMwZjb0F6UeoTv4SU4kw7G3KwzqNQY%2FiT9UrCBKPjqtBHP51OQ3jEr8rnf%2BtySNhl3H3Kk71snR8pejpCsPE0gIU%2FJMdU0FN%2B3MoeB74j9KQnfKiqiN%2FSIzbhDLPV%2FfwgnXqN0hdkGoDqakp6JVXOCWHBZk%2Fy3GD%2BM8hvQQtvc%2Bl59Bq9i5bzT%2BcZDkverzHJAAikMLT6pM4GOqUB5aiK8atdq6yx8pBWuWs%2BgQ1lvpfgk0TGugnYyMXexoqI%2F0%2FGXTUhwCZReRzQSluZ%2BEDbXha74VmWWOcgsNi7mPmtPaD8gWBCyWXxZMzmfj%2FB%2BYciN17T4jEW7c5QzXMxGTLuPmFLzhgZ%2B0%2BJmreuoOltRndddgRQc8znw2a97mvsUujIIzsM3UNoTOUV4bfqhTYZk5KTqfikBaw8y4H9fMtv8BFU&X-Amz-Signature=46d03b27af8210f309c00ef06d4751141b6409743393bf552c1bac279cead661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXAINVQW%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQD05yaZmx988VXILQO%2FLg0%2Bo%2B6inq9FanDfpA6kf%2Fe%2BOQIgKMbLvxGHLsSCAykbh6zGvLkWDFIqJLswjz4y2EuGT%2Bsq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDCiQmHe3UlhKmuZfpCrcA5JlTDI6v8WYX%2Bsjj7V9ajZd6%2FrBiU9tSKh0g8jKmWPWwTnTcGPPmhP2CdgqGuvnNtK7W28ibaVo%2FrdYX9hMRg%2BBC5C%2BqC%2F1AvbhlUi7GKqGebt296RkTOvXxU%2BkjX6gdbEQ6x2AhlJ%2FAQZJIozgKYA4CE1UrTgbgumU8uQFmhJ3w1erU9McIkOsG7kuqgHgnk1fujXpxqn6z4wCVnPIVSkdSL%2BmUCjzxxuZdMxxnFVQtXAczhrHd0AdLG4Yh%2BmgAUewQzFuEmHHr2R5hiSgDCVDTpO0ncKd7j9XSwWlFK99PSzYbH%2BVCh806FkdlHUHG5iTXwM9Z0CWydb%2BvLiu3AcxO8pDLuQOpp7ze7MHEAY9E77yFgW47GPq0pro8%2FwTCXz3EHWa814xhnhJjqRO8yY4ST0U56%2BNxKk7HpNsA5QUv%2F0tGzJHUnCKMwZjb0F6UeoTv4SU4kw7G3KwzqNQY%2FiT9UrCBKPjqtBHP51OQ3jEr8rnf%2BtySNhl3H3Kk71snR8pejpCsPE0gIU%2FJMdU0FN%2B3MoeB74j9KQnfKiqiN%2FSIzbhDLPV%2FfwgnXqN0hdkGoDqakp6JVXOCWHBZk%2Fy3GD%2BM8hvQQtvc%2Bl59Bq9i5bzT%2BcZDkverzHJAAikMLT6pM4GOqUB5aiK8atdq6yx8pBWuWs%2BgQ1lvpfgk0TGugnYyMXexoqI%2F0%2FGXTUhwCZReRzQSluZ%2BEDbXha74VmWWOcgsNi7mPmtPaD8gWBCyWXxZMzmfj%2FB%2BYciN17T4jEW7c5QzXMxGTLuPmFLzhgZ%2B0%2BJmreuoOltRndddgRQc8znw2a97mvsUujIIzsM3UNoTOUV4bfqhTYZk5KTqfikBaw8y4H9fMtv8BFU&X-Amz-Signature=46d03b27af8210f309c00ef06d4751141b6409743393bf552c1bac279cead661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7XV2K5H%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQC4KCoWtV56w9WU7lXokjOP7xQfLYp83R3uS2GuFbUB%2FAIgG4rFypIfrtu40zpHm%2FpLG1bn6gkDZHUbCa4DHsr6onoq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDAMGskjk5tudBzG%2BoSrcA8L%2BHzjmh6YH0QhHWKtWxP47NWDFwlHVs%2Br3%2FmQTaT6ia0AWI0r22vU2AreOu9DvYkmZd7LZ1RSltW2Ot0hlnE%2FzErey%2FhJot9aSzTGpCa%2F5OVFVCevQKw0CHAasHR3YI5VGybo6FqTio00khJNR2zzW4bLbl1EA0z8w02lyUmVvnLt%2Fjty6VegH3WhBO7WFtmK8hQjRmaY9W3SDOopqwHOuQM%2F77mSY2aP2ramRKA8OOpNMUh0L5LPaCU2aYmnzrPbN5KpIRefkJxmL4FJMiU3YUA%2BbKlGDggZW%2FOWaHr8XZA0rACSEvfxr4iRauqbWIiqNCepdo0HT1d%2BGWljsZX3Yp%2FUHvkbWN7g1QkYbdazFYncFSqBqLXcVzlbF4DV%2Fk7OWJt397fp81i75ft3OOfu%2B32pC3St4ENjQa%2BU2WjEWILM%2F%2FnBMKzuHwR35YQ9138GFTm2sKi0Vlv%2FJN2qVRvzW%2Fj%2FnKJTe2g2BQqUlq1H0OYxnbksEGz2%2BbuZM0jaBpowveHSyLcxZRThnpH6kiepnvtqNGxbNYeLNabkSY74lIgtqPEsgGM5tbS7Z1Ep%2Bsd5KxAfyTlKTgdcwU3wnbyo%2Fo5GtyhW5MJn02TtU9yiMxC4xcn5UbbxTuytuMMv6pM4GOqUBgEW8MMnTDJaFX99Uz%2FOqbIRZat%2FLZLMw5PBr3XeT0psJ6f3c5lteclJOdxWMNy84MrvdHbEtV%2BoTODzBEAVNA4KKn7aBdG72rGWz0zjMPebGHRTP%2Fh8Qz5%2FsdgFc4wDdMv3sXpctNLjf%2BajJQpvzRujYI6Vnsi7szcTb2LASHn2P3KXSlsdF0wPU%2F53EqLi3jAxTX97L3wyjEjywwqja2PPvbS6Q&X-Amz-Signature=de620ceef26ef5297012333f8071e19f2f71943145caec5b682f2a7ddb918fb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKREMQWH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQD%2Bm%2BSc3W14vPfHDdV%2F1gTEYg2UMycM4P%2BYFY%2F1cORylAIhAMYhePii2petQ%2BYi3Xcx1Syv39H493s2%2FhrsMlDKj4KsKv8DCBAQABoMNjM3NDIzMTgzODA1IgyBrNEI67oRuYE6f78q3ANdQYVTTFsumhrx2FCna40L7RpGybdgQuDphvqOvEWnT5YGsyjfEjEOe4pQZFG7lfPjof%2FOCNP2gXzwSFlPHEenOT6Q8TnDqMCdA5ADr5vwPPgEgZKKI6F4aog8P0vGfhIiaJ2vxinivoAMkTV9Vfc4DqKpMQMlNbiKI6eRNkjXFVz%2BFJng4bEMzc0orhvY%2BhepDqd7aAE9rna3BgtxXb4O55vZS%2FJMGgDT96qP8LQN02HU18%2Fz60GtACuyElfL54mYCl45bknFdicZjGq2gHQPm5ot5vgK0QJJfI9eKSVdyy91zWLzgK5r3LOYC2B9SCxbGzq%2BCgcQeee%2FBlulgX9OPOKobp2QO9uZPryknVPEBQtHT7Biq%2BWLpNS1CFgO4FWD%2FEZWFgx3NpL2yvhYQgvEaXPclKR%2FJ6pQF9bDmm%2Bb3eJQx1MoxaMR6RNUC1LoW2vUyTpBv4RU%2FGEheUUGSLl763ex%2F0lLdH%2FSdpaNhmNu0ZSDU4AzbAH5%2B4%2B6Ha2ZCEh2XNX%2F0ywHW4fkH3VNEfOozuf2KVliwvaylgmIHuQ4tDyfvb%2F6pVKWMtdfaauBxgyl7KG0uSodZujs4BLgbTmN5QPGY64qhwGc%2FpRQbuBZtnjiOZv7IahA9h02VTDk%2BqTOBjqkAdqBcz7uL4RLcxHHw%2B5jmtThi4fpB50dSS1GiSAzJH9QuNKq1%2BkKAzaGCVvv7V5c3og1Q5cOgKr2lOfDCYfwdNRMaxBj7eBCYDWPGiO0vzbDRmRtvWyKLCijbe3oc0iHmPe0ZEx1EpvOjtRFXb%2BcAJh3XBNW07p8OI8sIanAKZxCJ2onQiF8NqSrV75u06krmMr%2F4yXspZs8WuDcxBLWfchqeLxQ&X-Amz-Signature=832a95db20e942b297d928459a0ec461abfeaa143da30ced4766114333a56473&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKREMQWH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQD%2Bm%2BSc3W14vPfHDdV%2F1gTEYg2UMycM4P%2BYFY%2F1cORylAIhAMYhePii2petQ%2BYi3Xcx1Syv39H493s2%2FhrsMlDKj4KsKv8DCBAQABoMNjM3NDIzMTgzODA1IgyBrNEI67oRuYE6f78q3ANdQYVTTFsumhrx2FCna40L7RpGybdgQuDphvqOvEWnT5YGsyjfEjEOe4pQZFG7lfPjof%2FOCNP2gXzwSFlPHEenOT6Q8TnDqMCdA5ADr5vwPPgEgZKKI6F4aog8P0vGfhIiaJ2vxinivoAMkTV9Vfc4DqKpMQMlNbiKI6eRNkjXFVz%2BFJng4bEMzc0orhvY%2BhepDqd7aAE9rna3BgtxXb4O55vZS%2FJMGgDT96qP8LQN02HU18%2Fz60GtACuyElfL54mYCl45bknFdicZjGq2gHQPm5ot5vgK0QJJfI9eKSVdyy91zWLzgK5r3LOYC2B9SCxbGzq%2BCgcQeee%2FBlulgX9OPOKobp2QO9uZPryknVPEBQtHT7Biq%2BWLpNS1CFgO4FWD%2FEZWFgx3NpL2yvhYQgvEaXPclKR%2FJ6pQF9bDmm%2Bb3eJQx1MoxaMR6RNUC1LoW2vUyTpBv4RU%2FGEheUUGSLl763ex%2F0lLdH%2FSdpaNhmNu0ZSDU4AzbAH5%2B4%2B6Ha2ZCEh2XNX%2F0ywHW4fkH3VNEfOozuf2KVliwvaylgmIHuQ4tDyfvb%2F6pVKWMtdfaauBxgyl7KG0uSodZujs4BLgbTmN5QPGY64qhwGc%2FpRQbuBZtnjiOZv7IahA9h02VTDk%2BqTOBjqkAdqBcz7uL4RLcxHHw%2B5jmtThi4fpB50dSS1GiSAzJH9QuNKq1%2BkKAzaGCVvv7V5c3og1Q5cOgKr2lOfDCYfwdNRMaxBj7eBCYDWPGiO0vzbDRmRtvWyKLCijbe3oc0iHmPe0ZEx1EpvOjtRFXb%2BcAJh3XBNW07p8OI8sIanAKZxCJ2onQiF8NqSrV75u06krmMr%2F4yXspZs8WuDcxBLWfchqeLxQ&X-Amz-Signature=cefd841270daebf2581c95a43e965ef9d472476c2e38d5c295f3004c88deef0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N56CMCI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIFr%2FBn6DZBkyOXd45Y494hYXiphgEkFJ89M4nyFEwAsxAiEAxf8FaXBDvkxPwIRQAGINnpvc1Y9ejY4LWLXENflQxbIq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDMMBr5SE4X%2Fm%2BQqnLircA21LTXqkO2nwWtihz4zGZNxt09wdZ1zL9UTfI%2Bi4ftKmFK1KqORKvGbauOBITnWOsptxJG9dB29NoZRROTJeZuXKU9EscMmt5mDkZsEzYDKzr7BrpOCB9E2xOcuH0SylL0OPzz%2BS8TbcKU%2B9xU4JGHTDTELQCGHxYo%2F%2Fse%2Fc5mFtx3bCCbvUErknCCrSgbWazX%2FQJDkgDWpaG3QEy9FH%2BeCNa0xnD0W7xKFHFtAzPDsGOJPAwxPJQ7dPumidmEG%2BQiA7FpjLqYjo7jhy2KaB4RoNjcz44eQx%2Bk8gtOJMSDsAnM74PYBWDV5PbKplrF7Q58%2B8fxZM%2BFpclX%2B5z4Z3dN8zb3WHCFv9PMnyahpndNp6MG8x2%2FYh6VL2BIMZivehOdJWRG%2B%2BYJGWWRKPthjpEgj1Q0qDUPi40TFr1OvxKRd7mVENeej%2F4NjITXjHjyXfW00u%2F7U7PASf5fE04NmWaiEiyxvvWqu5D0ee0Tof8q0Sf%2B%2BypaGdJTuZxBHkFXrquk3q4ZpRyVtT%2BQjhNvgR74STi1Up5eYd7BAlT2ZAIQLY3P2Mst5DjVhLzU4DUKisw4xXKIGCN9f7EJu1zDwAgO9PXWClfzzUxKRKftimjO2TFsJ%2FKGggVe71X%2Fq9MLn7pM4GOqUBNXCTsSPcKiAV7bbLJIXTROmrjNuD%2BcBwweJKiljePKk9nC7h6OuGG4mqfY11hEsYPQKPr%2F4Y8u5xAiJ07sazJ6aQENASZCdpqDUi2wQOrGO3%2BDPpwKb7%2BB51cp0vBKLy5UKJ7FzqH9GQ%2F4OpUTJ64oo9JfHX1abBwhDd64zZ%2B0Zu%2Bb%2FONPSRZ4NjBitKjdRw0O3c2W9XyfIdwBDUHgm4XeOjv8px&X-Amz-Signature=6275aed433a65aea6a80900be43df516612a988758861528d8a7ebe71ddd5c8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIMXSBHX%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIC1p%2FNIEIfje%2BcE%2BfjKCIExYQeXhhgiJaoO8szb%2BSqZUAiEAwhEegCeGNfq8OXcHv%2FD%2B9dgpBAj9dPehk%2BxAysHhpuAq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDIhow24HtuDtV%2Bp%2BWSrcAyQe2ZekNw4baYCak4yT4mERGAbCZhnw95pPT%2Fe2%2FkdxiIHBs6KWneHHDejDf0RZG51NbGHU8N9gtqxX1ZrlVL0Q%2Bsg4eP7%2BXWGy3M%2FCNiYP8b3YHKCWPyjwftVy%2B%2FZjif6%2Fna%2FrpLEHQBkEAbS22ymyAStOYM2GBBh54Yj1P4dnldJ9bJQ5q7jKhC57wSJs8maN1mPmcy4vraub%2B%2FiHTHTOwMT2JWlzd3E1K8utLcnL6d5HC0sJ6dq4CIwxGhNAWBRJh0wokSBdSYGzgWD7B4k67fKDeStx9eNLTfBzdyo%2BWpVSggVZjv9yKYZBnOZNqZ5elA8Os1NhOyLWzTdS1TY0AbMSmzd2gJQhGO1GTWI1giNfeFWsYLr5q3BS2EodCMqYWGk8cJjvSciNIty5d96evsFVQ%2BuS4jhMm1J7mQ%2FEafSVXv0Ny%2F19cLM4kN7VzikAd0wUr5%2F%2FXK8kUUwewB%2Bxw6vOMKSJX0ouL%2FrdMBkCOA5QNV%2Bx7j3cGwi%2F4ZYsYEkzmxYemw9XLKgzC1HsEsZlkyqN7jYcOV82jUqZz0e%2BPhGpDgqlXUiGd9WXavNU%2BXtLJzfxtAITrJUfFVFth3pS%2BET64e6QZla5ofpfIG1whkx9ichW5P70VHw6MMP7pM4GOqUBCYzqklwf84JPIa%2FIUn%2B3a1Rjr%2FwsHmS7d9mQYJkzNH%2Fwmc6vWm3C1vTD%2F1Z48yZhQ%2F6u2wNeo5YdqicpUDXAZIM0n0c9ciY2GCDHGAO7hmWewMBkpLcvu1weJthJRkSisyN30QXRbg3yzEqH8Mw8%2FKyqdJw0fe7y65ldjbb3GKVTfHByodvAExrY9GvSQp%2BpWyiPjB%2BEpYz2sHG870R68Njs%2BYnj&X-Amz-Signature=cbd3fcf5a1dff036c24fc126760e8a42b2cd6c835d7ef29abf919ba832c0cba0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGGF2JGY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIGfTJ8zJH3BTupVa8VyjUIYSBgJ4eQHpgAVgrZsrFrPtAiBAKGi9AS8k5RPchOrs0EvN9r7KTyQZ6Yk%2FlWP4gmlSuir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMIQyfbzEPJO93cPS8KtwDlC1gsBZW9LP1GlpMCdPhc0qB95ArAhzdv6EJri03Orkjpo0n%2FqbkAP1yjBe1nUJzUaCxmlbHzVDAKLvb7u2VToRq1fmFfUu2xosw7QDxB%2Bfp27xY%2FFPJbwiBRHYtmw7N%2BXbzRHiIOh2Upm7pYFTMCm5j60LY68NAyv6TzvCeKZXRVFBfhHHac7OIVjw5mDLG8UGFtHOUFdGm%2B0QKm48qSM0aVi9LHdX8oOACy05XXNvcbDFmbbe4K0X41lY8HTLLlPPEF3a9pUpc2pbDNzS%2BRnceaE1et8v7N9kdEx%2B7Ke1QahNvrXLPmyF%2Bv0tSRQookVTZB3AirtQUPZRtDUTnGHSbsT3KQ2RYI5GWM1Ra2Dmhri2Zyr2pAtJlqqI2uMs7JvmqPgcDZWEMaXQY0dPQgf3zTRGpX1iMWkJJ1mqBAjXXo1Yu0ypj9UQBLGyDNdFlejOqt1X4buOQJqf2%2FKqn9Txll4MVNb%2BZPqVou5Na7koaLpGPFrJwL11kBW2rvMSr1HPngGRUuHOEGymEa%2F%2FeyheEDjoVlBzpjMM6d7iRwuMb84nSla20ypuurS7UI2UUOUSk67B7PkYA5krbhjPNwmY%2BJOeOoGk9qdNJjc9YNSOb9rQJyz0qcyO6INQw1fukzgY6pgFg3P6uFOD97MoYpZk8oBUGcHiVMMRKpIqz%2FMHlSSpAAjCyk5kZfJnYXjuz2NVI3yvVms4pnU3%2Fv0AhSE3%2BXF3FiJZ8IW5uilehPMaSppIGl1yUF348AqcH4ibZLHVIzbRFMCR28wCBrDKIODJTMs2e%2BjI8OYrwEFpOWsA1ZtOcv0Px8O%2BRZgtg0U%2FPKQbGlQIMkffOsfkiymleYbf08WpGW7aX%2BccZ&X-Amz-Signature=4e16b1196721af01dc66b704fa97fb4f3c4944128cd527a09834a243f0f6d7b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JBC6VIY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIC%2Fu9CJEc2cmbZ2YAQZG3MlPkV9vj9gUZd5h6mGspDNjAiAiJdeJWdbNJf9wCNApWTVlzygXf3iigGkb85BsAG3Sgir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMXGqeyLifKMfwZ%2FEuKtwDTIVvFIGNmBDjqV%2F1OgT40yRxopHWaH9fGPXgUv%2BOau5Et58mGjXiB0XeIeczVCI4%2Ftt6TeveN5oa7LuYZF8NA8CAAJswhPA1XmKZRyiuEW44gQR%2Fjgk5%2B1pobEvkI7FiyR7X5kqqR9cuoQCj1uhUIYqNiEwp4ElCALD2bfUBfEbNxZWejzq0daZhA10lfqn4W5Sl5r%2FmQ%2Bw35wQ52RqqY0EgEinfPtXQWpoXVYl%2BkmF8EM2mOUgJKc60eixW26dds9A7xMSWZfta96XRzOfGkYuoZaKfS4mupsgHsJ5pPFzZl%2Bo%2BNMKG9%2Bllspj0b%2F2NLX09D2Jp%2FfD2NjR6YX4BN3ak4Hz3BW5VMRmNQCdBiFeZT0SvA0eqXYoCsT%2BTuwBTXS8d0q3PngbG085rHF%2FOPoQdAYpIzY6dL0sn5ABcqnLop8g6mXBH5LuEsf69ETAY4M41eOwkUJsh89tSlbtE0KTmqJbHoFq2rBZL6eUZC%2Bp%2B0zVZjnmRH3XG8KF60Ldc1%2Bpj5G0jbbx34Ey1kISUV3xiFsle5YeeuvJewZz2MyClCobuVve1yZbNpglf1Lh3rc4VTgXWPVQHGWukxpoghcjXRztUyWwCi2ICIcfaOAIJlKKCXRIx6u9m%2FpEw1%2FqkzgY6pgEd0%2Fjn2Ozt0yY%2BHMtQATH%2BN%2Bav86eKDYM3SrALuIuwF%2BXImrqKAzowQiDnEUIa1tOYl7EgVM5X9g2CfBNDKKRi0LkJeY5fOrTIN7vE9Or5XabIp6LwLgdjdjQYcuMuUs8KqzWYs5O0s4QotsnvPs48xhRN8PUY2A3r7uH8UT6XYckiscHkPvGNvvwEZ623LTBVbNOzN%2BktSggJMmMfDKD%2FVg2JH9ie&X-Amz-Signature=9fe6bc8d021ae12a483cce6d394160d28515ecd081b88099e2c126dd8ee56fa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JBC6VIY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIC%2Fu9CJEc2cmbZ2YAQZG3MlPkV9vj9gUZd5h6mGspDNjAiAiJdeJWdbNJf9wCNApWTVlzygXf3iigGkb85BsAG3Sgir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMXGqeyLifKMfwZ%2FEuKtwDTIVvFIGNmBDjqV%2F1OgT40yRxopHWaH9fGPXgUv%2BOau5Et58mGjXiB0XeIeczVCI4%2Ftt6TeveN5oa7LuYZF8NA8CAAJswhPA1XmKZRyiuEW44gQR%2Fjgk5%2B1pobEvkI7FiyR7X5kqqR9cuoQCj1uhUIYqNiEwp4ElCALD2bfUBfEbNxZWejzq0daZhA10lfqn4W5Sl5r%2FmQ%2Bw35wQ52RqqY0EgEinfPtXQWpoXVYl%2BkmF8EM2mOUgJKc60eixW26dds9A7xMSWZfta96XRzOfGkYuoZaKfS4mupsgHsJ5pPFzZl%2Bo%2BNMKG9%2Bllspj0b%2F2NLX09D2Jp%2FfD2NjR6YX4BN3ak4Hz3BW5VMRmNQCdBiFeZT0SvA0eqXYoCsT%2BTuwBTXS8d0q3PngbG085rHF%2FOPoQdAYpIzY6dL0sn5ABcqnLop8g6mXBH5LuEsf69ETAY4M41eOwkUJsh89tSlbtE0KTmqJbHoFq2rBZL6eUZC%2Bp%2B0zVZjnmRH3XG8KF60Ldc1%2Bpj5G0jbbx34Ey1kISUV3xiFsle5YeeuvJewZz2MyClCobuVve1yZbNpglf1Lh3rc4VTgXWPVQHGWukxpoghcjXRztUyWwCi2ICIcfaOAIJlKKCXRIx6u9m%2FpEw1%2FqkzgY6pgEd0%2Fjn2Ozt0yY%2BHMtQATH%2BN%2Bav86eKDYM3SrALuIuwF%2BXImrqKAzowQiDnEUIa1tOYl7EgVM5X9g2CfBNDKKRi0LkJeY5fOrTIN7vE9Or5XabIp6LwLgdjdjQYcuMuUs8KqzWYs5O0s4QotsnvPs48xhRN8PUY2A3r7uH8UT6XYckiscHkPvGNvvwEZ623LTBVbNOzN%2BktSggJMmMfDKD%2FVg2JH9ie&X-Amz-Signature=632e464f5cebda83e45b0e782ff12e2e61869501352de7858dc33bc6c83ab43d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664R57S4EA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIGGGbqLsW1teDnoOr7yuBQgu1FbSoT8VhM9DR%2FvY4BmjAiB79c626A9nG41oleASPyl1O9JrThy%2FB8ckjyyCRi0e6Sr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMic1vtQYfkwkf7D2GKtwDURbcKx0JmOFRpfllHbVOA41lKY1cG4Ffll9uGhRM4s6npOo00mUlJYrbm8fU1o8GBEdydcnJYYGL3NssMn3fqq4ekujL6iIp58w3dIZjkqY%2B8rPYN2SLiR8%2B2Nb5Y%2BOU1%2FjW0ZM0YTTLDr3rvZEuQ6nTZ6jspHNj4QxZ15dpz1Pxhf8Bc3m9sQDdpHc3uQEzpukN26koSZI77xGL7FLx%2B3GG5c%2FyOc0Ymd6ZDsaMZ5obK7SfssexMyvA5VvQVAoGSF4S9eHy9n1Wbni43oV%2Ba7c3HuBfVD1aghmbTe57jzn2p8QIkvzA6KnFjopZhRp0ETbTKR9Siwftm0QbYdJPXS44%2FE4kQ1l613d2m6rNW2aCOzP4ImqQhVfr%2BzP8zVUVWvViuiF7t4BtoQbu8W98kaME1EDG151ET03njDwRhDSVPNL6FbrVtsCNXyA0ReIfJOuQGbuzh76GpI2Hcn55FgE7YrIm64HznF385uJ0g2yRzzRJDCTwW0qWcjcwkEFPgmLD0h40KYUW%2F1fsGymbTfzLQpkauPN5klnZns8n24JEJ0ejjYQXlMbf13Q62%2BXs7I7rleY8yQkR2cn9RUvAqr58dSsDUXdv0LG3%2FrA4V8WW6QoNMPKZCSqp4x4w9%2FqkzgY6pgGh99RwaQNZJCEU3MB16UL9aGcFLP%2FEen10M3yaTdpfGMxX63zCjXR%2BxKbnPVqTElZfZFoPQBHhMiI%2BGVho6UzpYpVVdVZLzmT7%2FqjgtKCr0AAW%2BCuB8xdPMtDs7q3CUC65QR9mcVcf9jtnB%2F%2BvQ268BDrXjwH4HBue6Sbo3N3dAjR%2FK4icAmZds7nwuEFyiN0bisUUaNf3T24FZB4tBTWpXvRYaBy5&X-Amz-Signature=16707bb611b875cee64b7f7ce717ef47550f80ab87b72f129e7642bdb62fa05a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX4ZRLCP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQC8zlFZQlclP9dz9oMts%2FD2uF%2BRL98SxWcrbnWjfb7NTAIgTpLw6UtsY9C2Vvd%2BHtust%2Fg4CpDl7CHbdncnfxxRVK0q%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDC5hUinY7ajkMMm26SrcA%2F9Dk1miFppOUXMQAEiow33vd55tA4FLo3STTmYtu%2FDfLOqK%2FQfAbWxchAFoQ%2FMyST1mEsQ84yh%2BMVr0Sd6fso91eMo2AEL1gB0CSz%2BNud0ePJWqmRjSZAROHkjdrweR5VbW6xR%2FCjtsIvVzEC%2FBK3RBVOPCdj%2BMUxD1ofohFQtXqUEUti0DqKy9KFNQA785R1Eg9R8JKMrQ9bdJCk9r4ZsI5xgQb69TC3qIe9xA5A2CYKU0IpeKBvNsBeIpPVOSydZBugM7%2BZt0Rc2oBCuf8VzbYb93OIc%2FhtLP9mZiFF4AsaRzy6%2BybAGPLMgGTNe393z2bDwPQJH5FmBv6BQjqzgFwMmpmV5Sc7x9m8R3CclsDzGHeu0qibadQ6fKRVskPADmEs7kEIX1ea%2B85VV3mfgesncvZDlyJ4Ac52zKZHAvQ9catQr%2BQPW%2FCJyOGFNH6Yzs6Waxl%2B3V6Djoe4%2FATJHwWE%2BkhwYAZjOlFzSou1a4U%2BBgaOPNSSZALduL4nuCUODrF0RoT8qubsIsMRmVa7j6nUdoryQhuWR4M67bv8UaJlz2QSVrMN5ME1bw59gMHIb2pRJfBf7pUC9PI1kOg8rlPKDExEvfmOXQFgBU1t4KPk%2FiRIXqqWvcrmicMML6pM4GOqUBKcVZSx0jZaCKr3eZ5rjkSvyTfzrNERWZyYGt09ErUmgFj%2BlRJ5zH7blCQjmQI1odQ%2ByD4RFxSpfEIug4APIt2m6CvR6lyi4lZ2F6XTBm996xCW76WOGd51JsTUvWCbVj9LwjbSbXkI5OJuEdZ26yGXklMJ6BX97x%2FwFeZoQ%2BX3BfkaVXVLrwdR%2FU%2B%2FvE%2FjeknbdtbIzH35Fzbpi6xOZQtQ9o46%2Fd&X-Amz-Signature=99d78405a5c205eedb845d2c2bcd7315977e07996d4f38ebe7d853d30a0b631e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX4ZRLCP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQC8zlFZQlclP9dz9oMts%2FD2uF%2BRL98SxWcrbnWjfb7NTAIgTpLw6UtsY9C2Vvd%2BHtust%2Fg4CpDl7CHbdncnfxxRVK0q%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDC5hUinY7ajkMMm26SrcA%2F9Dk1miFppOUXMQAEiow33vd55tA4FLo3STTmYtu%2FDfLOqK%2FQfAbWxchAFoQ%2FMyST1mEsQ84yh%2BMVr0Sd6fso91eMo2AEL1gB0CSz%2BNud0ePJWqmRjSZAROHkjdrweR5VbW6xR%2FCjtsIvVzEC%2FBK3RBVOPCdj%2BMUxD1ofohFQtXqUEUti0DqKy9KFNQA785R1Eg9R8JKMrQ9bdJCk9r4ZsI5xgQb69TC3qIe9xA5A2CYKU0IpeKBvNsBeIpPVOSydZBugM7%2BZt0Rc2oBCuf8VzbYb93OIc%2FhtLP9mZiFF4AsaRzy6%2BybAGPLMgGTNe393z2bDwPQJH5FmBv6BQjqzgFwMmpmV5Sc7x9m8R3CclsDzGHeu0qibadQ6fKRVskPADmEs7kEIX1ea%2B85VV3mfgesncvZDlyJ4Ac52zKZHAvQ9catQr%2BQPW%2FCJyOGFNH6Yzs6Waxl%2B3V6Djoe4%2FATJHwWE%2BkhwYAZjOlFzSou1a4U%2BBgaOPNSSZALduL4nuCUODrF0RoT8qubsIsMRmVa7j6nUdoryQhuWR4M67bv8UaJlz2QSVrMN5ME1bw59gMHIb2pRJfBf7pUC9PI1kOg8rlPKDExEvfmOXQFgBU1t4KPk%2FiRIXqqWvcrmicMML6pM4GOqUBKcVZSx0jZaCKr3eZ5rjkSvyTfzrNERWZyYGt09ErUmgFj%2BlRJ5zH7blCQjmQI1odQ%2ByD4RFxSpfEIug4APIt2m6CvR6lyi4lZ2F6XTBm996xCW76WOGd51JsTUvWCbVj9LwjbSbXkI5OJuEdZ26yGXklMJ6BX97x%2FwFeZoQ%2BX3BfkaVXVLrwdR%2FU%2B%2FvE%2FjeknbdtbIzH35Fzbpi6xOZQtQ9o46%2Fd&X-Amz-Signature=99d78405a5c205eedb845d2c2bcd7315977e07996d4f38ebe7d853d30a0b631e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLJHUXP6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T151832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIAwVKUb5U5%2FyN7nGQRYfi%2F4K%2Bj0EfzRgU8Vrb26cNFMnAiA97t9eTS74p5cNMBHzvPX9%2BxKT3P8EF9MBYnUguhjCZyr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMM04asfTK2kkMEefoKtwD42Nyiitc7NF7Oz8ALSxUQavilo2kIgYI7pURaR73i1qUSyd7jmKn8IfX9nKJmhVpkqw3Yz6hJGv7ck4XkFljCJsBZx%2BmefPOEQS89zX9oVPmTzf58zMDoTrsRO63FMn1t3Uj48wO5DFfsGd%2B8ejWYoWVx0fAoffVIqRsOGaYTe4H7%2FJWfqUiyPMzTjtE1E63K7uV7k8IDf%2FxyumZXGzWsNa%2BDySN1SqRG6h5aTL0q5g1kUGPIJrgKlmcJUiP9fksbUuR12Mtc%2FdgSmj5Y2TRWtHNx3Mq2nOQhC%2BwrLJVscBIyqqNp6OoG6PjCBXelXO6jASCMPXX5G2%2FcvMesWQmuVTAwOC2G%2BxWKEaQtZzcJD5i1oRI5A8uVimmGZzVw8PQxe3ks%2FhQhCVuEI8xkIMxbn%2FXhraWO9fLyDc%2BINrHOz7LtcfW7JF8eMdHotC5DdetuHwMVo5e8J1s3K0rKzWXJOhXrDQZaG0Fkh6B%2Bi163Voqvmsxy9b68e9uypgnrogif3O3NjWvfI2A%2F76cv1VTp8T4X7qcygX7RHXnCf3dmhKxmKXmUabxiCGLm5M7BWxXGe3kWFl4zvc08GK%2BLQMIe0wGpwrenFutdcGguAboSq2FUBlUqtjwqTjTEEcwsPukzgY6pgE8WtpgiOK3ObA%2BUVcCktGTjumOaZaZ9hfynmPBBu3aeSTyTyANXNDX649Isod%2BoXXc7LSt7EWANqLTs3Tv8GYfYa2YOhmd%2BuIGTyYmfNDjYkRQIdV0laUbMv4bAyrfwd%2BZ2b8E0jIaUTSgXFB0fFa7RMj9jGDEwgB6SHbh7OtbeSX7q5jBJB2UvEUZzUz7YYqpEmtKF2tlFS1EMUPmEGUi0m0eZhYu&X-Amz-Signature=858d548d227fc37f562023583d7712a57717966af81ea77c13a51690b140a315&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


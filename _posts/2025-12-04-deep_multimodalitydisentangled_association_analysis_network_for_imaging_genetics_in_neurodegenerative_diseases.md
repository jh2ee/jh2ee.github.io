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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7G6CJQM%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIEaae0i0sRwm%2F0flQsKYWJbaui8hT4ohhYrh94S5tCd9AiAQEXRqGPzq%2FPGn7zNjAM3KifgdzuqXpoUsPeTXjk%2BBQCr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIM8LwlXFzrwoQ15cPsKtwDImMKgJarCpxK1Wc1yKq6sRytT29w87J%2FrYihk94iw0N2F04wKkrofJ%2FVZVQN%2BRXGY%2F9Kso%2ByC5KYErn%2FtdUhvztmWIMUTIPeFdGDhkds68PbibQ%2FmXl%2FyK0qk0TXaob4b73W2I4BMUkGr0gozxNm%2BqBeApNR8wYgbWKjuvoIgap46abFKyvjPjK2SzlSIio9UQ%2BqMfJPNBWFX7%2FRkOsAd2H8FVyRxIBDctmL6eBX2X7GU1HYOwosFAJ5M2pFPOlJcdqitu%2BewgR83pI4gWGSkBYfQvlDWKTU4MKRhISfCk0QG5%2Fbrcq9gI9tpu8tWxjD3a10UHpBHdmo4DtmQ2Q%2FApwxh0GJhWjxNg5CdpFlIJ44bcH5heMeBnjya%2BF3nqNoMwG17to1%2FZis2ty4W%2Bt0yGNg7xGltJ393QtXQSic019NVLc4dlV8NsVJqzZOq8x2Fg5CphIoygb3IKnAJgM%2F%2FsOMljuBdmZRK0ms68835%2FSfMG%2BAbYKNcHxGFdohnz9jpag6GP8%2Fnm1ZZq3TUsV9Kss19ZfId6ioVJn1jnhq8kTPmUk7x2RUYphAVvqmIuraAu%2BtwqsPX%2F%2BkniGqUWvd4iEt3ujRO9r%2FViKV%2F7D6EU7k7%2BpSGlVsfA77mM0w0%2BKczwY6pgF%2BVaikCjUwsKg5ey8UxcbaGF%2BRj0q6xEzNjUdJV8CkdumEG0HV6gpDZX%2BFv4fyLRV4QNczZAJ5UYXLSxnb8SGrOF4WyjIOE4Xd1oOKFXu9ErQb6CPvegCRpx%2FY71pmBTKFcXIlqRWPo0FgVDlSsWNDhTUo1Wqvf7X8rjoDyaTarrHhRgsAxUyoVtStFgRpTdlGe0DWfN6ZCLSN8vX0o6YmH2bcu3GO&X-Amz-Signature=32b60af35693bd400b349c50f291188912180cbe79af37a8c883ba95fef9cffa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7G6CJQM%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIEaae0i0sRwm%2F0flQsKYWJbaui8hT4ohhYrh94S5tCd9AiAQEXRqGPzq%2FPGn7zNjAM3KifgdzuqXpoUsPeTXjk%2BBQCr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIM8LwlXFzrwoQ15cPsKtwDImMKgJarCpxK1Wc1yKq6sRytT29w87J%2FrYihk94iw0N2F04wKkrofJ%2FVZVQN%2BRXGY%2F9Kso%2ByC5KYErn%2FtdUhvztmWIMUTIPeFdGDhkds68PbibQ%2FmXl%2FyK0qk0TXaob4b73W2I4BMUkGr0gozxNm%2BqBeApNR8wYgbWKjuvoIgap46abFKyvjPjK2SzlSIio9UQ%2BqMfJPNBWFX7%2FRkOsAd2H8FVyRxIBDctmL6eBX2X7GU1HYOwosFAJ5M2pFPOlJcdqitu%2BewgR83pI4gWGSkBYfQvlDWKTU4MKRhISfCk0QG5%2Fbrcq9gI9tpu8tWxjD3a10UHpBHdmo4DtmQ2Q%2FApwxh0GJhWjxNg5CdpFlIJ44bcH5heMeBnjya%2BF3nqNoMwG17to1%2FZis2ty4W%2Bt0yGNg7xGltJ393QtXQSic019NVLc4dlV8NsVJqzZOq8x2Fg5CphIoygb3IKnAJgM%2F%2FsOMljuBdmZRK0ms68835%2FSfMG%2BAbYKNcHxGFdohnz9jpag6GP8%2Fnm1ZZq3TUsV9Kss19ZfId6ioVJn1jnhq8kTPmUk7x2RUYphAVvqmIuraAu%2BtwqsPX%2F%2BkniGqUWvd4iEt3ujRO9r%2FViKV%2F7D6EU7k7%2BpSGlVsfA77mM0w0%2BKczwY6pgF%2BVaikCjUwsKg5ey8UxcbaGF%2BRj0q6xEzNjUdJV8CkdumEG0HV6gpDZX%2BFv4fyLRV4QNczZAJ5UYXLSxnb8SGrOF4WyjIOE4Xd1oOKFXu9ErQb6CPvegCRpx%2FY71pmBTKFcXIlqRWPo0FgVDlSsWNDhTUo1Wqvf7X8rjoDyaTarrHhRgsAxUyoVtStFgRpTdlGe0DWfN6ZCLSN8vX0o6YmH2bcu3GO&X-Amz-Signature=32b60af35693bd400b349c50f291188912180cbe79af37a8c883ba95fef9cffa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DFD2GGT%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDCjmtPlM0myH%2BGnXNm8rDrIp8mLiRugvj598hK1W7EkgIhAJr8eL%2B1uIYmTCZOoK%2BWg1debVtPtsGMR6GZSX5Dd1LdKv8DCDEQABoMNjM3NDIzMTgzODA1Igx1sMIZN%2Bq4NKIZ9CUq3AOuK6JghcvCIOacAZCdRzIY3VKMqWjnYZv2NQ67zm%2FuJZa%2FMDRKF2QrbKOi6ORWPGn1CNY09Owui9QCdLivvt4GBn1f3Bl%2FoUOJdoViDv4jU9czCOlFBN2wgUH0TlI1UO77flg3qRIjOzeSeiQV0TXRtoiuo8gRQ2wiXdbJ8r921d8d8qFF9eqOprd5KnlUdZY6fO0ojYHc%2BckFxSeJynhDfZ%2BU5UugxfJ44HZcGz9TuDTtalcfktKrM%2BEmAZGNhmGSsz0tKF9x3eo1ubm6TolWdirZVILsCWPlLQCBOPMdxyBMXvWAHTvNRzHMo9h%2BuYhFcdqZKLVBtxUwut95%2FU19gGf%2FiZ5WDMRuyX9iTXrkIaMzo3cYJ59k0%2B3pw%2FoUeGnuy4vaXcCFwCxhYHMGatJw5HDtXNqK2d88N%2BBXXoBcoWu5Y19kmvnRATAr815Mtqy3sm%2BhGLclp3EWMpVyX6rGlzZZzXv5XtREGmzh6P%2FKdfZlbhTStYd6tBb5Ow7M1pDJEsfwJqcw0Uk%2FGvGGF41xYmjCYfeFkgSsj7FtBRja4xfxEEkfIfZs6xi76nIexe%2BShuVbXGKDQQGNQEtKF10Yj4oNsRqDKhIQz7LCOTmHHkZlZYiTNFWH0MRDXjDA4JzPBjqkAbdJjUce3rPmC9Kn%2F0APAsoAkFzN7VH5wTz2GuJcadt%2BO2vVajZMTpqtC295YzmjsR%2BAHrIqVf3OnhaaBQUr5wHUEgktdUxKO4n1AKh0xxieBDNvV9uwJuzJqo06ibI56D6eaiPpmgCc2Jk1v5u7YLb8sZkMjMr2WqiWy2mkoZJKDwIswHYV%2Ba3wNG6SQMAOTago6a2Rom3xMBWtQUhYnLo65kf4&X-Amz-Signature=d5d05bb504a9bf1c8ddfe03dc0d006665146bc80f12240d4d58cbedbc74b3920&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKYPX3KC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIE%2FEoKUffN3vrkHtbjNcF4VeRUoekhk83auDGI9%2Bdgh%2FAiEA2nfVPsEBJCQnLSa23hq4BoSECWgtgN89BQKcTa5F07oq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDMGFJX0%2Bh4bYvpLmtSrcA7GHguATbTwWuHobBdMHh84H9lmOqier1mwEk7QrXE3oSSQWbcAlJngF0GNQqEdRAnQJOMOE%2B%2FyU6ehz7FzpsEGjqpm9q4pPRN3Z4ww2jcdZjNDNW7uN4Z0R8xWShVdE%2F3p7pvLHVMR7sS8bCaG5hdAtdz9EXGW2tJyf5eeoMNCqTAR%2BhVp5DzdF9pJaNJZgjrEMEN8YSiejhlPa122nMSk7Rskumv4n0WkoFW1b0AuKe7AOLxiok%2BNHCLiwxklMifRat58zSs1ORd5PPfTNLdRZ%2FUpJ5HxnuTnF8g1vTUU8UTcBdd4wdQIdS5U73f1p8BIHqI26a0ICFES3V5NRRwMSnYCK0Nj6j9JrlpvjdiJbPDTDC9iU%2F0anHtC0zqHhIKfjA5F1ayW7gLFxauwmXLoKuucynWvFK1QUhyJIG%2BuwzJ%2B1ckgd9mGVkYosHySt3YMoTMsXNcfGfqyKNl7RrfB%2F3V0lGGmV%2BszfJbqG9QkFAqiE4CMEupyK7OAn%2F0QYw302DTFN4RjuV3cIjhxGsklkvwwIF44XeL4%2B40lZ0Gz80SUwoq03FZ98o6KwBbS5tqiPMK6q0GNHM5%2B2wS8tLRGfIZklEDFgzCJ9edomw10mG860PlI2%2F4u31MwWMMHjnM8GOqUBreOKLQlQvAHT%2FG8e4nY3p1IEsaHfl8%2Ff%2FdTtFOpHw8bum4SHTt%2BeUJushJO8zhgG462QRgx9wlSFOyGunlMzvmg2BxHI1osvZXiNOHOwG%2FIUpKJmb1dbICn4hcTQ1yuEF3svT%2FbonIiClpAfZD0h2NO9wS4GzEzG2GnEKj33wozbGeytobht4LJ9bBcCF326piV%2Bv9lo1ithUPjQvYxfuwCchj52&X-Amz-Signature=5c07672f09bf7ce042e21cc17e03c2e243fdd09a8ded6d11a2232cec074f5b4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKYPX3KC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIE%2FEoKUffN3vrkHtbjNcF4VeRUoekhk83auDGI9%2Bdgh%2FAiEA2nfVPsEBJCQnLSa23hq4BoSECWgtgN89BQKcTa5F07oq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDMGFJX0%2Bh4bYvpLmtSrcA7GHguATbTwWuHobBdMHh84H9lmOqier1mwEk7QrXE3oSSQWbcAlJngF0GNQqEdRAnQJOMOE%2B%2FyU6ehz7FzpsEGjqpm9q4pPRN3Z4ww2jcdZjNDNW7uN4Z0R8xWShVdE%2F3p7pvLHVMR7sS8bCaG5hdAtdz9EXGW2tJyf5eeoMNCqTAR%2BhVp5DzdF9pJaNJZgjrEMEN8YSiejhlPa122nMSk7Rskumv4n0WkoFW1b0AuKe7AOLxiok%2BNHCLiwxklMifRat58zSs1ORd5PPfTNLdRZ%2FUpJ5HxnuTnF8g1vTUU8UTcBdd4wdQIdS5U73f1p8BIHqI26a0ICFES3V5NRRwMSnYCK0Nj6j9JrlpvjdiJbPDTDC9iU%2F0anHtC0zqHhIKfjA5F1ayW7gLFxauwmXLoKuucynWvFK1QUhyJIG%2BuwzJ%2B1ckgd9mGVkYosHySt3YMoTMsXNcfGfqyKNl7RrfB%2F3V0lGGmV%2BszfJbqG9QkFAqiE4CMEupyK7OAn%2F0QYw302DTFN4RjuV3cIjhxGsklkvwwIF44XeL4%2B40lZ0Gz80SUwoq03FZ98o6KwBbS5tqiPMK6q0GNHM5%2B2wS8tLRGfIZklEDFgzCJ9edomw10mG860PlI2%2F4u31MwWMMHjnM8GOqUBreOKLQlQvAHT%2FG8e4nY3p1IEsaHfl8%2Ff%2FdTtFOpHw8bum4SHTt%2BeUJushJO8zhgG462QRgx9wlSFOyGunlMzvmg2BxHI1osvZXiNOHOwG%2FIUpKJmb1dbICn4hcTQ1yuEF3svT%2FbonIiClpAfZD0h2NO9wS4GzEzG2GnEKj33wozbGeytobht4LJ9bBcCF326piV%2Bv9lo1ithUPjQvYxfuwCchj52&X-Amz-Signature=ac8ef7c0854fd3237e8145825cb9f0cdd60e857bca69eb7cd936e7ed7451ea05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3C2IQKZ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCnMqJX%2BKEeM8Es34KTYiPHjxS9prabcDBqpyYlqKjGXgIgfPkomXA%2BbFdu2LYDWQXOrAI6vRPU9v73Lsb8Q2yelycq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDIgsTCJ%2Fz8yLscLSuircA%2B3hquDROIuL%2B%2FjC9YcYJBjcjHXHZeQL8lkvcTKjQ6xn935PC2hAypRJtC7gdOIZf0aSEkhiSNvgbzS63mHWHgqHgH9zEggdHxICmAXXDuB8Rup53ItsQLd6rnZJzuXJB7%2FnMEQSLcmFPPDIqexHQ%2BJmI9s8jcnEgr3lqM%2BE09noBtPk5MlAzFV4ilsN6U0vYNgb38w%2F4t%2Fiak4%2FepCSgHiwcMHPk%2F%2BEGszlmygAUhXVxqterdeGXjlKFpa4zLIdKhmMNbCPXRWGxjtEBzocs5vtsqZzq0CYXA6T4sxq2UCaWP%2BCEAqe5q7K3vfdiKFmgWb4wIPqAMXnTwVs4Y%2Fj6GJIwzk1N1JmD2tZ71l39wzd8K9mC7zXhIlOHpdJR0lF41X4ir74NCy%2FeP1NzWNeCmBIOPr7mTBKxpx%2FhJry%2Fr6k2ZAfQhzy9oLRyvAWWLc%2FHru7laVtdTnuLN9On22DrJhizLWk86wAzPVaQ29Jx5k3N8%2FIpjSfm4PA7agZ%2FWWd9BVS4CWLIbkXfhG%2F0noOKbjWquvpLwRYRlL9sllVsvYVsKgvosYlLiUIiymWSP%2B6vDUZxlN%2BXeHabWeTCetxr2T0SKpwHfoOs9XsU%2BAQCx5gssGMX85D3uALrC26MOrhnM8GOqUBy05MIgnHoRQGWVFKcmfygpmj5dyo8EDx8Gz6vhNqx90TwbC7Vz9oomP%2FOhqMPl2PN9hOQrVCvegS29vKq4BKBBRfmRQxtigD51MxZApy1HbN4HvIgXLeNwPCgT9q12rc7jj7Ye08tzGqloT%2BEE8MSCVKcIPEEXUBW9oY1rhplDEJFDL6%2BI9m1cjF4BLwxE8RrhtITjbvoOkviCm5umkzAFMwHPGl&X-Amz-Signature=706f3fa65c7702d62cf55a9a6b8059eda35f760dd1cca217981362cbf9c31e99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ELSCP6Y%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIFG5zQSFbLrrkJB7BxBpditsGi0ED5YmlekD9syu7w0EAiB7B3DEfiLhhall4PBMi13%2BS6Sf2Mio5d5u4tNmKwXbFCr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMBRaHhyfQP7ula2fzKtwDHg75LBgL9BY9Zyciu7jCWyEsnGq4wP7d6vkpp5dYZc7ZcuMEQbMkU03buXLPAsYXM3BPztD%2FYq4%2BydaNczizxTqUE3SwQEr2V5nx3fa770NqBB35%2FLrb%2FhmAirb8WreabCv4T751JPYy9UZ7ArPC6%2BpKFO4Loxb7wHgCXcDJZ5INlWGoEcPc4c%2F%2FWeTm52c4VVcBP1GX0A04wCpGM%2Fp1WnyIc7Mn7ab0u0%2FpB5mtMCBQHjMQks%2FAeuWkHdLq82tifEIiOsuoY0ebxyAENrzxIK2jD%2BAaUEdmMVlArlvKetU1MEJbfq%2FzDZr1q9oh8Qsnc7rXMw%2B%2F5fFBE6imitnrGD%2FGaoQqW4c%2BBLSnwSlvy86jwnawCYf3Lc4z5VQPcuXnZvW4h%2Bu89tEj6oEtQI2Ln0t49wEggF3f7AKa00RoPlf%2BGl381UL4tfBhkTyTbtvWsxULWHn%2FbtqtUcY3zQeo5TW3GzkWFku3tnBQ0u0KamwY8EyluWSYQCIgbYNBzKR1DOkdjk6H%2BajP61eN%2B2YponK0M7%2FJF5yLvUELAWxcjtdXIPJCdkKiwdoSQ2xPTaO4XwIoA83t4n23onMIS4nYJEDTgL2N%2FjLWhxmSOxmiz1k3fW0HEtj2FKqkmyEw6eKczwY6pgFHWNV1a36sIn16rj7BTMR3QMx0wuGd6a2ll0Yyh5oiqM83lg5DqjnyupazaCM3P0wOYI3c%2BTUm8Cw78gkewWGBdARXU384amds7xOWIU9on7Bx5f2DMbdQQzZ%2FFwLMpwDPWgrpe2y5yuxNfUXKkjzOHlP068GzZJ4W3404toQImNozg5cGDhJl0YBunfb%2FRydFBcaokcsDY23M6eEOR2yxwCr0V7kT&X-Amz-Signature=f76c1bed815f8b04c1ef839ab62507fddb32688bbaf1ad2d4686d682cf2828a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPFRORAJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIEecFphwQekIJTYA%2FQkaDqgnSfsttO7ZEBkXo8vSTHVeAiEAzxp0OBaJd2Qkp4lSV35OIBN21gi6KZ3POWcCHA4mp0kq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDDblOxBpI34KB1tTQircAw4QmHpsf1TD5WFRO6CC3EU%2FehmLI4PhiG8ldUw1hiEXVI1a06fhw2Go2cmtRpYUk41uKRolPNdQ5OLJJfWo1g3isLuuPPdb3fk5oQMo8wM0HMWs5DcX%2Fz1ZuEro3bwsx1mp6hpSNULGTmocuiqMzrLEI0TVGV8R7MS3%2FaYNESxbBw%2FLQhjLhq%2BeIKGEM7lj2tQkRhKyuofPz4lcIZzv2JfScTHNaE4Yoyf6lLbX3KmueJ%2BM2T6aI1iDehVvMSgqJo25MQFCqVXfRFY1fF3uPi6lu3D2YZI%2BVmoS7qCTFfwlVpto9xl38pqKGofIhOwgFjXT4%2FhHrhsRo8hUnXXmUflY4zv4XNzgqOiXIyIuNVkQvciWHLfqdjZmD72Ran%2BkQGo1nmBUvPrPI3xppQ3W2rdmYmgz4zc8nlv5%2FDVQ4CQPkdp3AkgESutGoCMwzUGTiSifRDr5u2Ef9yIjWXKSvIkw9GdwdgUtKRDuX%2BSZPsoLbSjjGlfhodU%2F0lyW55hwoWW1sVLYjDnEQ263r0RsaEorQIyxPcN2rq6jdh5aGB65Z9fjfF4mMUKXyQD9NeGatwa%2Bwikcseg70ENXid3B7lyHzOSh9v3415TSKeGKPM7W0ef5jcR8vU2e2C7DMOzhnM8GOqUBrOQ7A15LhQJMevbvs5sYofBBudKn1pksn7UHA1PeDR0bi0noutL0hCjFGF7M%2BgqE0cNZHLyHPXkdhATsyj4%2FEyUY9REM%2BmKXruOByYVcYFkoaDGim1d%2BpcawpQgFhxpag77e8Na%2FMWOU0F255u2zDPGdCoXmUjTQkju%2FqNV3%2BsbQF0ZhVHtIDsxRUy7Sw2RGumyBsXtnoa45KdvXfVux06VHwAMI&X-Amz-Signature=09413fff56354a1822caf59d4c0bc51c3285b0e679306ebe10ba87dfb13c863b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIVN6UFB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIGqsMCoZVrAfQ%2F%2BBZvo8pJ2Gugvwq%2FZRTSTa0R6Ai244AiBaH8br5kAvg81FqTjVEcHA9%2FoTnkdyZxWSzdHuBO2veyr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMyN9SMgJA7FYbd2KSKtwDuiz%2FgTa%2F8FYRllYSBT%2FPBSx1A3upyJnnLk3TWfxesbBeCu0ZaP2xfv%2BNMWniEiQTFZVbpN37WHP4OXCeZAO%2Fnm%2BLPQ%2FNUsGh5Ge880zXAiRBkLKJRr5%2FOVYNx3YY9GT0BLJrVBNWxcpjEBejUaShzG%2FRxKkyUEe%2BECFcy6FKpkqCf2%2BQUSZpjbtfSrERzmSmmzK6zeCmnLIP%2BRKmBn42S3QRa7NvG55vrDRMtP%2BNYL2Qm6inhSUUJs8DX7hQo6UiCojCAhF%2BYnC7IocPtJO0f7P3mVTF9nTAKSz0E%2Be9y6yDUXeVZB6QaBTUrk1whheKkPLj0WfgFgO2ITqpc8w8X%2F%2BAsdnVmUtLmxWF9I54L0%2B0kc7j9E0A1DDrwemL4XJ9VdvuJEE6l8hfyZzkDKbY2hRkKNhbBX1awCW6xzCuWD7T%2B%2Bu9%2FFPmnUzAKXXN41BvRrDcK9F4%2BJwQFhT3%2BmcqaSvRIq9yLhdpcaQQMxDoNMPOcoZopqAuGLpIcwXfnCthzfQJGYqYdAa5Muc9Ga3P5V1q%2Fg67KB1%2FjiZ1JP3txFcO5p8IpP6yIqsg2NHFcoT%2B9OscSSx5pmepAmIqf9UTaF%2FbtGW7FlUvLpjiZC5G1xafwYt1Nbv9ZvG4iSAw3OGczwY6pgG%2BMn7Sr4MBRqt2E83XZkAdHt%2BYxnRZXY7A9GX187eWg8tPd19cl9c7ZD8tEuBDkAbOOns1Gs%2B91DUrStFb22ziKXUSbqPd6Wft9gznenYGfDl07kBa%2BhOpfdkpzgTMFi4BtaYXEPvBCARUkgzcfva9%2Fu1pAiOr2270i2PCB05WWOnVFLai%2Bxba%2FOSM%2BUiql5FJIBIl4MiVv9jguzSPJeBzBUC%2BDGZD&X-Amz-Signature=1e7268d42f7b02367cb46ee7fe1e6092f592ac9e39ac81eb17d0be6824505194&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIVN6UFB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIGqsMCoZVrAfQ%2F%2BBZvo8pJ2Gugvwq%2FZRTSTa0R6Ai244AiBaH8br5kAvg81FqTjVEcHA9%2FoTnkdyZxWSzdHuBO2veyr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMyN9SMgJA7FYbd2KSKtwDuiz%2FgTa%2F8FYRllYSBT%2FPBSx1A3upyJnnLk3TWfxesbBeCu0ZaP2xfv%2BNMWniEiQTFZVbpN37WHP4OXCeZAO%2Fnm%2BLPQ%2FNUsGh5Ge880zXAiRBkLKJRr5%2FOVYNx3YY9GT0BLJrVBNWxcpjEBejUaShzG%2FRxKkyUEe%2BECFcy6FKpkqCf2%2BQUSZpjbtfSrERzmSmmzK6zeCmnLIP%2BRKmBn42S3QRa7NvG55vrDRMtP%2BNYL2Qm6inhSUUJs8DX7hQo6UiCojCAhF%2BYnC7IocPtJO0f7P3mVTF9nTAKSz0E%2Be9y6yDUXeVZB6QaBTUrk1whheKkPLj0WfgFgO2ITqpc8w8X%2F%2BAsdnVmUtLmxWF9I54L0%2B0kc7j9E0A1DDrwemL4XJ9VdvuJEE6l8hfyZzkDKbY2hRkKNhbBX1awCW6xzCuWD7T%2B%2Bu9%2FFPmnUzAKXXN41BvRrDcK9F4%2BJwQFhT3%2BmcqaSvRIq9yLhdpcaQQMxDoNMPOcoZopqAuGLpIcwXfnCthzfQJGYqYdAa5Muc9Ga3P5V1q%2Fg67KB1%2FjiZ1JP3txFcO5p8IpP6yIqsg2NHFcoT%2B9OscSSx5pmepAmIqf9UTaF%2FbtGW7FlUvLpjiZC5G1xafwYt1Nbv9ZvG4iSAw3OGczwY6pgG%2BMn7Sr4MBRqt2E83XZkAdHt%2BYxnRZXY7A9GX187eWg8tPd19cl9c7ZD8tEuBDkAbOOns1Gs%2B91DUrStFb22ziKXUSbqPd6Wft9gznenYGfDl07kBa%2BhOpfdkpzgTMFi4BtaYXEPvBCARUkgzcfva9%2Fu1pAiOr2270i2PCB05WWOnVFLai%2Bxba%2FOSM%2BUiql5FJIBIl4MiVv9jguzSPJeBzBUC%2BDGZD&X-Amz-Signature=e055761086f089dda9591f6c35d82b9ab060642033beacfa43d11421206c7583&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMLM27CK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQD8GNizm7fDn%2FA5eLV59mF6bUWtpTVirTPVJAA54px%2FjgIgYR5DzYPLpbyd0RQVp%2F8FrJWocc5t3Ps67nXRyWW8GTgq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDFefQdrMQ1h%2FZVHgayrcA8zlRf5Zj10u2FMw1kgfetGWn%2FQIVbVCWeaL2xcyeuzud%2BhnNgSydfjR%2BbpvnPnj%2BkN7%2B1SFuJeKyL3QsQnZs7bobxVFX6tJXHOB5r5%2BwxFGIXsLJQXH%2BWBjkPBMhekek5ukmO1O69ABQWStMBcQhyP72HobjdizJL19UvkxeGMU59USYVJHyMl%2Bh%2FFaMyMOP6g9xY%2BHNS8ldM4K9bLai9EGFUBzQ15HF2rw%2FCWI5IGLMjS7Fitu4O8lv%2FmjBkqLyY%2FUVxglWBqtS01lFQbbjJdMtJ22qR0EySyeOPFieoCs%2BP0uH8qhNX0u1V73VqrhhK0KVZh7%2F1FnQX9BG62MnSi2x5URMsYJQmLRHyJi4O01Mw6qTf%2F4tG2t93TkSlWrNyDPPlRzfCXscdlzuG0qunejnpmtAmXkaX6BQG4fiw%2BMvmNDAj5IR4stXVuoADuTOQklkAL0qaNbaq%2BJp1HnT4YomUbiZLn1LqYieGcpP9tF9KH9vSEm7mBW8OrZzBN9Rok0f2UqPvyiPCagfNnrwrQM%2F4WMvpf5hD0bfQz6CKl7D9rMGk0NqlMb4ZQJ4sqQq5FYDV6QO6cuRyH1zt5VhJTZTcPTuB%2BVReDpj6D6gz7jmebwZHlUdTdMcJiRMODinM8GOqUB0iJ8I2pLsUKf20UI5LwmYDIIw2b4yw2xxRyzkAwkdwXRgmXvfeR0so%2BwUNr0SeMIjgZxI021MJjc3q2ibWty%2FHe9nUsbLF9xQJZ7jKJxbbAeqwcMnC7OQn5Zmz%2FMzCT5eeW4OmhoiBAofn%2BXoT8zkfJuVPF%2FSa0eC2MFlPT8G10QQnpjP9%2FYYGUhHj4MBHrShk6EpjHH%2B1PfW9yUORrIiEN0%2BJEt&X-Amz-Signature=c5de3311d5557915769cf5511dce60e1f5c4496f00107ab3f216b2dfe1c41042&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MCEECT3%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQC5HHfJrokWpsls6qRRecun3kteD8pOKJoNgQKCPuHrvQIhAJffDkbgFwZ48ALGzdIjpXAxw5D8ys7rCbLPFRp4bfR3Kv8DCDEQABoMNjM3NDIzMTgzODA1Igx8pU%2B1x1tFlqjUFscq3APRfG2f1XcyNH0Vn6lm8WhYcbAOjJwBHeJ6qDm0HfmddaunS381OKO3EYZzkr9KzYsDxjptWQmPtaDE3pkluAfUMza4WbfDgeWVXMQeI9PHpkwWcicAqbhng7Q%2FIyr%2Bq%2BCyVCMfxQmI5My0K8SpuK3j8oDm%2Ffmc8oYjAmbdac5jTMTSQY%2FrUDXvB%2F3HHDiHJNOBL0J6r%2FjSx3bZvPzpQez%2B4UXQchsjqw1RLZzVVP5V4zgGlteuQmBya0zQFHiDeX9BMl4xzbZO85wSX2cHSzriuhYKS4IVBg7qOQ13XkAIeo4IoEDpEzRVYmTpxK1O0Rbu5xI4xWFn2HAoE26zBHgHPjrtCpywWphjvutoVtL%2F49VuqfyCmxV7v3ksseNXiW5UaeJC9%2B4OcnaAdU8NWf0NEmjhJ0sX8v%2F%2FAp0wPi%2FFJl5aL2njMQ%2FclDCkynb6NGhvK4Fos9S668d9nH0JiyZX8gPnbWuaPPkez6A1S7FAZmIhOKNKNgoKX8HO1oj01f0cDV1Xaq01sSO%2FR%2FYPDcNc4v1s1nU5IsSqJ%2FzmLD9a7zM6dPABioi%2BSl3d1K1aIqCSA3hw9uVUbZDjy61WnDM3T%2BtZ4Ej78iLTMw7Oms164soiKgyaOOJEAtm0zjDw45zPBjqkAfet4ZMzfx3JrRgSHOnvnW8p%2B%2B2zLp1Yk5elpKoRgZwc1q5sTcYQDHbyeESqcO3o4H4RLpH380uLHotGnNYQ%2Fkdhj8yZHMey2AsCha3u%2BQ4z9pxA2CkrxPL2cBfmAwlw2b5b57NHCbhCBDfQLpLdGi1SMcSOWp7dro8Xf5wf8qOE7m%2BlOH0s9LGjVdPhmYveMbGgIZAywXOY13WcoExYlcoBu8%2Bb&X-Amz-Signature=aa5454046e449704a1077f584f29460c83b3c83b2bb6f47ffb65eee1a1f8a5f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MCEECT3%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQC5HHfJrokWpsls6qRRecun3kteD8pOKJoNgQKCPuHrvQIhAJffDkbgFwZ48ALGzdIjpXAxw5D8ys7rCbLPFRp4bfR3Kv8DCDEQABoMNjM3NDIzMTgzODA1Igx8pU%2B1x1tFlqjUFscq3APRfG2f1XcyNH0Vn6lm8WhYcbAOjJwBHeJ6qDm0HfmddaunS381OKO3EYZzkr9KzYsDxjptWQmPtaDE3pkluAfUMza4WbfDgeWVXMQeI9PHpkwWcicAqbhng7Q%2FIyr%2Bq%2BCyVCMfxQmI5My0K8SpuK3j8oDm%2Ffmc8oYjAmbdac5jTMTSQY%2FrUDXvB%2F3HHDiHJNOBL0J6r%2FjSx3bZvPzpQez%2B4UXQchsjqw1RLZzVVP5V4zgGlteuQmBya0zQFHiDeX9BMl4xzbZO85wSX2cHSzriuhYKS4IVBg7qOQ13XkAIeo4IoEDpEzRVYmTpxK1O0Rbu5xI4xWFn2HAoE26zBHgHPjrtCpywWphjvutoVtL%2F49VuqfyCmxV7v3ksseNXiW5UaeJC9%2B4OcnaAdU8NWf0NEmjhJ0sX8v%2F%2FAp0wPi%2FFJl5aL2njMQ%2FclDCkynb6NGhvK4Fos9S668d9nH0JiyZX8gPnbWuaPPkez6A1S7FAZmIhOKNKNgoKX8HO1oj01f0cDV1Xaq01sSO%2FR%2FYPDcNc4v1s1nU5IsSqJ%2FzmLD9a7zM6dPABioi%2BSl3d1K1aIqCSA3hw9uVUbZDjy61WnDM3T%2BtZ4Ej78iLTMw7Oms164soiKgyaOOJEAtm0zjDw45zPBjqkAfet4ZMzfx3JrRgSHOnvnW8p%2B%2B2zLp1Yk5elpKoRgZwc1q5sTcYQDHbyeESqcO3o4H4RLpH380uLHotGnNYQ%2Fkdhj8yZHMey2AsCha3u%2BQ4z9pxA2CkrxPL2cBfmAwlw2b5b57NHCbhCBDfQLpLdGi1SMcSOWp7dro8Xf5wf8qOE7m%2BlOH0s9LGjVdPhmYveMbGgIZAywXOY13WcoExYlcoBu8%2Bb&X-Amz-Signature=aa5454046e449704a1077f584f29460c83b3c83b2bb6f47ffb65eee1a1f8a5f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4G4NZJT%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T082318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIHX391g1Ro6S6FeIRNGCkBfEO1gg02%2Fg8PPf%2FlS2lsIaAiA97abe8Xe%2BCiX5cAWGXuGFvP14duzuIhSrn2JZJWH%2FByr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMdfZbT7%2BdaG0asLxCKtwD4t0ymm83M%2FO0lqE3SuEWh2s7T5TpOn3SSVrYBcIVTKfRzd9YTpYeV6d%2Bu8%2BYvqTJtNRkfgudnw66CxSKUlTgViMSR2RUOzGAH7CREUgwbRfLod2IfLjiXDDXMwXNm1QgYcdAPk3s51%2BYxzObSo2oQqRfAxi6QQ2VVkLIob14nMJxZaPs5wXuWxM4b%2ByECm840gp4MjBVuw38kfledjmC7gOCvbmK2bw1Ry%2FQ9HmC4Yw8LgZRo012ZIPBUnfPGbv8mIBa9MB%2FSHLFQiTK0DkeciIAQ5rhFCLA6EcxamNXBk65AwgIbdctsEhqzkBGagVp2qKLvJqfjRJB87%2FRgODUXyKvnuQYGkD%2BFM0E0HVxMnTE6%2BVlkmI5BnU8ldc7ZhIrByt0wZlLdlvKxY%2F%2F3Yn08AYBKZIp0m3fIyfPLYveTmbpl8aCSteQCHrhhuK%2BIO2HH%2Bxi7YAJDmy%2BpXWOkcEbbW4UqC9WSMOsnMKuXcX%2BXlRNDAlJ5GvfMtCvFT%2FEUY5%2B%2FIRkSPi5M%2FrMtCWuUZvZJrv5gqUBoM91032ieuynT5yk3dbwiTMBfLr3mci5l6F3472KdKtlkVlFKnCPQpIJY23upqyS%2BnMX%2FHgPa8DNkO%2Fvj6xG4Oq72rQ8cfEwr%2BKczwY6pgESmvkoahTyzSsdpLPyuYcbfc8hxbWnMCznrtf382Ofm2q6ZtN1cWZkEmrGDP4q2VlHHAndFCWhBEZd6kiqgw5kWjugNIZD8c41jdANW6Esnu4yDESSWvYlnfVJcYrBfGTkvNHjHFxpTvAUwEJaoW8ywSTvxPS9kgtB3tr4egZ4Qi%2FolCbq3lcVsXzdHlBrrBUns4pnIxU%2Bf3YUc6VKuzwI1jhnMtBt&X-Amz-Signature=38bb6d4b1d7e63bac2a62f342156f4b57d3f659d43a7452335ba508077f55bb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


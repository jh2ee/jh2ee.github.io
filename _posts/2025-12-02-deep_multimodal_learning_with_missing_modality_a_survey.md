---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFLQ6M34%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIFFAL0%2B76%2BonMq5yuIb%2BvHXZgiCuvVXw0xt1MPlHvRVoAiB3tqTmi%2BU7ylm6Zo4DK1DZ6Ncv4q8q%2Br5E1SBhrcC5zSr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMLWnwFp8H7Rm8lBA%2BKtwDxNxK8z4nRhrfKqT2tt7b7d6HdByDI%2B3bcol2%2FYJywisNJ1RZLTqcGPGyGLqAs8XLJIFs%2F7E2m9JthriOuOIjPuE7yLvjdgJ8aEEw562tj%2FjPiJbGzxdB%2FFWnC1xxOSM0C5IPmZU%2BimFI%2Bqvqf9ULawL0T6vDdkksm4%2BIyjBwdTs6dTAMT1Xb8syC4PnAkCetGe1y8WLeMDg%2F%2FRU4PbU%2BWK%2B6H0D%2FlcXHd5hdnmyDQvNJpUA3WKuGQo949FyfnalUrmjHSeJyRJOawFGvs2vDGSuyzj9Ee8svhbUavC%2BHVjBV6dDbZWl0EixEU0gl3w1Qulg1HZbDyhb%2FJ7u3klUE90zuyccvU%2FhzOM9qcAWMR7ErWFuBchdjDj5qSbkc87FbjLQxJq52kg5Q9TdyMnGX5cav%2FCvOYwW1CvHj4C8Id7uUVPq%2BiYt6YGBfMvkRX7rL2BbVx9cQuZAPAC898uyzv11TR%2FT8xS%2FbXCYJ70EedD%2BXbSUvLI94pYAf4SeeNWvT5jEzNcl%2BAstntyu5zp9%2BehkxRsCKGdXddLebkKR1bzhAkWIVb%2FWE0Ute0u5dD3LvN4cqL3zQjfMeiuLYXrtw9%2BI0qMZoDs7P%2FUJqvi7WNu4e8IAGFoGrUGhGhtQww%2Fy8yQY6pgFyrtRYTB%2BkENNRWOowa585IjKNq7kDyGoC4KLDBi1wmV2fZ4PZd8HLNYDo9O7gsWg00Oo%2F5fy2gqMOZpqfLWEtQE0VFDbVUeCvJJfIeOnWNpJxxVqKuNfGW9K80o5EUK6yNE%2F9jRiBR3ioIxSjuGzINqmBN6YR%2Fh8gIAcEEDdguC5LAjpTVoa0GJ3jh2jkKjzZOjd6ptD%2BvpOLya1MdF8TIuMkOcmC&X-Amz-Signature=4a156a3f53ccb69351e0381a74d83772312aa72833bc3a48278e1230ca71e1f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFLQ6M34%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIFFAL0%2B76%2BonMq5yuIb%2BvHXZgiCuvVXw0xt1MPlHvRVoAiB3tqTmi%2BU7ylm6Zo4DK1DZ6Ncv4q8q%2Br5E1SBhrcC5zSr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMLWnwFp8H7Rm8lBA%2BKtwDxNxK8z4nRhrfKqT2tt7b7d6HdByDI%2B3bcol2%2FYJywisNJ1RZLTqcGPGyGLqAs8XLJIFs%2F7E2m9JthriOuOIjPuE7yLvjdgJ8aEEw562tj%2FjPiJbGzxdB%2FFWnC1xxOSM0C5IPmZU%2BimFI%2Bqvqf9ULawL0T6vDdkksm4%2BIyjBwdTs6dTAMT1Xb8syC4PnAkCetGe1y8WLeMDg%2F%2FRU4PbU%2BWK%2B6H0D%2FlcXHd5hdnmyDQvNJpUA3WKuGQo949FyfnalUrmjHSeJyRJOawFGvs2vDGSuyzj9Ee8svhbUavC%2BHVjBV6dDbZWl0EixEU0gl3w1Qulg1HZbDyhb%2FJ7u3klUE90zuyccvU%2FhzOM9qcAWMR7ErWFuBchdjDj5qSbkc87FbjLQxJq52kg5Q9TdyMnGX5cav%2FCvOYwW1CvHj4C8Id7uUVPq%2BiYt6YGBfMvkRX7rL2BbVx9cQuZAPAC898uyzv11TR%2FT8xS%2FbXCYJ70EedD%2BXbSUvLI94pYAf4SeeNWvT5jEzNcl%2BAstntyu5zp9%2BehkxRsCKGdXddLebkKR1bzhAkWIVb%2FWE0Ute0u5dD3LvN4cqL3zQjfMeiuLYXrtw9%2BI0qMZoDs7P%2FUJqvi7WNu4e8IAGFoGrUGhGhtQww%2Fy8yQY6pgFyrtRYTB%2BkENNRWOowa585IjKNq7kDyGoC4KLDBi1wmV2fZ4PZd8HLNYDo9O7gsWg00Oo%2F5fy2gqMOZpqfLWEtQE0VFDbVUeCvJJfIeOnWNpJxxVqKuNfGW9K80o5EUK6yNE%2F9jRiBR3ioIxSjuGzINqmBN6YR%2Fh8gIAcEEDdguC5LAjpTVoa0GJ3jh2jkKjzZOjd6ptD%2BvpOLya1MdF8TIuMkOcmC&X-Amz-Signature=4a156a3f53ccb69351e0381a74d83772312aa72833bc3a48278e1230ca71e1f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NUFB5YY%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCICR65DdusGrgDnFfWSBPzyg%2BdFzP%2FAxSTF5f6zaFEj7eAiA8can6I9hlw93nhtAf4G0%2BIkc2VAtz7GiCCuu6bqdCxCr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMUFN24CQIAt1z1h0uKtwDWWcKN6sBBrNLVM7o460xNSPItQPb1J3eHPHqS1YybSq0zYqmLG1jjZNlhMcDrtadOZiKv3vkTJvow8cfOYCrnhK3FGBQGPM4Jk8lsw%2F2%2FMofk0qiDDsZkB8%2BKvbfQO4qyUrQ9gQ4STxgy9x2%2F23BLNIR1m8cZsKREIbLmVGZe6roESJaIPYM3GHD0DPppN1cQ3INftx1oFCabcRIisWeW6SjbINVsZSigM1QKyeVD6PTuo%2FChrCJ05CfneFXMNCufhIoPqWvpo3jRQdu4j%2B5THEcKK4rEmsA6VNN9RADx9VU1OaRQesRPgEvHwl5kp7DfDd1RfLv3%2B4qpillJDLalEkGZ7mw0Ip92WJFyeyAhpxZz6cBduZsS%2FNndijaYNuV63G%2FaBKwQEVlua%2F2aWQInEQWs8CHUJe01b3g39HsClMnPiXSDvymitSruPJW8pf4q7Mm36IuNAEqqv4wgoN51FuV2DUlV%2F%2FjjRcBpx4d6d7G1NBgTfbFJaKSMt%2FRIdIHxVyVuIZzQ8ikHot1QwkGP%2BvSQX6ZrNmU0LXeGPsClzb76LjIJ618IUJtdc0rUtibTEdMOEHenxd4WKJUoKyGfOJXOndxVi81tWLzmQrKZyZ9f5PcVLgaXHmR6pkwpvy8yQY6pgF6dK7IXaJb8mDuLEa6oG7xzFuc%2BQj1HHRb30hlFeOUltwgn%2FfVVkZV4SW6ny7lvBYhi%2BTloHTNomAZo6t3wQzqaWcKzPgbmTY2BGJCkuiwvkIPJhDM9GBridy5SUipjH9V16gQcMT3%2FmnTvHVgode7t9C4HlCN4RZfKU0BLSdfQf3wauNRWwbqgZGU3hEAXQWPTwIqcKPFnCMbXgL3OUkXSSjGqsdF&X-Amz-Signature=7782033a382a8ece13f25afb4d38da2c819ddf885387cc1f4a1d2f7a431596cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NUFB5YY%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCICR65DdusGrgDnFfWSBPzyg%2BdFzP%2FAxSTF5f6zaFEj7eAiA8can6I9hlw93nhtAf4G0%2BIkc2VAtz7GiCCuu6bqdCxCr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMUFN24CQIAt1z1h0uKtwDWWcKN6sBBrNLVM7o460xNSPItQPb1J3eHPHqS1YybSq0zYqmLG1jjZNlhMcDrtadOZiKv3vkTJvow8cfOYCrnhK3FGBQGPM4Jk8lsw%2F2%2FMofk0qiDDsZkB8%2BKvbfQO4qyUrQ9gQ4STxgy9x2%2F23BLNIR1m8cZsKREIbLmVGZe6roESJaIPYM3GHD0DPppN1cQ3INftx1oFCabcRIisWeW6SjbINVsZSigM1QKyeVD6PTuo%2FChrCJ05CfneFXMNCufhIoPqWvpo3jRQdu4j%2B5THEcKK4rEmsA6VNN9RADx9VU1OaRQesRPgEvHwl5kp7DfDd1RfLv3%2B4qpillJDLalEkGZ7mw0Ip92WJFyeyAhpxZz6cBduZsS%2FNndijaYNuV63G%2FaBKwQEVlua%2F2aWQInEQWs8CHUJe01b3g39HsClMnPiXSDvymitSruPJW8pf4q7Mm36IuNAEqqv4wgoN51FuV2DUlV%2F%2FjjRcBpx4d6d7G1NBgTfbFJaKSMt%2FRIdIHxVyVuIZzQ8ikHot1QwkGP%2BvSQX6ZrNmU0LXeGPsClzb76LjIJ618IUJtdc0rUtibTEdMOEHenxd4WKJUoKyGfOJXOndxVi81tWLzmQrKZyZ9f5PcVLgaXHmR6pkwpvy8yQY6pgF6dK7IXaJb8mDuLEa6oG7xzFuc%2BQj1HHRb30hlFeOUltwgn%2FfVVkZV4SW6ny7lvBYhi%2BTloHTNomAZo6t3wQzqaWcKzPgbmTY2BGJCkuiwvkIPJhDM9GBridy5SUipjH9V16gQcMT3%2FmnTvHVgode7t9C4HlCN4RZfKU0BLSdfQf3wauNRWwbqgZGU3hEAXQWPTwIqcKPFnCMbXgL3OUkXSSjGqsdF&X-Amz-Signature=7782033a382a8ece13f25afb4d38da2c819ddf885387cc1f4a1d2f7a431596cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633CP5LJC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIB0en4ttAT9UGlbnk%2FtYehuJGipl8%2FqlxX8xtTk82RwWAiEA8pyMYBlfmCL9dVIgvZHTyzIhA96xR0Bw7uauLBc6TuIq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDFsxeqV%2FJH48cfUuAyrcA%2FGF2N2KvbnOPlzegACzsRyn8txYhXeRB9hpmedzmrbYlVcakJVbIeChvAmt2MpYkIU8DhF2tfNsCt5sEJFacykLrbApBpELF56QeG%2F4S8xBUC3nzltb6%2FJLnYApPL28eg0k6aYQrmV6fs5FM87XT9HbQ%2FBZ9vbaxy4XEuHPhEKq2GUjT6Os1q3hDWWLITqFQG0bnye7Z%2BHWCVh56tvWQnfBJE6VY2Sk8C%2BYdQ0%2B4%2Fg%2BJsXmQCkunWIN7oW7Wsa%2B3yTFETbOBpytUdnHVZZVEFOg52dKkb7KJQOZp9z9q%2Bok2nt2l3eplxhg8FGrA2bKweoTpq3GGvl0gnjkyNYPSOt6GezYCasmQTsf2kGrfmrs6V06vkvI6EVlu798e1ewefYOaXeqbY5u63%2FDttnvE5vGtpbsrpyt9F2kWEJcjut7XyQj4w%2BsY03Rx3MdX3BpRMnrwikG%2BJr1KcbZ4art%2FuvyQDl87yEP9VVo1Al5hlj5AX%2Bthvnlbr9V42FVt%2FGaTsl%2BX8GL9cpiANdv65yA6uFyvFKVSZkQAFY%2FIdVfllm4ZPSOyXdvkTJvK%2FnojS55hMdy%2FVYydykYuG%2FuRubGR3vjTjOKlj90BCxEManQiIWpudfBZzehIKSiaKbXMJb8vMkGOqUBrl5xA7LOSiYax8jHMkeTTrUu2WbnS3vewaPu4wCgV2DBcN6qQWtubaRCXfjLxgMRTX4oxJ6nr%2B5vLAzcNQulaiY4nmXsqslAD23Z3XCHvcIzcI1ghDMSq7%2F6TjIHD0sROkfmmjpaTRqDP8kKasqWVxPSUD6yuZvZlwgCgOb4MIiJOtYqELee5kqcfcBnA4sGexj2ivsodHdlgLIJhGD4GMjvz7dP&X-Amz-Signature=0183f24752ee1f849d8d033506f09d3dbeefabf232aa56b0d805aa2013cad476&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DSGSD63%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQD0isYKr34k%2BgfE7lJD%2Fuo0kZojzf1Dzm5ctKQ%2BKNofvgIhAMhwWiTfXwrWo5MioYwgidzrsTNu9psffaIPT24PCsffKv8DCB0QABoMNjM3NDIzMTgzODA1Igypw%2BlkZ6xBJACCEu0q3AOfGq1V7XLj0fRa6g394dVt7DP5knF1OgzgoSmtYuffqYaTkDvbHhrRnl7TeN1SNXlw7rZkEzI4%2Fv1GuOEscs8NGX%2Fde91pQCQEZoaLMyrpDzyrnI23IDgBjUTaewS6dRxmUGM1gES6o%2Fwd8CGRuMnJ6%2FsMb5WL4f9SPVX0CD8Ii6tSaDgHU8M2PlzJjeJaaYwJPSH%2FIz1elB499e%2BgME7bDbZY4%2BTQhSJZ0GQ4n1uLRo%2BXBhdwZe%2FlakM15nW6945Q81J4c69WD6ue0oQ%2BBTMtTaXL5nU4PFDG6g9ZwUolh5pi4IJwu%2Fe9nMvmstkgTpCMHDjIvT8mwBx5%2FKYr8GPcc7gNEUFt9ixmRcdd6%2Bc4Rkiht0HGwJhgmN2t4%2Fym7mJCQDjeAkA5zNgHAev5w1q6ggSBiSrXC8DysBVoVcT%2FISdCvHc5hqH1TGUxp8wcF4AbuH8B8GEOVQsbhQq96gyOfwkznDVrqkTXHwsp1STk1Mm0ubjaFgf6pi%2BVMsX5J4H4C4OuaaDTYOVohXSAjWFtPaLEl7JBBRAkRx06HICY4zn1wacbo12ERFLnjNZXS0drWXyYo6mOqkIpvY4gIeLq1TKzdm2vNYZ%2FKi0a4lJm%2BihJkAoNpq7HWR7YMDCC%2FLzJBjqkAafZAvoQ2u3xquZ3In0vPK3JD3gUEo7ZBzU4SdOU9w4E0EeZJPhAJsBRZG1bCoQUmEkW%2FsiVNE1l4vpk7LEwgwHyD1hzlpuV7wwutxS8qZUj%2B2upPK26i5FgZ22kZ4PXpLyEIl1Li6R1%2FDYP76N8v%2FSKLhTyoOaUgFfzCkRnU%2Fe8nmWPBlRyI%2Bt2V2SCbOHiJssbIZOfivOSTk4GhJXDuQjJrtsD&X-Amz-Signature=865ecf5afb705c1fd4b38947c8f688ff3da105c75864880240c9525cc93d2b72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DSGSD63%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T200123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQD0isYKr34k%2BgfE7lJD%2Fuo0kZojzf1Dzm5ctKQ%2BKNofvgIhAMhwWiTfXwrWo5MioYwgidzrsTNu9psffaIPT24PCsffKv8DCB0QABoMNjM3NDIzMTgzODA1Igypw%2BlkZ6xBJACCEu0q3AOfGq1V7XLj0fRa6g394dVt7DP5knF1OgzgoSmtYuffqYaTkDvbHhrRnl7TeN1SNXlw7rZkEzI4%2Fv1GuOEscs8NGX%2Fde91pQCQEZoaLMyrpDzyrnI23IDgBjUTaewS6dRxmUGM1gES6o%2Fwd8CGRuMnJ6%2FsMb5WL4f9SPVX0CD8Ii6tSaDgHU8M2PlzJjeJaaYwJPSH%2FIz1elB499e%2BgME7bDbZY4%2BTQhSJZ0GQ4n1uLRo%2BXBhdwZe%2FlakM15nW6945Q81J4c69WD6ue0oQ%2BBTMtTaXL5nU4PFDG6g9ZwUolh5pi4IJwu%2Fe9nMvmstkgTpCMHDjIvT8mwBx5%2FKYr8GPcc7gNEUFt9ixmRcdd6%2Bc4Rkiht0HGwJhgmN2t4%2Fym7mJCQDjeAkA5zNgHAev5w1q6ggSBiSrXC8DysBVoVcT%2FISdCvHc5hqH1TGUxp8wcF4AbuH8B8GEOVQsbhQq96gyOfwkznDVrqkTXHwsp1STk1Mm0ubjaFgf6pi%2BVMsX5J4H4C4OuaaDTYOVohXSAjWFtPaLEl7JBBRAkRx06HICY4zn1wacbo12ERFLnjNZXS0drWXyYo6mOqkIpvY4gIeLq1TKzdm2vNYZ%2FKi0a4lJm%2BihJkAoNpq7HWR7YMDCC%2FLzJBjqkAafZAvoQ2u3xquZ3In0vPK3JD3gUEo7ZBzU4SdOU9w4E0EeZJPhAJsBRZG1bCoQUmEkW%2FsiVNE1l4vpk7LEwgwHyD1hzlpuV7wwutxS8qZUj%2B2upPK26i5FgZ22kZ4PXpLyEIl1Li6R1%2FDYP76N8v%2FSKLhTyoOaUgFfzCkRnU%2Fe8nmWPBlRyI%2Bt2V2SCbOHiJssbIZOfivOSTk4GhJXDuQjJrtsD&X-Amz-Signature=865ecf5afb705c1fd4b38947c8f688ff3da105c75864880240c9525cc93d2b72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

